var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePartnerId } from "@/hooks/usePartnerId";
import { usePartnerCommissions } from "@/hooks/usePartnerCommissions";
import { usePartnerStats } from "@/hooks/usePartnerStats";
import PartnerErrorBoundary from "@/components/partner/PartnerErrorBoundary";
import PartnerDashboardHeader from "@/components/partner/PartnerDashboardHeader";
import PartnerStatsCards from "@/components/partner/PartnerStatsCards";
import PartnerQuickActions from "@/components/partner/PartnerQuickActions";
import PartnerAccountStatus from "@/components/partner/PartnerAccountStatus";
const PartnerDashboardContent = () => {
    const navigate = useNavigate();
    const { signOut, userProfile } = useAuth();
    const { data: partnerId, isLoading: isLoadingPartnerId, error: partnerError } = usePartnerId();
    const { data: commissions = [], isLoading: isLoadingCommissions } = usePartnerCommissions();
    const { data: partnerStats, isLoading } = usePartnerStats(partnerId);
    // CORREÇÃO: Calcular comissões baseadas nos dados reais com validações rigorosas
    const commissionStats = {
        totalCommissions: commissions.reduce((sum, comm) => sum + Number(comm.amount), 0),
        paidCommissions: commissions
            .filter(comm => {
            if (!comm.paid_at)
                return false;
            const paidDate = new Date(comm.paid_at);
            const now = new Date();
            // Garantir que a data não é futura
            return paidDate <= now;
        })
            .reduce((sum, comm) => sum + Number(comm.amount), 0),
        pendingCommissions: commissions
            .filter(comm => !comm.paid_at)
            .reduce((sum, comm) => sum + Number(comm.amount), 0),
        // CORREÇÃO: Comissões mensais baseadas APENAS em paid_at válido
        monthlyCommissions: commissions
            .filter(comm => {
            if (!comm.paid_at)
                return false;
            const paidDate = new Date(comm.paid_at);
            const now = new Date();
            // Verificar se é do mês atual e não é futuro
            return paidDate <= now &&
                paidDate.getMonth() === now.getMonth() &&
                paidDate.getFullYear() === now.getFullYear();
        })
            .reduce((sum, comm) => sum + Number(comm.amount), 0)
    };
    // CORREÇÃO: Log detalhado das comissões para debugging
    console.log('=== COMMISSION STATS DETAILED VALIDATION ===');
    console.log('[COMMISSIONS] Total commissions found:', commissions.length);
    console.log('[TOTAL] Total commission amount:', commissionStats.totalCommissions);
    console.log('[PAID] Paid commissions amount:', commissionStats.paidCommissions);
    console.log('[PENDING] Pending commissions amount:', commissionStats.pendingCommissions);
    console.log('[MONTHLY] Monthly commissions (current month):', commissionStats.monthlyCommissions);
    // Validar se a soma está correta
    const calculatedTotal = commissionStats.paidCommissions + commissionStats.pendingCommissions;
    if (Math.abs(calculatedTotal - commissionStats.totalCommissions) > 0.01) {
        console.error('[ERROR] COMMISSION CALCULATION ERROR: Total != Paid + Pending');
        console.error('Total:', commissionStats.totalCommissions);
        console.error('Paid + Pending:', calculatedTotal);
        console.error('Difference:', Math.abs(calculatedTotal - commissionStats.totalCommissions));
    }
    else {
        console.log('[SUCCESS] Commission calculations are consistent');
    }
    // Validar comissões individualmente
    commissions.forEach(comm => {
        if (comm.paid_at) {
            const paidDate = new Date(comm.paid_at);
            const now = new Date();
            if (paidDate > now) {
                console.error(`[CRITICAL] Commission ${comm.id} still has future paid_at:`, comm.paid_at);
            }
        }
        if (Number(comm.amount) <= 0) {
            console.warn(`[WARNING] Commission ${comm.id} has zero or negative amount:`, comm.amount);
        }
    });
    const stats = partnerStats ? Object.assign(Object.assign({}, partnerStats), commissionStats) : {
        totalInvestors: 0,
        activeInvestors: 0,
        totalInvestments: 0,
        approvedInvestments: 0,
        conversionRate: 0,
        totalCommissions: 0,
        paidCommissions: 0,
        pendingCommissions: 0,
        monthlyCommissions: 0
    };
    // Log das estatísticas finais com validação
    console.log('=== FINAL DASHBOARD STATS ===');
    console.log('Final stats used in dashboard:', stats);
    // Validações finais
    if (stats.activeInvestors > stats.totalInvestors) {
        console.error('[CRITICAL] Active investors > Total investors!');
    }
    if (stats.conversionRate > 100) {
        console.error('[CRITICAL] Conversion rate > 100%!');
    }
    if (stats.approvedInvestments < 0) {
        console.error('[CRITICAL] Negative approved investments!');
    }
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut();
        navigate('/auth');
    });
    if (isLoadingPartnerId || isLoading || isLoadingCommissions) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Carregando dashboard..." })] }) }));
    }
    if (partnerError) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Erro de Configura\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-600 mb-4", children: "N\u00E3o foi poss\u00EDvel carregar seus dados de parceiro. Sua conta pode ainda estar sendo configurada." }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Tentar Novamente"] }), _jsx(Button, { variant: "outline", onClick: () => navigate('/'), children: "Voltar ao In\u00EDcio" })] })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(PartnerDashboardHeader, { userFullName: userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name, onLogout: handleLogout }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Bem-vindo ao seu Dashboard" }), _jsx("p", { className: "text-gray-600", children: "Gerencie seus investidores cadastrados e acompanhe suas comiss\u00F5es." })] }), _jsx(PartnerStatsCards, { stats: stats }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(PartnerQuickActions, { partnerId: partnerId }), _jsx(PartnerAccountStatus, { partnerId: partnerId, stats: stats })] })] })] }));
};
const PartnerDashboard = () => {
    return (_jsx(PartnerErrorBoundary, { children: _jsx(PartnerDashboardContent, {}) }));
};
export default PartnerDashboard;
