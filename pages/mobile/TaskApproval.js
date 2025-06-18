import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Camera, Star, CheckCircle } from "lucide-react";
const TaskApproval = () => {
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const pendingTasks = [
        {
            id: 1,
            title: "Entrega de Documentos",
            partner: "João Silva",
            completedAt: "2024-01-15 14:30",
            value: 25.00,
            photos: ["photo1.jpg", "photo2.jpg"],
            description: "Documentos entregues conforme solicitado. Recepcionista Ana confirmou o recebimento.",
            status: "pending"
        },
        {
            id: 2,
            title: "Corrida para Aeroporto",
            partner: "Maria Santos",
            completedAt: "2024-01-15 16:45",
            value: 45.00,
            photos: ["photo3.jpg"],
            description: "Cliente transportado com segurança. Chegou no horário previsto.",
            status: "pending"
        }
    ];
    const handleApprove = (taskId) => {
        console.log(`Approved task ${taskId} with rating ${rating} and feedback: ${feedback}`);
        // Simulate approval process
        navigate('/mobile/client-dashboard');
    };
    const handleReject = (taskId) => {
        console.log(`Rejected task ${taskId} with feedback: ${feedback}`);
        // Simulate rejection process
        navigate('/mobile/client-dashboard');
    };
    const StarRating = ({ rating, onRatingChange }) => {
        return (_jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { onClick: () => onRatingChange(star), className: `p-1 ${star <= rating ? 'text-blue-400' : 'text-slate-300'}`, children: _jsx(Star, { className: `h-6 w-6 ${star <= rating ? 'fill-current' : ''}` }) }, star))) }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/client-dashboard'), className: "hover:bg-slate-100", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Aprova\u00E7\u00E3o de Tarefas" })] }) }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsx(Card, { className: "border-blue-200 bg-blue-50/50 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-medium text-blue-700", children: "Tarefas Pendentes" }), _jsxs("p", { className: "text-sm text-blue-600", children: [pendingTasks.length, " aguardando sua aprova\u00E7\u00E3o"] })] }), _jsx(Clock, { className: "h-8 w-8 text-blue-500" })] }) }) }), _jsx("div", { className: "space-y-4", children: pendingTasks.map((task) => (_jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-medium text-slate-700", children: task.title }), _jsxs("p", { className: "text-sm text-slate-500", children: ["por ", task.partner] }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Conclu\u00EDdo em ", task.completedAt] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-lg font-light text-blue-600", children: ["R$ ", task.value.toFixed(2)] }), _jsx(Badge, { className: "bg-blue-50 text-blue-600 border-blue-200", children: "Pendente" })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-slate-600", children: task.description }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-700 mb-2", children: "Evid\u00EAncias Fotogr\u00E1ficas:" }), _jsx("div", { className: "flex gap-2", children: task.photos.map((photo, index) => (_jsx("div", { className: "w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200", children: _jsx(Camera, { className: "h-6 w-6 text-slate-400" }) }, index))) })] }), selectedTask === task.id ? (_jsxs("div", { className: "space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-700 mb-2", children: "Avalia\u00E7\u00E3o:" }), _jsx(StarRating, { rating: rating, onRatingChange: setRating })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-700 mb-2", children: "Feedback (opcional):" }), _jsx(Textarea, { placeholder: "Deixe um coment\u00E1rio sobre o trabalho realizado...", value: feedback, onChange: (e) => setFeedback(e.target.value), className: "border-slate-200 focus:border-blue-300", rows: 3 })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { onClick: () => handleReject(task.id), variant: "outline", className: "flex-1 border-red-200 text-red-600 hover:bg-red-50", children: "Rejeitar" }), _jsx(Button, { onClick: () => handleApprove(task.id), className: "flex-1 bg-blue-500 hover:bg-blue-600", disabled: rating === 0, children: "Aprovar" })] })] })) : (_jsx(Button, { onClick: () => {
                                                setSelectedTask(task.id);
                                                setRating(0);
                                                setFeedback('');
                                            }, className: "w-full bg-blue-500 hover:bg-blue-600", children: "Revisar e Avaliar" }))] })] }, task.id))) }), pendingTasks.length === 0 && (_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(CheckCircle, { className: "h-16 w-16 text-slate-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-slate-700 mb-2", children: "Tudo em Dia!" }), _jsx("p", { className: "text-slate-500", children: "N\u00E3o h\u00E1 tarefas pendentes de aprova\u00E7\u00E3o no momento." })] }) }))] })] }));
};
export default TaskApproval;
