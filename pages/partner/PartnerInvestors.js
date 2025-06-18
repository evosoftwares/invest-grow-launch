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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, UserPlus, Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useInvestorMutations } from "@/hooks/useInvestors";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
const PartnerInvestors = () => {
    const navigate = useNavigate();
    const { userProfile } = useAuth();
    const { updateInvestorStatus } = useInvestorMutations();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { data: investors, isLoading, refetch } = useQuery({
        queryKey: ['partner-investors', userProfile === null || userProfile === void 0 ? void 0 : userProfile.id, searchTerm, statusFilter],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id))
                return [];
            // Buscar o partner_id baseado no profile_id
            const { data: partnerData } = yield supabase
                .from('partners')
                .select('id')
                .eq('profile_id', userProfile.id)
                .single();
            if (!partnerData)
                return [];
            // Construir query
            let query = supabase
                .from('investors')
                .select('*')
                .eq('partner_id', partnerData.id)
                .order('created_at', { ascending: false });
            // Aplicar filtros
            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }
            if (searchTerm) {
                query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
            }
            const { data, error } = yield query;
            if (error) {
                console.error('Error fetching partner investors:', error);
                return [];
            }
            return data;
        }),
        enabled: !!(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id)
    });
    const getStatusBadge = (status) => {
        const statusMap = {
            lead: { label: "Lead", variant: "secondary" },
            contacted: { label: "Contatado", variant: "outline" },
            proposal_sent: { label: "Proposta Enviada", variant: "default" },
            negotiation: { label: "Negociação", variant: "default" },
            analysis: { label: "Em Análise", variant: "default" },
            invested: { label: "Investidor", variant: "default" },
            lost: { label: "Perdido", variant: "destructive" },
        };
        const config = statusMap[status] || { label: status, variant: "secondary" };
        return _jsx(Badge, { variant: config.variant, children: config.label });
    };
    const handleStatusChange = (investorId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield updateInvestorStatus.mutateAsync({
                id: investorId,
                status: newStatus
            });
            refetch();
        }
        catch (error) {
            console.error('Error updating investor status:', error);
        }
    });
    const filteredInvestors = investors || [];
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/partner/dashboard'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Voltar"] }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Meus Investidores" })] }), _jsxs(Button, { onClick: () => navigate('/partner/investors/new'), children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Cadastrar Investidor"] })] }) }), _jsxs("div", { className: "p-6", children: [_jsxs(Card, { className: "mb-6", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Filtros" }), _jsx(CardDescription, { children: "Filtre seus investidores por status ou pesquise por nome/email" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: "Pesquisar por nome ou email...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }) }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-48", children: _jsx(SelectValue, { placeholder: "Filtrar por status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos os Status" }), _jsx(SelectItem, { value: "lead", children: "Lead" }), _jsx(SelectItem, { value: "contacted", children: "Contatado" }), _jsx(SelectItem, { value: "proposal_sent", children: "Proposta Enviada" }), _jsx(SelectItem, { value: "negotiation", children: "Negocia\u00E7\u00E3o" }), _jsx(SelectItem, { value: "analysis", children: "Em An\u00E1lise" }), _jsx(SelectItem, { value: "invested", children: "Investidor" }), _jsx(SelectItem, { value: "lost", children: "Perdido" })] })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: filteredInvestors.length }), _jsx("p", { className: "text-sm text-gray-600", children: "Total de Investidores" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: filteredInvestors.filter(inv => inv.status === 'invested').length }), _jsx("p", { className: "text-sm text-gray-600", children: "Investidores Ativos" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: filteredInvestors.filter(inv => ['analysis', 'proposal_sent', 'negotiation'].includes(inv.status)).length }), _jsx("p", { className: "text-sm text-gray-600", children: "Em Processo" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: filteredInvestors.filter(inv => inv.status === 'lead').length }), _jsx("p", { className: "text-sm text-gray-600", children: "Novos Leads" })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Lista de Investidores" }), _jsx(CardDescription, { children: "Gerencie seus investidores cadastrados e acompanhe o status de cada um" })] }), _jsx(CardContent, { children: filteredInvestors.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-gray-500 mb-4", children: searchTerm || statusFilter !== 'all'
                                                ? "Nenhum investidor encontrado com esses filtros."
                                                : "Você ainda não cadastrou nenhum investidor." }), _jsxs(Button, { onClick: () => navigate('/partner/investors/new'), children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Cadastrar Primeiro Investidor"] })] })) : (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Nome" }), _jsx(TableHead, { children: "Contato" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Cadastrado em" }), _jsx(TableHead, { children: "\u00DAltimo Contato" }), _jsx(TableHead, { children: "A\u00E7\u00F5es" })] }) }), _jsx(TableBody, { children: filteredInvestors.map((investor) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: investor.full_name }), _jsx("div", { className: "text-sm text-gray-500", children: investor.email })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex gap-2", children: [investor.email && (_jsx(Button, { size: "sm", variant: "ghost", asChild: true, children: _jsx("a", { href: `mailto:${investor.email}`, children: _jsx(Mail, { className: "w-4 h-4" }) }) })), investor.phone && (_jsx(Button, { size: "sm", variant: "ghost", asChild: true, children: _jsx("a", { href: `tel:${investor.phone}`, children: _jsx(Phone, { className: "w-4 h-4" }) }) }))] }) }), _jsx(TableCell, { children: getStatusBadge(investor.status) }), _jsx(TableCell, { children: format(new Date(investor.created_at), 'dd/MM/yyyy', { locale: ptBR }) }), _jsx(TableCell, { children: investor.last_contact_date
                                                            ? format(new Date(investor.last_contact_date), 'dd/MM/yyyy', { locale: ptBR })
                                                            : 'Nunca' }), _jsx(TableCell, { children: _jsx("div", { className: "flex gap-2", children: _jsxs(Select, { value: investor.status, onValueChange: (value) => handleStatusChange(investor.id, value), children: [_jsx(SelectTrigger, { className: "w-32", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "lead", children: "Lead" }), _jsx(SelectItem, { value: "contacted", children: "Contatado" }), _jsx(SelectItem, { value: "proposal_sent", children: "Proposta Enviada" }), _jsx(SelectItem, { value: "negotiation", children: "Negocia\u00E7\u00E3o" }), _jsx(SelectItem, { value: "analysis", children: "Em An\u00E1lise" }), _jsx(SelectItem, { value: "invested", children: "Investidor" }), _jsx(SelectItem, { value: "lost", children: "Perdido" })] })] }) }) })] }, investor.id))) })] })) })] })] })] }));
};
export default PartnerInvestors;
