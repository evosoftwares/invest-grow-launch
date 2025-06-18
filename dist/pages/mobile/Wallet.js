import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp, Clock, ArrowUpRight, ArrowDownLeft, Gift, Star } from "lucide-react";
const Wallet = () => {
    const navigate = useNavigate();
    const transactions = [
        {
            id: 1,
            type: 'credit',
            description: 'Entrega de Documentos',
            amount: 25.00,
            date: '2024-01-15',
            status: 'completed',
            client: 'João Silva'
        },
        {
            id: 2,
            type: 'credit',
            description: 'Corrida para Aeroporto',
            amount: 45.00,
            date: '2024-01-15',
            status: 'pending',
            client: 'Maria Santos'
        },
        {
            id: 3,
            type: 'debit',
            description: 'Transferência PIX',
            amount: -50.00,
            date: '2024-01-14',
            status: 'completed',
            client: 'Você'
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/partner-dashboard'), className: "hover:bg-slate-100", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600" }) }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Carteira Digital" })] }) }), _jsxs("div", { className: "p-4 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsx(Card, { className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-100", children: "Saldo Dispon\u00EDvel" }), _jsx("h2", { className: "text-3xl font-light", children: "R$ 1.247,50" }), _jsx("p", { className: "text-blue-100", children: "Pronto para saque" })] }), _jsx(DollarSign, { className: "h-12 w-12 text-blue-200" })] }) }) }), _jsx(Card, { className: "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-100", children: "Saldo Pendente" }), _jsx("h2", { className: "text-3xl font-light", children: "R$ 180,00" }), _jsx("p", { className: "text-blue-100", children: "Em aprova\u00E7\u00E3o" })] }), _jsx(Clock, { className: "h-12 w-12 text-blue-200" })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(Button, { className: "h-14 bg-blue-500 hover:bg-blue-600 shadow-sm", children: [_jsx(ArrowUpRight, { className: "h-5 w-5 mr-2" }), "Transferir (PIX)"] }), _jsxs(Button, { variant: "outline", className: "h-14 border-slate-200 hover:bg-slate-50", children: [_jsx(TrendingUp, { className: "h-5 w-5 mr-2 text-slate-600" }), "Extrato"] })] }), _jsx(Card, { className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer shadow-sm", onClick: () => navigate('/mobile/rewards-club'), children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Gift, { className: "h-5 w-5" }), _jsx("h3", { className: "font-medium", children: "Clube de Vantagens" })] }), _jsx("p", { className: "text-blue-100", children: "N\u00EDvel Bronze - 85% para Prata" }), _jsx("p", { className: "text-sm text-blue-200", children: "Desbloqueie benef\u00EDcios exclusivos!" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Star, { className: "h-8 w-8 text-blue-200 mx-auto mb-1" }), _jsx(Badge, { className: "bg-white text-blue-600 text-xs", children: "Novo" })] })] }) }) }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between font-medium text-slate-700", children: ["Hist\u00F3rico de Transa\u00E7\u00F5es", _jsx(Badge, { variant: "secondary", className: "bg-blue-50 text-blue-600 border-blue-200", children: transactions.length })] }) }), _jsx(CardContent, { className: "space-y-3", children: transactions.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-full ${transaction.type === 'credit'
                                                        ? 'bg-blue-50 text-blue-500'
                                                        : 'bg-slate-100 text-slate-500'}`, children: transaction.type === 'credit' ?
                                                        _jsx(ArrowDownLeft, { className: "h-4 w-4" }) :
                                                        _jsx(ArrowUpRight, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-700", children: transaction.description }), _jsx("p", { className: "text-sm text-slate-500", children: transaction.client }), _jsx("p", { className: "text-xs text-slate-400", children: transaction.date })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: `font-medium ${transaction.type === 'credit' ? 'text-blue-600' : 'text-slate-600'}`, children: [transaction.type === 'credit' ? '+' : '', "R$ ", Math.abs(transaction.amount).toFixed(2)] }), _jsx(Badge, { variant: transaction.status === 'completed' ? 'default' : 'secondary', className: transaction.status === 'completed' ? 'bg-blue-500' : 'bg-slate-200 text-slate-600', children: transaction.status === 'completed' ? 'Pago' : 'Pendente' })] })] }, transaction.id))) })] })] })] }));
};
export default Wallet;
