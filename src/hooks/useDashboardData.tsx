
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  totalInvestors: number;
  totalPartners: number;
  totalInvestments: number;
  totalAmount: number;
  activePartners: number;
  pendingInvestments: number;
  investmentGoal: number;
  conversionRate: number;
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      console.log('Fetching dashboard data...');
      
      // Buscar contadores básicos
      const [
        investorsQuery,
        partnersQuery,
        investmentsQuery,
        settingsQuery
      ] = await Promise.all([
        supabase.from('investors').select('id', { count: 'exact' }),
        supabase.from('partners').select('id, status', { count: 'exact' }),
        supabase.from('investments').select('id, amount, status', { count: 'exact' }),
        supabase.from('system_settings').select('key, value').eq('key', 'investment_goal')
      ]);

      // Calcular estatísticas
      const totalInvestors = investorsQuery.count || 0;
      const totalPartners = partnersQuery.count || 0;
      const totalInvestments = investmentsQuery.count || 0;
      
      const activePartners = partnersQuery.data?.filter(p => p.status === 'active').length || 0;
      const pendingInvestments = investmentsQuery.data?.filter(i => i.status === 'pending').length || 0;
      
      // Calcular valor total investido
      const totalAmount = investmentsQuery.data?.reduce((sum, inv) => {
        return sum + (inv.status === 'paid' ? Number(inv.amount) : 0);
      }, 0) || 0;
      
      // Meta de investimento - converter adequadamente o valor do JSON
      const investmentGoalValue = settingsQuery.data?.[0]?.value;
      const investmentGoal = typeof investmentGoalValue === 'string' ? 
        parseInt(investmentGoalValue, 10) : 
        typeof investmentGoalValue === 'number' ? 
        investmentGoalValue : 
        2500000;
      
      // Taxa de conversão (investimentos pagos vs total de leads)
      const paidInvestments = investmentsQuery.data?.filter(i => i.status === 'paid').length || 0;
      const conversionRate = totalInvestors > 0 ? (paidInvestments / totalInvestors) * 100 : 0;

      const stats: DashboardStats = {
        totalInvestors,
        totalPartners,
        totalInvestments,
        totalAmount,
        activePartners,
        pendingInvestments,
        investmentGoal,
        conversionRate
      };

      console.log('Dashboard stats calculated:', stats);
      return stats;
    },
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });
};
