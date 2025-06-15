
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePartnerStats = (partnerId: string | null | undefined) => {
  return useQuery({
    queryKey: ['partner-stats', partnerId],
    queryFn: async () => {
      if (!partnerId) return null;
      
      console.log('🔍 Fetching partner stats for partner:', partnerId);
      
      // Buscar investidores do parceiro
      const { data: investors } = await supabase
        .from('investors')
        .select('id, status, full_name')
        .eq('partner_id', partnerId);
      
      console.log('📊 Total investors found:', investors?.length);
      
      // Buscar investimentos dos investidores do parceiro
      const { data: investments } = await supabase
        .from('investments')
        .select('amount, status, investor_id')
        .eq('partner_id', partnerId);
      
      console.log('💰 Total investments found:', investments?.length);
      
      // CORREÇÃO: Calcular estatísticas corrigidas
      const totalInvestors = investors?.length || 0;
      
      // CORREÇÃO: Investidores ativos são aqueles com STATUS 'invested'
      const activeInvestors = investors?.filter(inv => inv.status === 'invested').length || 0;
      
      // Investimentos aprovados/pagos
      const approvedInvestments = investments?.filter(inv => 
        inv.status === 'approved' || inv.status === 'paid'
      ) || [];
      
      console.log('✅ Active investors (status=invested):', activeInvestors);
      console.log('📈 Approved investments count:', approvedInvestments.length);
      
      // Total de investimentos (soma dos valores aprovados/pagos apenas)
      const totalInvestments = approvedInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0);
      
      // CORREÇÃO: Taxa de conversão baseada em investidores ativos vs total
      const conversionRate = totalInvestors > 0 ? (activeInvestors / totalInvestors) * 100 : 0;
      
      // Validações de consistência
      console.log('=== PARTNER STATS VALIDATION ===');
      console.log('📋 Total investors:', totalInvestors);
      console.log('🎯 Active investors (invested status):', activeInvestors);
      console.log('💵 Total investment amount (approved/paid):', totalInvestments);
      console.log('📊 Approved investments count:', approvedInvestments.length);
      console.log('📈 Conversion rate:', conversionRate.toFixed(2) + '%');
      
      // Verificar inconsistências
      if (activeInvestors > totalInvestors) {
        console.error('❌ INCONSISTENCY: Active investors > Total investors!');
      }
      
      if (conversionRate > 100) {
        console.error('❌ INCONSISTENCY: Conversion rate > 100%!');
      }
      
      // Verificar se há investidores com status inconsistente
      const inconsistentInvestors = investors?.filter(investor => {
        const hasApprovedInvestment = approvedInvestments.some(inv => inv.investor_id === investor.id);
        return hasApprovedInvestment && investor.status !== 'invested';
      }) || [];
      
      if (inconsistentInvestors.length > 0) {
        console.warn('⚠️ INCONSISTENT INVESTORS:', inconsistentInvestors.map(i => i.full_name));
      }
      
      const stats = {
        totalInvestors,
        activeInvestors,
        totalInvestments,
        approvedInvestments: approvedInvestments.length,
        conversionRate: Math.min(Math.max(conversionRate, 0), 100) // Cap between 0-100%
      };
      
      console.log('✅ Final partner stats:', stats);
      return stats;
    },
    enabled: !!partnerId,
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });
};
