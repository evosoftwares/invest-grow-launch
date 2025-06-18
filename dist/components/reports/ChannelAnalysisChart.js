import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
const chartConfig = {
    channel: {
        label: "Canal",
    },
};
export const ChannelAnalysisChart = ({ data }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-5 h-5 text-blue-600" }), "An\u00E1lise por Canal"] }), _jsx(CardDescription, { children: "Distribui\u00E7\u00E3o de investimentos por fonte de origem" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx("div", { children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", outerRadius: 80, dataKey: "percentage", label: ({ channel, percentage }) => `${channel}: ${percentage.toFixed(1)}%`, children: data.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { formatter: (value, name, props) => {
                                                        var _a;
                                                        return [
                                                            `${Number(value).toFixed(1)}%`,
                                                            ((_a = props === null || props === void 0 ? void 0 : props.payload) === null || _a === void 0 ? void 0 : _a.channel) || 'Canal'
                                                        ];
                                                    } }) })] }) }) }) }), _jsx("div", { className: "space-y-4", children: data.map((item, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: COLORS[index % COLORS.length] } }), _jsx("span", { className: "font-medium", children: item.channel })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-semibold", children: [item.percentage.toFixed(1), "%"] }), _jsx("p", { className: "text-sm text-gray-500", children: formatCurrency(item.amount) }), _jsxs("p", { className: "text-xs text-gray-400", children: [item.count, " investimentos"] })] })] }, item.channel))) })] }) })] }));
};
