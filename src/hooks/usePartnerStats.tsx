
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
      
      // Investidores ativos: aqueles que têm pelo menos um investimento
      const investorIdsWithInvestments = new Set(investments?.map(inv => inv.investor_id) || []);
      const activeInvestors = investorIdsWithInvestments.size;
      
      console.log('Investors with investments:', activeInvestors);
      
      // Total de investimentos
      const totalInvestments = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      
      // Investimentos aprovados (status = 'approved' ou 'paid')
      const approvedInvestments = investments?.filter(inv => 
        inv.status === 'approved' || inv.status === 'paid'
      ).length || 0;
      
      // Taxa de conversão corrigida: investidores com investimentos / total de investidores
      const conversionRate = totalInvestors > 0 ? (activeInvestors / totalInvestors) * 100 : 0;
      
      console.log('Partner stats calculated:', {
        totalInvestors,
        activeInvestors,
        totalInvestments,
        approvedInvestments,
        conversionRate
      });
      
      return {
        totalInvestors,
        activeInvestors,
        totalInvestments,
        approvedInvestments,
        conversionRate
      };
    },
    enabled: !!partnerId
  });
};
