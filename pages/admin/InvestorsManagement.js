import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvestors } from '@/hooks/useInvestors';
import { useInvestments } from '@/hooks/useInvestments';
import { InvestmentApprovalActions } from '@/components/admin/InvestmentApprovalActions';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Plus, FileText, DollarSign, User } from 'lucide-react';
const InvestorsManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('investors');
    const { data: investors, isLoading: investorsLoading, error: investorsError } = useInvestors();
    const { data: investments, isLoading: investmentsLoading, error: investmentsError } = useInvestments();
    const getStatusBadge = (status) => {
        const statusMap = {
            'lead': { label: 'Lead', variant: 'secondary' },
            'interested': { label: 'Interessado', variant: 'default' },
            'investor': { label: 'Investidor', variant: 'default' },
            'inactive': { label: 'Inativo', variant: 'outline' },
            'pending': { label: 'Pendente', variant: 'secondary' },
            'approved': { label: 'Aprovado', variant: 'default' },
            'rejected': { label: 'Rejeitado', variant: 'destructive' },
            'paid': { label: 'Pago', variant: 'default' },
        };
        const config = statusMap[status] || { label: status, variant: 'outline' };
        return _jsx(Badge, { variant: config.variant, children: config.label });
    };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };
    const filteredInvestors = (investors === null || investors === void 0 ? void 0 : investors.filter(investor => {
        const matchesSearch = investor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            investor.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || investor.status === statusFilter;
        return matchesSearch && matchesStatus;
    })) || [];
    const filteredInvestments = (investments === null || investments === void 0 ? void 0 : investments.filter(investment => {
        var _a, _b, _c, _d;
        const matchesSearch = ((_b = (_a = investment.investors) === null || _a === void 0 ? void 0 : _a.full_name) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((_d = (_c = investment.investors) === null || _c === void 0 ? void 0 : _c.email) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || investment.status === statusFilter;
        return matchesSearch && matchesStatus;
    })) || [];
    const isLoading = investorsLoading || investmentsLoading;
    const error = investorsError || investmentsError;
    if (error) {
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "p-6", children: _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "text-center text-red-600", children: ["Erro ao carregar dados: ", error.message] }) }) }) }) }));
    }
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: activeTab === 'investors' ? 'Gerenciamento de Investidores' : 'Gerenciamento de Investimentos' }), _jsx("p", { className: "text-gray-600 mt-1", children: activeTab === 'investors'
                                        ? 'Gerencie investidores e leads do sistema'
                                        : 'Aprove e gerencie investimentos' })] }), _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Novo ", activeTab === 'investors' ? 'Investidor' : 'Investimento'] })] }), _jsxs("div", { className: "flex space-x-4 border-b", children: [_jsxs("button", { onClick: () => setActiveTab('investors'), className: `pb-2 px-1 font-medium text-sm ${activeTab === 'investors'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'}`, children: [_jsx(User, { className: "w-4 h-4 inline mr-2" }), "Investidores (", (investors === null || investors === void 0 ? void 0 : investors.length) || 0, ")"] }), _jsxs("button", { onClick: () => setActiveTab('investments'), className: `pb-2 px-1 font-medium text-sm ${activeTab === 'investments'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'}`, children: [_jsx(DollarSign, { className: "w-4 h-4 inline mr-2" }), "Investimentos (", (investments === null || investments === void 0 ? void 0 : investments.length) || 0, ")"] })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: `Buscar ${activeTab === 'investors' ? 'investidores' : 'investimentos'}...`, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-48", children: _jsx(SelectValue, { placeholder: "Filtrar por status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos os status" }), activeTab === 'investors' ? (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "lead", children: "Lead" }), _jsx(SelectItem, { value: "interested", children: "Interessado" }), _jsx(SelectItem, { value: "investor", children: "Investidor" }), _jsx(SelectItem, { value: "inactive", children: "Inativo" })] })) : (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "pending", children: "Pendente" }), _jsx(SelectItem, { value: "approved", children: "Aprovado" }), _jsx(SelectItem, { value: "rejected", children: "Rejeitado" }), _jsx(SelectItem, { value: "paid", children: "Pago" })] }))] })] })] }) }) }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "flex items-center gap-2", children: activeTab === 'investors' ? (_jsxs(_Fragment, { children: [_jsx(User, { className: "w-5 h-5" }), "Lista de Investidores"] })) : (_jsxs(_Fragment, { children: [_jsx(DollarSign, { className: "w-5 h-5" }), "Lista de Investimentos"] })) }), _jsx(CardDescription, { children: activeTab === 'investors'
                                        ? `${filteredInvestors.length} investidores encontrados`
                                        : `${filteredInvestments.length} investimentos encontrados` })] }), _jsx(CardContent, { children: isLoading ? (_jsx(LoadingSpinner, { text: "Carregando dados..." })) : activeTab === 'investors' ? (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Nome" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Origem" }), _jsx(TableHead, { children: "Data de Cadastro" }), _jsx(TableHead, { children: "A\u00E7\u00F5es" })] }) }), _jsx(TableBody, { children: filteredInvestors.map((investor) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: investor.full_name }), _jsx(TableCell, { children: investor.email }), _jsx(TableCell, { children: getStatusBadge(investor.status) }), _jsx(TableCell, { className: "capitalize", children: investor.lead_source.replace('_', ' ') }), _jsx(TableCell, { children: formatDate(investor.created_at) }), _jsx(TableCell, { children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(FileText, { className: "w-4 h-4 mr-1" }), "Ver Detalhes"] }) })] }, investor.id))) })] })) : (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Investidor" }), _jsx(TableHead, { children: "Valor" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Data" }), _jsx(TableHead, { children: "Parceiro" }), _jsx(TableHead, { children: "A\u00E7\u00F5es" })] }) }), _jsx(TableBody, { children: filteredInvestments.map((investment) => {
                                            var _a;
                                            return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: ((_a = investment.investors) === null || _a === void 0 ? void 0 : _a.full_name) || 'N/A' }), _jsx(TableCell, { children: formatCurrency(investment.amount) }), _jsx(TableCell, { children: getStatusBadge(investment.status) }), _jsx(TableCell, { children: formatDate(investment.created_at) }), _jsx(TableCell, { children: investment.partners ? 'Sim' : 'Direto' }), _jsx(TableCell, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(InvestmentApprovalActions, { investmentId: investment.id, currentStatus: investment.status }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(FileText, { className: "w-4 h-4 mr-1" }), "Detalhes"] })] }) })] }, investment.id));
                                        }) })] })) })] })] }) }));
};
export default InvestorsManagement;
