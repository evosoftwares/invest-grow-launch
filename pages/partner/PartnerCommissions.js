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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeft, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePartnerCommissions } from "@/hooks/usePartnerCommissions";
const PartnerCommissions = () => {
    const navigate = useNavigate();
    const { signOut, userProfile } = useAuth();
    const { data: commissions = [], isLoading, error } = usePartnerCommissions();
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut();
        navigate('/auth');
    });
    // Calcular totais
    const totalPaid = commissions
        .filter(c => c.paid_at !== null)
        .reduce((acc, c) => acc + Number(c.amount), 0);
    const totalPending = commissions
        .filter(c => c.paid_at === null)
        .reduce((acc, c) => acc + Number(c.amount), 0);
    const getStatusBadge = (paidAt) => {
        if (paidAt) {
            return _jsx(Badge, { className: "bg-green-100 text-green-800", children: "Pago" });
        }
        else {
            return _jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pendente" });
        }
    };
    const getTypeBadge = (rate) => {
        if (rate === 5.0) {
            return _jsx(Badge, { className: "bg-blue-100 text-blue-800", children: "Inicial" });
        }
        else {
            return _jsx(Badge, { className: "bg-purple-100 text-purple-800", children: "Recorrente" });
        }
    };
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx(Card, { className: "w-full max-w-md", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center text-red-600", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Erro ao carregar comiss\u00F5es" }), _jsx("p", { className: "text-sm", children: error.message })] }) }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsxs(Button, { variant: "ghost", onClick: () => navigate('/partner/dashboard'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Dashboard"] }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Hist\u00F3rico de Comiss\u00F5es" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Ol\u00E1, ", (userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name) || 'Parceiro'] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleLogout, children: "Sair" })] })] }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Suas Comiss\u00F5es" }), _jsx("p", { className: "text-gray-600", children: "Acompanhe o hist\u00F3rico completo das suas comiss\u00F5es por indica\u00E7\u00E3o." })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Recebido" }), _jsx(DollarSign, { className: "h-4 w-4 text-green-600" })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-green-600", children: isLoading ? (_jsx(Loader2, { className: "w-6 h-6 animate-spin" })) : (`R$ ${totalPaid.toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}`) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Pendente" }), _jsx(Calendar, { className: "h-4 w-4 text-yellow-600" })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-yellow-600", children: isLoading ? (_jsx(Loader2, { className: "w-6 h-6 animate-spin" })) : (`R$ ${totalPending.toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}`) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Geral" }), _jsx(TrendingUp, { className: "h-4 w-4 text-blue-600" })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-blue-600", children: isLoading ? (_jsx(Loader2, { className: "w-6 h-6 animate-spin" })) : (`R$ ${(totalPaid + totalPending).toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}`) }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Hist\u00F3rico Detalhado" }), _jsx(CardDescription, { children: "Lista completa de todas as suas comiss\u00F5es" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin" }) })) : (_jsxs("div", { className: "space-y-4", children: [commissions.map((commission) => {
                                            var _a, _b, _c;
                                            return (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg bg-white", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "font-semibold", children: ((_b = (_a = commission.investments) === null || _a === void 0 ? void 0 : _a.investors) === null || _b === void 0 ? void 0 : _b.full_name) || 'Investidor' }), getTypeBadge(Number(commission.rate)), getStatusBadge(commission.paid_at)] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("div", { children: ["Investimento: R$ ", Number(((_c = commission.investments) === null || _c === void 0 ? void 0 : _c.amount) || 0).toLocaleString('pt-BR', {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })] }), _jsxs("div", { children: ["Taxa: ", Number(commission.rate), "%"] }), _jsxs("div", { children: ["Data: ", new Date(commission.calculated_at).toLocaleDateString('pt-BR')] }), commission.paid_at && (_jsxs("div", { children: ["Pago em: ", new Date(commission.paid_at).toLocaleDateString('pt-BR')] }))] })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-2xl font-bold text-green-600", children: ["R$ ", Number(commission.amount).toLocaleString('pt-BR', {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })] }) })] }, commission.id));
                                        }), commissions.length === 0 && !isLoading && (_jsxs("div", { className: "text-center py-12 text-gray-500", children: [_jsx(DollarSign, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Nenhuma comiss\u00E3o ainda" }), _jsx("p", { children: "Suas comiss\u00F5es aparecer\u00E3o aqui assim que voc\u00EA fizer suas primeiras indica\u00E7\u00F5es." })] }))] })) })] })] })] }));
};
export default PartnerCommissions;
