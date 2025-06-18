var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
export const useReportsData = (timeRange = '30days') => {
    return useQuery({
        queryKey: ['reports-data', timeRange],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Fetching reports data for:', timeRange);
            // Calculate date range
            const now = new Date();
            const daysBack = timeRange === '7days' ? 7 :
                timeRange === '30days' ? 30 :
                    timeRange === '90days' ? 90 : 365;
            const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
            // Fetch investments with related data
            const { data: investments, error: investmentsError } = yield supabase
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
            const { data: allInvestors, error: investorsError } = yield supabase
                .from('investors')
                .select('id, status, lead_source')
                .gte('created_at', startDate.toISOString());
            if (investorsError) {
                console.error('Error fetching investors:', investorsError);
                throw investorsError;
            }
            // Process monthly investments
            const monthlyData = new Map();
            investments === null || investments === void 0 ? void 0 : investments.forEach(inv => {
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
            const channelData = new Map();
            const totalAmount = (investments === null || investments === void 0 ? void 0 : investments.reduce((sum, inv) => {
                var _a;
                if (inv.status === 'paid') {
                    const source = ((_a = inv.investors) === null || _a === void 0 ? void 0 : _a.lead_source) || 'website';
                    const current = channelData.get(source) || { amount: 0, count: 0 };
                    current.amount += Number(inv.amount);
                    current.count += 1;
                    channelData.set(source, current);
                    return sum + Number(inv.amount);
                }
                return sum;
            }, 0)) || 1;
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
            const totalLeads = (allInvestors === null || allInvestors === void 0 ? void 0 : allInvestors.length) || 0;
            const interestedCount = (allInvestors === null || allInvestors === void 0 ? void 0 : allInvestors.filter(inv => ['qualified', 'interested'].includes(inv.status || '')).length) || 0;
            const proposalsCount = (investments === null || investments === void 0 ? void 0 : investments.filter(inv => ['analysis', 'approved'].includes(inv.status || '')).length) || 0;
            const investorsCount = (investments === null || investments === void 0 ? void 0 : investments.filter(inv => inv.status === 'paid').length) || 0;
            const conversionFunnel = {
                visitors: Math.round(totalLeads * 3.2), // Estimate based on typical conversion rates
                leads: totalLeads,
                interested: interestedCount,
                proposals: proposalsCount,
                investors: investorsCount
            };
            // Process top partners
            const partnerData = new Map();
            investments === null || investments === void 0 ? void 0 : investments.forEach(inv => {
                var _a;
                if (inv.partner_id && inv.partners) {
                    const partnerId = inv.partner_id;
                    const partnerName = inv.partners.business_name ||
                        ((_a = inv.partners.profiles) === null || _a === void 0 ? void 0 : _a.full_name) || 'Parceiro';
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
                totalCaptured: (investments === null || investments === void 0 ? void 0 : investments.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0)) || 0,
                pendingAmount: (investments === null || investments === void 0 ? void 0 : investments.filter(i => i.status === 'pending').reduce((sum, i) => sum + Number(i.amount), 0)) || 0,
                approvedAmount: (investments === null || investments === void 0 ? void 0 : investments.filter(i => i.status === 'approved').reduce((sum, i) => sum + Number(i.amount), 0)) || 0,
                paidAmount: (investments === null || investments === void 0 ? void 0 : investments.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0)) || 0
            };
            const reportsData = {
                monthlyInvestments,
                channelAnalysis,
                conversionFunnel,
                topPartners,
                investmentStats
            };
            console.log('Reports data processed:', reportsData);
            return reportsData;
        }),
        refetchInterval: 60000, // Refresh every minute
    });
};
