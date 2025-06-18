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
export const useDashboardData = () => {
    return useQuery({
        queryKey: ['dashboard-data'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            console.log('Fetching dashboard data...');
            // Buscar contadores básicos
            const [investorsQuery, partnersQuery, investmentsQuery, settingsQuery] = yield Promise.all([
                supabase.from('investors').select('id', { count: 'exact' }),
                supabase.from('partners').select('id, status', { count: 'exact' }),
                supabase.from('investments').select('id, amount, status', { count: 'exact' }),
                supabase.from('system_settings').select('key, value').eq('key', 'investment_goal')
            ]);
            // Calcular estatísticas
            const totalInvestors = investorsQuery.count || 0;
            const totalPartners = partnersQuery.count || 0;
            const totalInvestments = investmentsQuery.count || 0;
            const activePartners = ((_a = partnersQuery.data) === null || _a === void 0 ? void 0 : _a.filter(p => p.status === 'active').length) || 0;
            const pendingInvestments = ((_b = investmentsQuery.data) === null || _b === void 0 ? void 0 : _b.filter(i => i.status === 'pending').length) || 0;
            // Calcular valor total investido
            const totalAmount = ((_c = investmentsQuery.data) === null || _c === void 0 ? void 0 : _c.reduce((sum, inv) => {
                return sum + (inv.status === 'paid' ? Number(inv.amount) : 0);
            }, 0)) || 0;
            // Meta de investimento - converter adequadamente o valor do JSON
            const investmentGoalValue = (_e = (_d = settingsQuery.data) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.value;
            const investmentGoal = typeof investmentGoalValue === 'string' ?
                parseInt(investmentGoalValue, 10) :
                typeof investmentGoalValue === 'number' ?
                    investmentGoalValue :
                    2500000;
            // Taxa de conversão (investimentos pagos vs total de leads)
            const paidInvestments = ((_f = investmentsQuery.data) === null || _f === void 0 ? void 0 : _f.filter(i => i.status === 'paid').length) || 0;
            const conversionRate = totalInvestors > 0 ? (paidInvestments / totalInvestors) * 100 : 0;
            const stats = {
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
        }),
        refetchInterval: 30000, // Atualizar a cada 30 segundos
    });
};
