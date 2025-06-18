import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
const FeedOpportunities = () => {
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);
    const missions = [
        {
            id: 1,
            title: "Entrega de Documentos",
            category: "delivery",
            client: "João Silva",
            rating: 4.9,
            value: 25.00,
            distance: "2.5 km",
            time: "30 min",
            address: "Rua das Flores, 123 - Centro",
            urgent: true,
            favorite: true
        },
        {
            id: 2,
            title: "Corrida para Aeroporto",
            category: "transport",
            client: "Maria Santos",
            rating: 4.7,
            value: 45.00,
            distance: "12 km",
            time: "25 min",
            address: "Av. Principal, 456 - Bairro Alto",
            urgent: false,
            favorite: false
        },
        {
            id: 3,
            title: "Conserto de Torneira",
            category: "maintenance",
            client: "Pedro Costa",
            rating: 4.8,
            value: 80.00,
            distance: "1.2 km",
            time: "1h 30min",
            address: "Rua do Comércio, 789 - Vila Nova",
            urgent: false,
            favorite: true
        }
    ];
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'delivery': return '📦';
            case 'transport': return '🚛';
            case 'maintenance': return '🔧';
            default: return '📦';
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'delivery': return 'bg-blue-100 text-blue-800';
            case 'transport': return 'bg-green-100 text-green-800';
            case 'maintenance': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/partner-dashboard'), className: "hover:bg-slate-100", children: _jsx("span", { children: "\u2190" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Oportunidades" })] }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setShowFilters(!showFilters), className: "border-slate-200 hover:bg-slate-50", children: _jsx("span", { children: "\uD83D\uDD0D" }) })] }) }), showFilters && (_jsxs("div", { className: "bg-white/90 backdrop-blur-sm border-b border-slate-200 p-4 space-y-4", children: [_jsx(Input, { placeholder: "Buscar por regi\u00E3o...", className: "border-slate-200 focus:border-blue-300" }), _jsxs("div", { className: "flex gap-2 flex-wrap", children: [_jsx(Badge, { className: "bg-blue-500 text-white", children: "Todas" }), _jsx(Badge, { variant: "outline", className: "border-slate-300 hover:bg-slate-50", children: "Entrega" }), _jsx(Badge, { variant: "outline", className: "border-slate-300 hover:bg-slate-50", children: "Transporte" }), _jsx(Badge, { variant: "outline", className: "border-slate-300 hover:bg-slate-50", children: "Manuten\u00E7\u00E3o" }), _jsx(Badge, { variant: "outline", className: "border-slate-300 hover:bg-slate-50", children: "Clientes Favoritos" })] })] })), _jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-3 text-center", children: [_jsx("p", { className: "text-lg font-light text-blue-500", children: missions.length }), _jsx("p", { className: "text-xs text-slate-500", children: "Dispon\u00EDveis" })] }) }), _jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-3 text-center", children: [_jsx("p", { className: "text-lg font-light text-blue-500", children: "2" }), _jsx("p", { className: "text-xs text-slate-500", children: "Urgentes" })] }) }), _jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-3 text-center", children: [_jsx("p", { className: "text-lg font-light text-blue-500", children: "2" }), _jsx("p", { className: "text-xs text-slate-500", children: "Favoritos" })] }) })] }), _jsx("div", { className: "space-y-3", children: missions.map((mission) => (_jsx(Card, { className: `cursor-pointer transition-all border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md ${mission.urgent ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''}`, onClick: () => navigate(`/mobile/mission-details/${mission.id}`), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: getCategoryColor(mission.category), children: getCategoryIcon(mission.category) }), mission.urgent && (_jsx(Badge, { className: "bg-blue-500 text-white", children: "Urgente" })), mission.favorite && (_jsx("span", { className: "text-blue-400", children: "\u2B50" }))] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-lg font-light text-blue-600", children: ["R$ ", mission.value.toFixed(2)] }) })] }), _jsx("h3", { className: "font-medium text-lg mb-2 text-slate-700", children: mission.title }), _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-sm font-medium text-slate-600", children: mission.client }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-blue-400", children: "\u2B50" }), _jsx("span", { className: "text-xs text-slate-500", children: mission.rating })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-500 mb-3", children: [_jsx("span", { children: "\uD83D\uDCCD" }), _jsx("span", { className: "text-sm flex-1", children: mission.address })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-slate-500", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCCD" }), _jsx("span", { children: mission.distance })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\u23F0" }), _jsx("span", { children: mission.time })] })] }), _jsx(Button, { size: "sm", className: "bg-blue-500 hover:bg-blue-600", children: "Ver Detalhes" })] })] }) }, mission.id))) }), _jsx(Button, { variant: "outline", className: "w-full border-slate-200 hover:bg-slate-50", children: "Carregar Mais Oportunidades" })] })] }));
};
export default FeedOpportunities;
