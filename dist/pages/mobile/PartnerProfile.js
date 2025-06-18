import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, Clock, Upload, Star } from "lucide-react";
const PartnerProfile = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState({
        delivery: true,
        transport: false,
        maintenance: true,
        cleaning: false,
        security: false
    });
    const documents = [
        { name: 'CNH', status: 'verified', message: 'Documento verificado' },
        { name: 'CPF', status: 'pending', message: 'Foto da CNH está ilegível...' },
        { name: 'Comprovante de Residência', status: 'inactive', message: 'Documento não enviado' }
    ];
    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified': return _jsx(CheckCircle, { className: "w-4 h-4 text-green-500" });
            case 'pending': return _jsx(AlertTriangle, { className: "w-4 h-4 text-yellow-500" });
            default: return _jsx(Clock, { className: "w-4 h-4 text-slate-400" });
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'verified': return 'Ativo';
            case 'pending': return 'Verificação Pendente';
            default: return 'Inativo';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'verified': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'pending': return 'bg-blue-50 text-blue-600 border-blue-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/login'), className: "hover:bg-slate-100", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Perfil e Servi\u00E7os" })] }) }), _jsxs("div", { className: "p-4 space-y-6", children: [_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white text-xl font-semibold", children: "JP" }) }), _jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-4 h-4 text-white" }) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-800", children: "Jo\u00E3o Pedro Silva" }), _jsx("p", { className: "text-slate-600", children: "Parceiro desde Mar\u00E7o 2024" }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx("div", { className: "flex text-yellow-400", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: "w-4 h-4 fill-current" }, i))) }), _jsx("span", { className: "ml-2 text-sm text-slate-600", children: "4.8 (127 avalia\u00E7\u00F5es)" })] })] })] }) }) }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold text-slate-800", children: "Servi\u00E7os Oferecidos" }) }), _jsx(CardContent, { className: "space-y-4", children: Object.entries(services).map(([service, enabled]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-slate-700 capitalize", children: service }), _jsx(Switch, { checked: enabled, onCheckedChange: (checked) => setServices(prev => (Object.assign(Object.assign({}, prev), { [service]: checked }))) })] }, service))) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold text-slate-800", children: "Documenta\u00E7\u00E3o" }) }), _jsx(CardContent, { className: "space-y-4", children: documents.map((doc, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 border border-slate-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getStatusIcon(doc.status), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800", children: doc.name }), _jsx("p", { className: "text-sm text-slate-600", children: doc.message })] })] }), _jsx(Badge, { className: getStatusColor(doc.status), children: getStatusText(doc.status) })] }, index))) })] }), _jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs(Button, { className: "w-full bg-blue-500 hover:bg-blue-600 text-white", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Enviar Documento"] }) }) })] })] }));
};
export default PartnerProfile;
