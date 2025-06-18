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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, ExternalLink, ArrowLeft, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { usePartnerLinks, usePartnerLinkMutations } from "@/hooks/usePartnerLinks";
import { usePartnerId } from "@/hooks/usePartnerId";
import { CreateLinkModal } from "@/components/partner/CreateLinkModal";
import PartnerErrorBoundary from "@/components/partner/PartnerErrorBoundary";
const PartnerLinksContent = () => {
    const navigate = useNavigate();
    const { signOut, userProfile } = useAuth();
    const { data: partnerId, isLoading: isLoadingPartnerId, error: partnerError } = usePartnerId();
    const { data: links = [], isLoading, error } = usePartnerLinks();
    const { deletePartnerLink } = usePartnerLinkMutations();
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut();
        navigate('/auth');
    });
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        toast({
            title: "Link copiado!",
            description: "O link foi copiado para a área de transferência.",
        });
    };
    const handleDeleteLink = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
        if (window.confirm(`Tem certeza que deseja excluir o link "${name}"?`)) {
            yield deletePartnerLink.mutateAsync(id);
        }
    });
    if (isLoadingPartnerId || isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Carregando links..." })] }) }));
    }
    if (partnerError) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Erro de Configura\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-600 mb-4", children: "N\u00E3o foi poss\u00EDvel carregar seus dados de parceiro. Isso pode acontecer se sua conta ainda n\u00E3o foi configurada como parceiro." }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Tentar Novamente"] }), _jsx(Button, { variant: "outline", onClick: () => navigate('/partner/dashboard'), children: "Voltar ao Dashboard" })] })] }) }));
    }
    if (!partnerId) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-orange-500 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Conta em Configura\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Sua conta de parceiro est\u00E1 sendo configurada. Tente novamente em alguns minutos ou entre em contato com o suporte." }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Verificar Novamente"] }), _jsx(Button, { variant: "outline", onClick: () => navigate('/partner/dashboard'), children: "Voltar ao Dashboard" })] })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsxs("p", { className: "text-red-600 mb-4", children: ["Erro ao carregar links: ", error.message] }), _jsxs(Button, { onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Tentar Novamente"] })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsxs(Button, { variant: "ghost", onClick: () => navigate('/partner/dashboard'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Dashboard"] }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Links de Indica\u00E7\u00E3o" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Ol\u00E1, ", (userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name) || 'Parceiro'] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleLogout, children: "Sair" })] })] }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Seus Links de Indica\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-600", children: "Gerencie seus links personalizados e acompanhe o desempenho." })] }), _jsx(CreateLinkModal, {})] }), _jsx("div", { className: "space-y-4", children: links.map((link) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: link.name }), _jsxs(CardDescription, { children: [link.description && (_jsx("span", { className: "block mb-1", children: link.description })), "Criado em ", new Date(link.created_at).toLocaleDateString('pt-BR')] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "outline", children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), link.clicks, " cliques"] }), _jsxs(Badge, { className: "bg-green-100 text-green-800", children: [link.conversions, " convers\u00F5es"] }), !link.is_active && (_jsx(Badge, { variant: "destructive", children: "Inativo" }))] })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Input, { value: link.url, readOnly: true, className: "flex-1 bg-gray-50" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => copyToClipboard(link.url), children: _jsx(Copy, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => window.open(link.url, '_blank'), children: _jsx(ExternalLink, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleDeleteLink(link.id, link.name), children: _jsx(Trash2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-500", children: "Taxa de Convers\u00E3o:" }), _jsxs("div", { className: "font-semibold", children: [link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0, "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500", children: "Total de Cliques:" }), _jsx("div", { className: "font-semibold", children: link.clicks })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500", children: "Convers\u00F5es:" }), _jsx("div", { className: "font-semibold", children: link.conversions })] })] })] })] }, link.id))) }), links.length === 0 && (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-12", children: [_jsxs("div", { className: "text-gray-500 mb-4", children: [_jsx(ExternalLink, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Nenhum link criado ainda" }), _jsx("p", { children: "Crie seu primeiro link de indica\u00E7\u00E3o para come\u00E7ar a ganhar comiss\u00F5es." })] }), _jsx(CreateLinkModal, {})] }) }))] })] }));
};
const PartnerLinks = () => {
    return (_jsx(PartnerErrorBoundary, { children: _jsx(PartnerLinksContent, {}) }));
};
export default PartnerLinks;
