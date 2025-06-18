import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Clock, CheckCircle, Download, Loader2 } from "lucide-react";
import { useInvestments, useInvestmentMutations } from "@/hooks/useInvestments";
import { toast } from "@/components/ui/use-toast";
const FinancialManagement = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const { data: investments = [], isLoading, error } = useInvestments();
    const { updateInvestmentStatus } = useInvestmentMutations();
    const getStatusBadge = (status) => {
        const statusMap = {
            pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
            analysis: { label: "Análise", color: "bg-blue-100 text-blue-800" },
            approved: { label: "Aprovado", color: "bg-green-100 text-green-800" },
            rejected: { label: "Rejeitado", color: "bg-red-100 text-red-800" },
            paid: { label: "Pago", color: "bg-purple-100 text-purple-800" }
        };
        const statusInfo = statusMap[status] || statusMap.pending;
        return _jsx(Badge, { className: statusInfo.color, children: statusInfo.label });
    };
    const handleStatusChange = (investmentId, newStatus) => {
        updateInvestmentStatus.mutate({ id: investmentId, status: newStatus });
    };
    const handleExport = () => {
        toast({
            title: "Exportação iniciada",
            description: "Os dados financeiros serão exportados em breve.",
        });
    };
    const getFinancialStats = () => {
        if (!investments.length)
            return {
                totalCaptado: 0,
                investimentosPendentes: 0,
                valorPendente: 0,
                valorAprovado: 0,
                valorPago: 0
            };
        const totalCaptado = investments
            .filter(inv => inv.status === 'paid')
            .reduce((sum, inv) => sum + Number(inv.amount), 0);
        const investimentosPendentes = investments.filter(inv => inv.status === 'pending').length;
        const valorPendente = investments
            .filter(inv => inv.status === 'pending')
            .reduce((sum, inv) => sum + Number(inv.amount), 0);
        const valorAprovado = investments
            .filter(inv => inv.status === 'approved')
            .reduce((sum, inv) => sum + Number(inv.amount), 0);
        const valorPago = investments
            .filter(inv => inv.status === 'paid')
            .reduce((sum, inv) => sum + Number(inv.amount), 0);
        return {
            totalCaptado,
            investimentosPendentes,
            valorPendente,
            valorAprovado,
            valorPago
        };
    };
    const filteredInvestments = investments.filter(investment => {
        return statusFilter === "all" || investment.status === statusFilter;
    });
    if (error) {
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-red-600 mb-2", children: "Erro ao carregar dados financeiros" }), _jsx("p", { className: "text-gray-500", children: error.message })] }) }) }));
    }
    const financialStats = getFinancialStats();
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Gest\u00E3o Financeira" }), _jsx("p", { className: "text-gray-600", children: "Controle de investimentos e pagamentos" })] }), _jsxs(Button, { onClick: handleExport, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Relat\u00F3rio Financeiro"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Total Captado" }), _jsxs("p", { className: "text-2xl font-bold", children: ["R$ ", (financialStats.totalCaptado / 1000000).toFixed(1), "M"] })] }), _jsx("div", { className: "p-3 bg-green-100 rounded-full", children: _jsx(DollarSign, { className: "h-6 w-6 text-green-600" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-sm", children: [_jsx(TrendingUp, { className: "h-4 w-4 text-green-500 mr-1" }), _jsx("span", { className: "text-green-600", children: "Investimentos pagos" })] })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Valor Aprovado" }), _jsxs("p", { className: "text-2xl font-bold", children: ["R$ ", (financialStats.valorAprovado / 1000).toFixed(0), "K"] })] }), _jsx("div", { className: "p-3 bg-blue-100 rounded-full", children: _jsx(CheckCircle, { className: "h-6 w-6 text-blue-600" }) })] }), _jsx("div", { className: "mt-4 text-sm text-gray-600", children: "Aguardando pagamento" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Investimentos Pendentes" }), _jsx("p", { className: "text-2xl font-bold", children: financialStats.investimentosPendentes })] }), _jsx("div", { className: "p-3 bg-yellow-100 rounded-full", children: _jsx(Clock, { className: "h-6 w-6 text-yellow-600" }) })] }), _jsxs("div", { className: "mt-4 text-sm text-gray-600", children: ["R$ ", financialStats.valorPendente.toLocaleString('pt-BR'), " em an\u00E1lise"] })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Valor Total" }), _jsxs("p", { className: "text-2xl font-bold", children: ["R$ ", ((financialStats.totalCaptado + financialStats.valorAprovado + financialStats.valorPendente) / 1000).toFixed(1), "K"] })] }), _jsx("div", { className: "p-3 bg-purple-100 rounded-full", children: _jsx(DollarSign, { className: "h-6 w-6 text-purple-600" }) })] }), _jsx("div", { className: "mt-4 text-sm text-gray-600", children: "Todos os investimentos" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Filtrar Investimentos" }) }), _jsx(CardContent, { children: _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos os Status" }), _jsx(SelectItem, { value: "pending", children: "Pendente" }), _jsx(SelectItem, { value: "analysis", children: "An\u00E1lise" }), _jsx(SelectItem, { value: "approved", children: "Aprovado" }), _jsx(SelectItem, { value: "rejected", children: "Rejeitado" }), _jsx(SelectItem, { value: "paid", children: "Pago" })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Investimentos Recentes (", filteredInvestments.length, ")"] }) }), _jsx(CardContent, { children: isLoading ? (_jsxs("div", { className: "flex items-center justify-center py-8", children: [_jsx(Loader2, { className: "w-6 h-6 animate-spin mr-2" }), "Carregando investimentos..."] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Investidor" }), _jsx(TableHead, { children: "Valor" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Tipo" }), _jsx(TableHead, { children: "Data" }), _jsx(TableHead, { children: "A\u00E7\u00F5es" })] }) }), _jsxs(TableBody, { children: [filteredInvestments.map((investment) => {
                                                    var _a, _b;
                                                    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { children: [_jsx("p", { children: ((_a = investment.investors) === null || _a === void 0 ? void 0 : _a.full_name) || 'Nome não informado' }), _jsx("p", { className: "text-sm text-gray-500", children: (_b = investment.investors) === null || _b === void 0 ? void 0 : _b.email })] }) }), _jsxs(TableCell, { className: "font-semibold", children: ["R$ ", Number(investment.amount).toLocaleString('pt-BR')] }), _jsx(TableCell, { children: getStatusBadge(investment.status) }), _jsx(TableCell, { children: investment.investment_type || 'Equity' }), _jsx(TableCell, { children: new Date(investment.created_at).toLocaleDateString('pt-BR') }), _jsx(TableCell, { children: _jsx("div", { className: "flex space-x-2", children: _jsxs(Select, { value: investment.status, onValueChange: (value) => handleStatusChange(investment.id, value), children: [_jsx(SelectTrigger, { className: "w-32", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "pending", children: "Pendente" }), _jsx(SelectItem, { value: "analysis", children: "An\u00E1lise" }), _jsx(SelectItem, { value: "approved", children: "Aprovado" }), _jsx(SelectItem, { value: "rejected", children: "Rejeitado" }), _jsx(SelectItem, { value: "paid", children: "Pago" })] })] }) }) })] }, investment.id));
                                                }), filteredInvestments.length === 0 && !isLoading && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-8 text-gray-500", children: "Nenhum investimento encontrado" }) }))] })] }) })) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "A\u00E7\u00F5es Necess\u00E1rias" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [financialStats.investimentosPendentes > 0 && (_jsxs("div", { className: "flex items-center justify-between p-4 border-l-4 border-yellow-400 bg-yellow-50", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Investimentos Pendentes" }), _jsxs("p", { className: "text-sm text-gray-600", children: [financialStats.investimentosPendentes, " investimentos aguardando an\u00E1lise"] })] }), _jsx(Button, { size: "sm", variant: "outline", children: "Revisar" })] })), financialStats.valorAprovado > 0 && (_jsxs("div", { className: "flex items-center justify-between p-4 border-l-4 border-blue-400 bg-blue-50", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Pagamentos Pendentes" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["R$ ", financialStats.valorAprovado.toLocaleString('pt-BR'), " para processar"] })] }), _jsx(Button, { size: "sm", variant: "outline", children: "Processar" })] })), investments.length === 0 && (_jsxs("div", { className: "flex items-center justify-between p-4 border-l-4 border-gray-400 bg-gray-50", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Nenhum Investimento" }), _jsx("p", { className: "text-sm text-gray-600", children: "Aguardando primeiros investimentos" })] }), _jsx(Button, { size: "sm", variant: "outline", children: "Estrat\u00E9gia" })] }))] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Resumo por Status" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center p-4 bg-yellow-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Pendentes" }), _jsxs("p", { className: "text-sm text-gray-600", children: [investments.filter(i => i.status === 'pending').length, " investimentos"] })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-2xl font-bold text-yellow-600", children: ["R$ ", (investments.filter(i => i.status === 'pending').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0), "K"] }) })] }), _jsxs("div", { className: "flex justify-between items-center p-4 bg-green-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Pagos" }), _jsxs("p", { className: "text-sm text-gray-600", children: [investments.filter(i => i.status === 'paid').length, " investimentos"] })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-2xl font-bold text-green-600", children: ["R$ ", (investments.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0), "K"] }) })] }), _jsxs("div", { className: "flex justify-between items-center p-4 bg-blue-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Aprovados" }), _jsxs("p", { className: "text-sm text-gray-600", children: [investments.filter(i => i.status === 'approved').length, " investimentos"] })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-2xl font-bold text-blue-600", children: ["R$ ", (investments.filter(i => i.status === 'approved').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0), "K"] }) })] })] }) })] })] })] }) }));
};
export default FinancialManagement;
