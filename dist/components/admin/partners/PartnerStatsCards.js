import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, TrendingUp, DollarSign } from "lucide-react";
export const PartnerStatsCards = ({ partners }) => {
    const totalStats = {
        totalPartners: partners.length,
        activePartners: partners.filter(p => p.status === 'active').length,
        pendingPartners: partners.filter(p => p.status === 'pending').length,
        avgCommissionRate: partners.length > 0
            ? partners.reduce((sum, p) => sum + Number(p.commission_rate), 0) / partners.length
            : 0
    };
    return (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold", children: totalStats.totalPartners }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Parceiros" })] }), _jsx(UserPlus, { className: "h-8 w-8 text-blue-500" })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: totalStats.activePartners }), _jsx("div", { className: "text-sm text-gray-600", children: "Parceiros Ativos" })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-green-500" })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: totalStats.pendingPartners }), _jsx("div", { className: "text-sm text-gray-600", children: "Pendentes" })] }), _jsx(DollarSign, { className: "h-8 w-8 text-yellow-500" })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold", children: [totalStats.avgCommissionRate.toFixed(1), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Comiss\u00E3o M\u00E9dia" })] }), _jsx(DollarSign, { className: "h-8 w-8 text-blue-500" })] }) }) })] }));
};
