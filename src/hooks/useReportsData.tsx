
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ReportsData {
  monthlyInvestments: Array<{
    month: string;
    year: number;
    totalAmount: number;
    investorCount: number;
    growth: number;
  }>;
  channelAnalysis: Array<{
    channel: string;
    percentage: number;
    amount: number;
    count: number;
  }>;
  conversionFunnel: {
    visitors: number;
    leads: number;
    interested: number;
    proposals: number;
    investors: number;
  };
  topPartners: Array<{
    id: string;
    name: string;
    referrals: number;
    totalAmount: number;
    commission: number;
  }>;
  investmentStats: {
    totalCaptured: number;
    pendingAmount: number;
    approvedAmount: number;
    paidAmount: number;
  };
}

export const useReportsData = (timeRange: string = '30days') => {
  return useQuery({
    queryKey: ['reports-data', timeRange],
    queryFn: async () => {
      console.log('Fetching reports data for:', timeRange);
      
      // Calculate date range
      const now = new Date();
      const daysBack = timeRange === '7days' ? 7 : 
                      timeRange === '30days' ? 30 : 
                      timeRange === '90days' ? 90 : 365;
      const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

      // Fetch investments with related data
      const { data: investments, error: investmentsError } = await supabase
        .from('investments')
        .select(`
          *,
          investors!investments_investor_id_fkey (
            full_name,
            email,
            lead_source
          ),
          partners!investments_partner_id_fkey (
            business_name,
            profiles!partners_profile_id_fkey (
              full_name
            )
          )
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (investmentsError) {
        console.error('Error fetching investments:', investmentsError);
        throw investmentsError;
      }

      // Fetch all investors for funnel calculation
      const { data: allInvestors, error: investorsError } = await supabase
        .from('investors')
        .select('id, status, lead_source')
        .gte('created_at', startDate.toISOString());

      if (investorsError) {
        console.error('Error fetching investors:', investorsError);
        throw investorsError;
      }

      // Process monthly investments
      const monthlyData = new Map<string, { amount: number; count: number }>();
      investments?.forEach(inv => {
        const date = new Date(inv.created_at);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const current = monthlyData.get(key) || { amount: 0, count: 0 };
        
        if (inv.status === 'paid') {
          current.amount += Number(inv.amount);
        }
        current.count += 1;
        monthlyData.set(key, current);
      });

      const monthlyInvestments = Array.from(monthlyData.entries())
        .map(([key, data], index, array) => {
          const [year, month] = key.split('-').map(Number);
          const prevData = index > 0 ? array[index - 1][1] : { amount: 0, count: 0 };
          const growth = prevData.amount > 0 ? 
            ((data.amount - prevData.amount) / prevData.amount) * 100 : 0;
          
          return {
            month: new Date(year, month - 1).toLocaleDateString('pt-BR', { 
              month: 'long', 
              year: 'numeric' 
            }),
            year,
            totalAmount: data.amount,
            investorCount: data.count,
            growth
          };
        })
        .sort((a, b) => new Date(a.year, 0).getTime() - new Date(b.year, 0).getTime());

      // Process channel analysis
      const channelData = new Map<string, { amount: number; count: number }>();
      const totalAmount = investments?.reduce((sum, inv) => {
        if (inv.status === 'paid') {
          const source = inv.investors?.lead_source || 'website';
          const current = channelData.get(source) || { amount: 0, count: 0 };
          current.amount += Number(inv.amount);
          current.count += 1;
          channelData.set(source, current);
          return sum + Number(inv.amount);
        }
        return sum;
      }, 0) || 1;

      const channelAnalysis = Array.from(channelData.entries()).map(([channel, data]) => ({
        channel: channel === 'website' ? 'Site Direto' : 
                channel === 'partner' ? 'Parceiros' : 
                channel === 'referral' ? 'Indicações' : 
                'Marketing Digital',
        percentage: (data.amount / totalAmount) * 100,
        amount: data.amount,
        count: data.count
      }));

      // Calculate conversion funnel
      const totalLeads = allInvestors?.length || 0;
      const interestedCount = allInvestors?.filter(inv => 
        ['qualified', 'interested'].includes(inv.status || '')
      ).length || 0;
      const proposalsCount = investments?.filter(inv => 
        ['analysis', 'approved'].includes(inv.status || '')
      ).length || 0;
      const investorsCount = investments?.filter(inv => inv.status === 'paid').length || 0;

      const conversionFunnel = {
        visitors: Math.round(totalLeads * 3.2), // Estimate based on typical conversion rates
        leads: totalLeads,
        interested: interestedCount,
        proposals: proposalsCount,
        investors: investorsCount
      };

      // Process top partners
      const partnerData = new Map<string, { name: string; referrals: number; amount: number }>();
      investments?.forEach(inv => {
        if (inv.partner_id && inv.partners) {
          const partnerId = inv.partner_id;
          const partnerName = inv.partners.business_name || 
                            inv.partners.profiles?.full_name || 'Parceiro';
          const current = partnerData.get(partnerId) || { 
            name: partnerName, 
            referrals: 0, 
            amount: 0 
          };
          
          current.referrals += 1;
          if (inv.status === 'paid') {
            current.amount += Number(inv.amount);
          }
          partnerData.set(partnerId, current);
        }
      });

      const topPartners = Array.from(partnerData.entries())
        .map(([id, data]) => ({
          id,
          name: data.name,
          referrals: data.referrals,
          totalAmount: data.amount,
          commission: data.amount * 0.05 // 5% commission rate
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 10);

      // Calculate investment stats
      const investmentStats = {
        totalCaptured: investments?.filter(i => i.status === 'paid')
          .reduce((sum, i) => sum + Number(i.amount), 0) || 0,
        pendingAmount: investments?.filter(i => i.status === 'pending')
          .reduce((sum, i) => sum + Number(i.amount), 0) || 0,
        approvedAmount: investments?.filter(i => i.status === 'approved')
          .reduce((sum, i) => sum + Number(i.amount), 0) || 0,
        paidAmount: investments?.filter(i => i.status === 'paid')
          .reduce((sum, i) => sum + Number(i.amount), 0) || 0
      };

      const reportsData: ReportsData = {
        monthlyInvestments,
        channelAnalysis,
        conversionFunnel,
        topPartners,
        investmentStats
      };

      console.log('Reports data processed:', reportsData);
      return reportsData;
    },
    refetchInterval: 60000, // Refresh every minute
  });
};
