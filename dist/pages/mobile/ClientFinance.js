import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Shield, Plus, Minus, TrendingUp, ArrowDownLeft, ArrowUpRight, CreditCard } from "lucide-react";
const ClientFinance = () => {
    const navigate = useNavigate();
    const transactions = [{
            id: 1,
            type: 'debit',
            description: 'Pagamento - Entrega de Documentos',
            amount: -25.00,
            date: '2024-01-15',
            status: 'completed',
            partner: 'João Silva'
        }, {
            id: 2,
            type: 'credit',
            description: 'Recarga de Saldo',
            amount: 200.00,
            date: '2024-01-15',
            status: 'completed',
            partner: 'PIX'
        }, {
            id: 3,
            type: 'debit',
            description: 'Pagamento - Corrida Aeroporto',
            amount: -45.00,
            date: '2024-01-14',
            status: 'pending',
            partner: 'Maria Santos'
        }, {
            id: 4,
            type: 'credit',
            description: 'Reembolso Missão Cancelada',
            amount: 30.00,
            date: '2024-01-13',
            status: 'completed',
            partner: 'Sistema'
        }];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/client-dashboard'), className: "hover:bg-slate-100", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Gest\u00E3o Financeira" })] }) }), _jsxs("div", { className: "p-4 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsx(Card, { className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-100", children: "Saldo Dispon\u00EDvel" }), _jsx("h2", { className: "text-3xl font-light", children: "R$ 850,00" }), _jsx("p", { className: "text-blue-100", children: "Para novas miss\u00F5es" })] }), _jsx(Wallet, { className: "h-10 w-10 text-blue-200" })] }) }) }), _jsx(Card, { className: "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-100", children: "Em Garantia (Escrow)" }), _jsx("h2", { className: "text-3xl font-light", children: "R$ 120,00" }), _jsx("p", { className: "text-blue-100", children: "Aguardando aprova\u00E7\u00E3o" })] }), _jsx(Shield, { className: "h-10 w-10 text-blue-200" })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(Button, { className: "h-14 bg-blue-500 hover:bg-blue-600 shadow-sm", children: [_jsx(Plus, { className: "h-5 w-5 mr-2" }), "Adicionar Fundos"] }), _jsxs(Button, { variant: "outline", className: "h-14 border-slate-200 hover:bg-slate-50", children: [_jsx(Minus, { className: "h-5 w-5 mr-2" }), "Retirar Fundos"] })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-medium text-slate-700 flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-blue-500" }), "Resumo do M\u00EAs"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("p", { className: "text-2xl font-light text-slate-700", children: "R$ 450,00" }), _jsx("p", { className: "text-sm text-slate-500", children: "Total Gasto" })] }), _jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("p", { className: "text-2xl font-light text-slate-700", children: "18" }), _jsx("p", { className: "text-sm text-slate-500", children: "Transa\u00E7\u00F5es" })] })] }) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between font-medium text-slate-700", children: ["Extrato Detalhado", _jsx(Badge, { variant: "secondary", className: "bg-blue-50 text-blue-600 border-blue-200", children: transactions.length })] }) }), _jsx(CardContent, { className: "space-y-3", children: transactions.map(transaction => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-full ${transaction.type === 'credit' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-500'}`, children: transaction.type === 'credit' ?
                                                        _jsx(ArrowDownLeft, { className: "h-4 w-4" }) :
                                                        _jsx(ArrowUpRight, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-700", children: transaction.description }), _jsx("p", { className: "text-sm text-slate-500", children: transaction.partner }), _jsx("p", { className: "text-xs text-slate-400", children: transaction.date })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: `font-medium ${transaction.type === 'credit' ? 'text-blue-600' : 'text-slate-600'}`, children: [transaction.type === 'credit' ? '+' : '', "R$ ", Math.abs(transaction.amount).toFixed(2)] }), _jsx(Badge, { variant: transaction.status === 'completed' ? 'default' : 'secondary', className: transaction.status === 'completed' ? 'bg-blue-500' : 'bg-slate-200 text-slate-600', children: transaction.status === 'completed' ? 'Pago' : 'Pendente' })] })] }, transaction.id))) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-medium text-slate-700", children: "M\u00E9todos de Pagamento" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded flex items-center justify-center", children: _jsx("span", { className: "text-white text-xs font-bold", children: "PIX" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-700", children: "PIX" }), _jsx("p", { className: "text-sm text-slate-500", children: "Instant\u00E2neo" })] })] }), _jsx(Badge, { className: "bg-blue-50 text-blue-600 border-blue-200", children: "Principal" })] }), _jsx("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-slate-300 rounded flex items-center justify-center", children: _jsx(CreditCard, { className: "h-4 w-4 text-white" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-700", children: "Cart\u00E3o \u2022\u2022\u2022\u2022 1234" }), _jsx("p", { className: "text-sm text-slate-500", children: "Visa" })] })] }) })] })] })] })] }));
};
export default ClientFinance;
