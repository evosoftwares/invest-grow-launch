import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
export const ConversionFunnelChart = ({ data }) => {
    const stages = [
        { label: 'Visitantes', value: data.visitors, color: 'bg-blue-500' },
        { label: 'Leads', value: data.leads, color: 'bg-green-500' },
        { label: 'Interessados', value: data.interested, color: 'bg-yellow-500' },
        { label: 'Propostas', value: data.proposals, color: 'bg-purple-500' },
        { label: 'Investidores', value: data.investors, color: 'bg-red-500' },
    ];
    const calculateConversionRate = (current, previous) => {
        if (previous === 0)
            return 0;
        return ((current / previous) * 100).toFixed(1);
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Target, { className: "w-5 h-5 text-purple-600" }), "Funil de Convers\u00E3o"] }), _jsx(CardDescription, { children: "Acompanhe a jornada dos visitantes at\u00E9 se tornarem investidores" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: stages.map((stage, index) => {
                            const previousValue = index > 0 ? stages[index - 1].value : stage.value;
                            const conversionRate = index > 0 ? calculateConversionRate(stage.value, previousValue) : '100.0';
                            return (_jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg relative", children: [_jsx("div", { className: `text-2xl font-bold text-white p-3 rounded-full ${stage.color} inline-block mb-2`, children: stage.value.toLocaleString('pt-BR') }), _jsx("div", { className: "text-sm font-medium text-gray-700", children: stage.label }), _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [conversionRate, "%"] }), index < stages.length - 1 && (_jsx("div", { className: "hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2", children: _jsx("div", { className: "w-4 h-4 bg-gray-300 rotate-45 transform" }) }))] }, stage.label));
                        }) }), _jsxs("div", { className: "mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-purple-800 mb-2", children: "An\u00E1lise de Performance" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-purple-700", children: "Taxa Global:" }), _jsxs("p", { className: "font-bold text-purple-800", children: [calculateConversionRate(data.investors, data.visitors), "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-purple-700", children: "Lead \u2192 Investidor:" }), _jsxs("p", { className: "font-bold text-purple-800", children: [calculateConversionRate(data.investors, data.leads), "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-purple-700", children: "Proposta \u2192 Fechamento:" }), _jsxs("p", { className: "font-bold text-purple-800", children: [calculateConversionRate(data.investors, data.proposals), "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-purple-700", children: "Total Convertido:" }), _jsxs("p", { className: "font-bold text-purple-800", children: [data.investors.toLocaleString('pt-BR'), " investidores"] })] })] })] })] })] }));
};
