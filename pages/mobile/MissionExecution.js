import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
const MissionExecution = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [checklist, setChecklist] = useState({
        arrived: false,
        documented: false,
        collected: false,
        delivered: false,
        confirmed: false
    });
    const [photos, setPhotos] = useState([]);
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const checklistItems = [
        { key: 'arrived', label: 'Cheguei no local de coleta', required: true },
        { key: 'documented', label: 'Fotografei os documentos', required: true },
        { key: 'collected', label: 'Coletei os documentos', required: true },
        { key: 'delivered', label: 'Entreguei no destino', required: true },
        { key: 'confirmed', label: 'Confirmei a entrega', required: true }
    ];
    const handleChecklistChange = (key, checked) => {
        setChecklist(prev => (Object.assign(Object.assign({}, prev), { [key]: checked })));
    };
    const handleFinish = () => {
        const allCompleted = Object.values(checklist).every(Boolean);
        if (allCompleted) {
            navigate('/mobile/partner-dashboard');
            // Show success message
        }
    };
    const isAllCompleted = Object.values(checklist).every(Boolean);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/feed-opportunities'), className: "hover:bg-slate-100", children: _jsx("span", { children: "\u2190" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-light text-slate-700", children: "Executando Miss\u00E3o" }), _jsx("p", { className: "text-sm text-slate-500", children: "Entrega de Documentos" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", className: "border-slate-200 hover:bg-slate-50", children: _jsx("span", { children: "\uD83D\uDCDE" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setShowChat(!showChat), className: "border-slate-200 hover:bg-slate-50", children: _jsx("span", { children: "\uD83D\uDCAC" }) })] })] }) }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-slate-700", children: "Progresso" }), _jsxs("span", { className: "text-sm text-slate-500", children: [Object.values(checklist).filter(Boolean).length, "/", checklistItems.length] })] }), _jsx("div", { className: "w-full bg-slate-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full transition-all duration-300", style: {
                                            width: `${(Object.values(checklist).filter(Boolean).length / checklistItems.length) * 100}%`
                                        } }) })] }) }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-medium text-slate-700", children: "Checklist da Miss\u00E3o" }) }), _jsx(CardContent, { className: "space-y-4", children: checklistItems.map((item, index) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100", children: [_jsx(Checkbox, { id: item.key, checked: checklist[item.key], onCheckedChange: (checked) => handleChecklistChange(item.key, checked) }), _jsxs("label", { htmlFor: item.key, className: "text-sm font-medium flex-1 cursor-pointer text-slate-700", children: [item.label, item.required && _jsx("span", { className: "text-blue-500 ml-1", children: "*" })] }), checklist[item.key] && (_jsx("span", { className: "text-blue-500", children: "\u2705" }))] }, item.key))) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx("span", { className: "text-blue-500", children: "\uD83D\uDCF7" }), "Evid\u00EAncias Fotogr\u00E1ficas"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs(Button, { variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCF7" }), "Tirar Foto dos Documentos"] }), _jsxs(Button, { variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCF7" }), "Foto da Entrega"] }), photos.length > 0 && (_jsx("div", { className: "grid grid-cols-2 gap-2", children: photos.map((photo, index) => (_jsx("div", { className: "aspect-square bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200", children: _jsx("span", { className: "text-slate-400 text-2xl", children: "\uD83D\uDCF7" }) }, index))) }))] })] }), showChat && (_jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx("span", { className: "text-blue-500", children: "\uD83D\uDCAC" }), "Canal de Comunica\u00E7\u00E3o"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "h-32 bg-slate-50 rounded-lg p-3 overflow-y-auto border border-slate-200", children: _jsx("div", { className: "text-sm text-slate-500 text-center", children: "Inicie uma conversa com o cliente" }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Textarea, { placeholder: "Digite sua mensagem...", value: message, onChange: (e) => setMessage(e.target.value), className: "flex-1 border-slate-200 focus:border-blue-300", rows: 2 }), _jsx(Button, { size: "icon", className: "bg-blue-500 hover:bg-blue-600", children: _jsx("span", { children: "\uD83D\uDCE4" }) })] })] })] })), _jsxs(Button, { onClick: handleFinish, disabled: !isAllCompleted, className: `w-full h-14 text-lg shadow-sm ${isAllCompleted
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-slate-300 cursor-not-allowed'}`, children: [_jsx("span", { className: "mr-2", children: "\u2705" }), "Finalizar e Enviar para Aprova\u00E7\u00E3o"] }), !isAllCompleted && (_jsx("p", { className: "text-center text-sm text-slate-500", children: "Complete todos os itens do checklist para finalizar" }))] })] }));
};
export default MissionExecution;
