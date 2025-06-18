import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, BarChart3 } from "lucide-react";
const chartConfig = {
    balance: {
        label: "Saldo Total",
        color: "hsl(var(--chart-1))",
    },
    contributed: {
        label: "Total Investido",
        color: "hsl(var(--chart-2))",
    },
    interest: {
        label: "Lucro",
        color: "hsl(var(--chart-3))",
    },
};
export const ROIChart = ({ data }) => {
    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return `R$ ${(value / 1000000).toFixed(1)}M`;
        }
        else if (value >= 1000) {
            return `R$ ${(value / 1000).toFixed(0)}k`;
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    const formatTooltipCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-white to-purple-50", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-purple-600" }), "Evolu\u00E7\u00E3o do Investimento"] }), _jsx(CardDescription, { children: "Visualize como seu investimento cresce ao longo do tempo" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: data, margin: {
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "colorBalance", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#8b5cf6", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#8b5cf6", stopOpacity: 0.1 })] }), _jsxs("linearGradient", { id: "colorContributed", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0.1 })] })] }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e7ff" }), _jsx(XAxis, { dataKey: "year", stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: formatCurrency }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { formatter: (value, name) => {
                                                    var _a;
                                                    return [
                                                        formatTooltipCurrency(Number(value)),
                                                        ((_a = chartConfig[name]) === null || _a === void 0 ? void 0 : _a.label) || name
                                                    ];
                                                }, labelFormatter: (label) => `Ano ${label}` }) }), _jsx(Area, { type: "monotone", dataKey: "balance", stroke: "#8b5cf6", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorBalance)" }), _jsx(Area, { type: "monotone", dataKey: "contributed", stroke: "#3b82f6", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorContributed)" })] }) }) }) })] }), _jsxs(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-white to-green-50", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [_jsx(BarChart3, { className: "w-5 h-5 text-green-600" }), "Comparativo: Investido vs Lucro"] }), _jsx(CardDescription, { children: "Compare o valor investido com o lucro obtido por ano" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: data, margin: {
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e7ff" }), _jsx(XAxis, { dataKey: "year", stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#6b7280", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: formatCurrency }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { formatter: (value, name) => {
                                                    var _a;
                                                    return [
                                                        formatTooltipCurrency(Number(value)),
                                                        ((_a = chartConfig[name]) === null || _a === void 0 ? void 0 : _a.label) || name
                                                    ];
                                                }, labelFormatter: (label) => `Ano ${label}` }) }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "contributed", fill: "#3b82f6", name: "Total Investido", radius: [4, 4, 0, 0] }), _jsx(Bar, { dataKey: "interest", fill: "#10b981", name: "Lucro", radius: [4, 4, 0, 0] })] }) }) }) })] })] }));
};
