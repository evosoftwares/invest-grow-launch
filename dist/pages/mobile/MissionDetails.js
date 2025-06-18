import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
const MissionDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const mission = {
        id: 1,
        title: "Entrega de Documentos",
        description: "Preciso de alguém para buscar documentos no cartório e entregar no escritório de advocacia. É urgente e precisa ser feito hoje antes das 17h.",
        client: "João Silva",
        rating: 4.9,
        value: 25.00,
        distance: "2.5 km",
        estimatedTime: "30 min",
        address: "Rua das Flores, 123 - Centro",
        contact: {
            name: "Recepcionista Ana",
            phone: "(11) 99999-9999"
        },
        equipment: [
            "Veículo próprio",
            "Celular para fotos",
            "Documento de identificação"
        ],
        requirements: [
            "Ser pontual",
            "Cuidado com os documentos",
            "Confirmar entrega por foto"
        ]
    };
    const handleAcceptMission = () => {
        setShowConfirmation(true);
    };
    const confirmAcceptance = () => {
        setShowConfirmation(false);
        navigate('/mobile/mission-execution/1');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/feed-opportunities'), className: "hover:bg-slate-100", children: _jsx("span", { children: "\u2190" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Detalhes da Miss\u00E3o" })] }) }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { children: [_jsxs(Badge, { className: "bg-blue-50 text-blue-700 border-blue-200 mb-2", children: [_jsx("span", { className: "mr-1", children: "\uD83D\uDCE6" }), "Entrega"] }), _jsx("h2", { className: "text-xl font-medium text-slate-700", children: mission.title })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-light text-blue-600", children: ["R$ ", mission.value.toFixed(2)] }), _jsxs("div", { className: "flex items-center gap-1 justify-end", children: [_jsx("span", { children: "\u23F0" }), _jsx("span", { className: "text-sm text-slate-500", children: mission.estimatedTime })] })] })] }), _jsx("p", { className: "text-slate-600 mb-4", children: mission.description }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { children: "\uD83D\uDC64" }), _jsx("span", { className: "font-medium text-slate-700", children: mission.client }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-blue-400", children: "\u2B50" }), _jsx("span", { className: "text-sm text-slate-500", children: mission.rating })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCCD" }), _jsx("span", { className: "text-slate-600", children: mission.address })] })] }) }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx("span", { className: "text-blue-500", children: "\uD83D\uDCE6" }), "Equipamento Necess\u00E1rio"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: mission.equipment.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-blue-500", children: "\u2705" }), _jsx("span", { className: "text-sm text-slate-600", children: item })] }, index))) }) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx("span", { className: "text-blue-500", children: "\uD83D\uDCDE" }), "Contato no Local"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDC64" }), _jsx("span", { className: "text-slate-600", children: mission.contact.name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCDE" }), _jsx("span", { className: "text-slate-600", children: mission.contact.phone })] })] }) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx("span", { className: "text-blue-500", children: "\u26A0\uFE0F" }), "Requisitos Importantes"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: mission.requirements.map((req, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-blue-400", children: "\u26A0\uFE0F" }), _jsx("span", { className: "text-sm text-slate-600", children: req })] }, index))) }) })] }), _jsxs(Button, { onClick: handleAcceptMission, className: "w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 shadow-sm", children: [_jsx("span", { className: "mr-2", children: "\u2705" }), "ACEITAR MISS\u00C3O"] })] }), showConfirmation && (_jsx("div", { className: "fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-sm border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center font-medium text-slate-700", children: "Confirmar Aceita\u00E7\u00E3o" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("p", { className: "text-center text-slate-600", children: ["Voc\u00EA est\u00E1 prestes a aceitar a miss\u00E3o \"", mission.title, "\". Ao confirmar, voc\u00EA se compromete a execut\u00E1-la conforme descrito."] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "outline", className: "flex-1 border-slate-200 hover:bg-slate-50", onClick: () => setShowConfirmation(false), children: "Cancelar" }), _jsx(Button, { className: "flex-1 bg-blue-500 hover:bg-blue-600", onClick: confirmAcceptance, children: "Confirmar" })] })] })] }) }))] }));
};
export default MissionDetails;
