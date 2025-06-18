import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";
export const ROIProjection = ({ data }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };
    const calculateYearlyGrowth = (currentBalance, previousBalance) => {
        if (previousBalance === 0)
            return 0;
        return ((currentBalance - previousBalance) / previousBalance) * 100;
    };
    const calculateYearlyROI = (currentInterest, currentContributed) => {
        if (currentContributed === 0)
            return 0;
        return (currentInterest / currentContributed) * 100;
    };
    return (_jsxs(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-white to-amber-50", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [_jsx(Calendar, { className: "w-5 h-5 text-amber-600" }), "Proje\u00E7\u00E3o Detalhada"] }), _jsx(CardDescription, { children: "Acompanhe a evolu\u00E7\u00E3o ano a ano do seu investimento" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gradient-to-r from-amber-50 to-orange-50", children: [_jsx(TableHead, { className: "font-semibold", children: "Ano" }), _jsx(TableHead, { className: "font-semibold", children: "Total Investido" }), _jsx(TableHead, { className: "font-semibold", children: "Lucro Acumulado" }), _jsx(TableHead, { className: "font-semibold", children: "Saldo Total" }), _jsx(TableHead, { className: "font-semibold", children: "ROI (%)" }), _jsx(TableHead, { className: "font-semibold", children: "Crescimento" })] }) }), _jsx(TableBody, { children: data.map((row, index) => {
                                        const previousBalance = index > 0 ? data[index - 1].balance : row.balance;
                                        const growth = calculateYearlyGrowth(row.balance, previousBalance);
                                        const roi = calculateYearlyROI(row.interest, row.contributed);
                                        return (_jsxs(TableRow, { className: "hover:bg-gradient-to-r hover:from-amber-25 hover:to-orange-25 transition-all duration-200", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm", children: row.year }), row.year === 0 ? "Inicial" : `${row.year} ano${row.year > 1 ? 's' : ''}`] }) }), _jsx(TableCell, { className: "font-semibold text-blue-600", children: formatCurrency(row.contributed) }), _jsx(TableCell, { className: "font-semibold text-green-600", children: formatCurrency(row.interest) }), _jsx(TableCell, { className: "font-bold text-purple-600 text-lg", children: formatCurrency(row.balance) }), _jsx(TableCell, { children: row.year > 0 && (_jsxs(Badge, { className: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white", children: [roi.toFixed(1), "%"] })) }), _jsx(TableCell, { children: row.year > 0 && (_jsxs(Badge, { className: `${growth > 0
                                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                            : 'bg-gradient-to-r from-red-500 to-rose-500'} text-white`, children: [_jsx(TrendingUp, { className: "w-3 h-3 mr-1" }), growth > 0 ? '+' : '', growth.toFixed(1), "%"] })) })] }, row.year));
                                    }) })] }) }), data.length > 0 && (_jsxs("div", { className: "mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-amber-600" }), _jsx("h4", { className: "font-semibold text-amber-800", children: "Resumo Final" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-amber-700", children: "Valor Final:" }), _jsx("p", { className: "font-bold text-lg text-amber-800", children: formatCurrency(data[data.length - 1].balance) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-amber-700", children: "Total Investido:" }), _jsx("p", { className: "font-bold text-lg text-amber-800", children: formatCurrency(data[data.length - 1].contributed) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-amber-700", children: "Lucro Total:" }), _jsx("p", { className: "font-bold text-lg text-amber-800", children: formatCurrency(data[data.length - 1].interest) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-amber-700", children: "ROI Total:" }), _jsxs("p", { className: "font-bold text-lg text-amber-800", children: [calculateYearlyROI(data[data.length - 1].interest, data[data.length - 1].contributed).toFixed(1), "%"] })] })] })] }))] })] }));
};
