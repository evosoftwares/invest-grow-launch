
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePartnerStats = (partnerId: string | null | undefined) => {
  return useQuery({
    queryKey: ['partner-stats', partnerId],
    queryFn: async () => {
      if (!partnerId) return null;
      
      console.log('Fetching partner stats for partner:', partnerId);
      
      // Buscar investidores do parceiro
      const { data: investors } = await supabase
        .from('investors')
        .select('*')
        .eq('partner_id', partnerId);
      
      console.log('Total investors found:', investors?.length);
      
      // Buscar investimentos dos investidores do parceiro
      const { data: investments } = await supabase
        .from('investments')
        .select('amount, status, investor_id')
        .eq('partner_id', partnerId);
      
      console.log('Total investments found:', investments?.length);
      
      // Calcular estatísticas corrigidas
      const totalInvestors = investors?.length || 0;
      
      // CORREÇÃO: Investidores ativos são aqueles com investimentos APROVADOS/PAGOS
      const approvedInvestments = investments?.filter(inv => 
        inv.status === 'approved' || inv.status === 'paid'
      ) || [];
      
      const investorIdsWithApprovedInvestments = new Set(
        approvedInvestments.map(inv => inv.investor_id)
      );
      const activeInvestors = investorIdsWithApprovedInvestments.size;
      
      console.log('Investors with approved/paid investments:', activeInvestors);
      console.log('Approved investments count:', approvedInvestments.length);
      
      // Total de investimentos (soma dos valores)
      const totalInvestments = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      
      // CORREÇÃO: Taxa de conversão baseada em investidores com investimentos aprovados
      const conversionRate = totalInvestors > 0 ? (activeInvestors / totalInvestors) * 100 : 0;
      
      // Log de validação para detectar inconsistências
      console.log('=== PARTNER STATS VALIDATION ===');
      console.log('Total investors:', totalInvestors);
      console.log('Active investors (with approved investments):', activeInvestors);
      console.log('Total investment amount:', totalInvestments);
      console.log('Approved investments count:', approvedInvestments.length);
      console.log('Conversion rate:', conversionRate.toFixed(2) + '%');
      
      // Validar consistência
      if (activeInvestors > totalInvestors) {
        console.warn('⚠️ INCONSISTENCY: Active investors > Total investors!');
      }
      
      if (conversionRate > 100) {
        console.warn('⚠️ INCONSISTENCY: Conversion rate > 100%!');
      }
      
      const stats = {
        totalInvestors,
        activeInvestors,
        totalInvestments,
        approvedInvestments: approvedInvestments.length,
        conversionRate: Math.min(conversionRate, 100) // Cap at 100%
      };
      
      console.log('Final partner stats:', stats);
      return stats;
    },
    enabled: !!partnerId,
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });
};
