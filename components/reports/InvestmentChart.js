import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
const chartConfig = {
    totalAmount: {
        label: "Valor Captado",
        color: "hsl(var(--chart-1))",
    },
    investorCount: {
        label: "Número de Investidores",
        color: "hsl(var(--chart-2))",
    },
};
export const InvestmentChart = ({ data }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }), "Evolu\u00E7\u00E3o de Capta\u00E7\u00E3o"] }), _jsx(CardDescription, { children: "Acompanhe o crescimento mensal dos investimentos" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: data, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorAmount", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#10b981", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#10b981", stopOpacity: 0.1 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e7ff" }), _jsx(XAxis, { dataKey: "month", stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: formatCurrency }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { formatter: (value, name) => {
                                                    var _a;
                                                    return [
                                                        name === 'totalAmount' ? formatCurrency(Number(value)) : Number(value),
                                                        ((_a = chartConfig[name]) === null || _a === void 0 ? void 0 : _a.label) || name
                                                    ];
                                                } }) }), _jsx(Area, { type: "monotone", dataKey: "totalAmount", stroke: "#10b981", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorAmount)" })] }) }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "N\u00FAmero de Investidores por M\u00EAs" }), _jsx(CardDescription, { children: "Quantidade de novos investidores mensalmente" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(BarChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e7ff" }), _jsx(XAxis, { dataKey: "month", stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { formatter: (value, name) => {
                                                    var _a;
                                                    return [
                                                        Number(value),
                                                        ((_a = chartConfig[name]) === null || _a === void 0 ? void 0 : _a.label) || name
                                                    ];
                                                } }) }), _jsx(Bar, { dataKey: "investorCount", fill: "#3b82f6", radius: [4, 4, 0, 0] })] }) }) }) })] })] }));
};
