import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, ExternalLink, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
const PartnerQuickActions = ({ partnerId }) => {
    const navigate = useNavigate();
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "A\u00E7\u00F5es R\u00E1pidas" }), _jsx(CardDescription, { children: "Gerencie seus investidores e acompanhe o desempenho" })] }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs(Button, { onClick: () => navigate('/partner/investors/new'), className: "w-full justify-start", variant: "default", children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Cadastrar Novo Investidor"] }), _jsxs(Button, { onClick: () => navigate('/partner/investors'), className: "w-full justify-start", variant: "outline", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "Ver Meus Investidores"] }), _jsxs(Button, { onClick: () => navigate('/partner/links'), className: "w-full justify-start", variant: "outline", disabled: !partnerId, children: [_jsx(ExternalLink, { className: "mr-2 h-4 w-4" }), "Gerenciar Links de Indica\u00E7\u00E3o"] }), _jsxs(Button, { onClick: () => navigate('/partner/commissions'), className: "w-full justify-start", variant: "outline", children: [_jsx(DollarSign, { className: "mr-2 h-4 w-4" }), "Ver Hist\u00F3rico de Comiss\u00F5es"] })] })] }));
};
export default PartnerQuickActions;
