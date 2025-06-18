import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Gift, Star, Zap, Crown, Award, Target } from "lucide-react";
const RewardsClub = () => {
    const navigate = useNavigate();
    const [currentLevel] = useState('bronze');
    const [currentPoints] = useState(850);
    const [nextLevelPoints] = useState(1000);
    const progressPercentage = (currentPoints / nextLevelPoints) * 100;
    const levels = [
        { name: 'Bronze', icon: Award, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
        { name: 'Prata', icon: Trophy, color: 'text-slate-500', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
        { name: 'Ouro', icon: Crown, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
        { name: 'Diamante', icon: Star, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
    ];
    const currentBenefits = [
        { name: 'Taxa reduzida', description: '3% por transação' },
        { name: 'Suporte prioritário', description: 'Atendimento em até 2h' },
        { name: 'Missões exclusivas', description: '2x por semana' }
    ];
    const nextBenefits = [
        { name: 'Taxa ainda menor', description: '2% por transação' },
        { name: 'Suporte VIP', description: 'Atendimento em até 30min' },
        { name: 'Mais missões exclusivas', description: '4x por semana' },
        { name: 'Bônus de pontuação', description: '+20% em todas as missões' }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/mobile/wallet'), className: "hover:bg-slate-100", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600" }) }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Clube de Vantagens" })] }) }), _jsxs("div", { className: "p-4 space-y-6", children: [_jsx(Card, { className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Award, { className: "h-12 w-12 text-blue-200" }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-light", children: "N\u00EDvel Bronze" }), _jsx("p", { className: "text-blue-100", children: "Membro desde Janeiro 2024" })] })] }), _jsx(Badge, { className: "bg-white text-blue-600 px-3 py-1", children: "Ativo" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-blue-100", children: "Progresso para Prata" }), _jsxs("span", { className: "text-white font-medium", children: [currentPoints, "/", nextLevelPoints, " pontos"] })] }), _jsx(Progress, { value: progressPercentage, className: "h-2 bg-blue-400", children: _jsx("div", { className: "h-full bg-white rounded-full transition-all duration-500", style: { width: `${progressPercentage}%` } }) }), _jsxs("p", { className: "text-blue-100 text-sm", children: ["Faltam apenas ", nextLevelPoints - currentPoints, " pontos para o pr\u00F3ximo n\u00EDvel!"] })] })] }) }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-medium text-slate-700", children: "N\u00EDveis Dispon\u00EDveis" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: levels.map((level, index) => {
                                        const IconComponent = level.icon;
                                        const isCurrentLevel = level.name.toLowerCase() === currentLevel;
                                        return (_jsxs("div", { className: `p-3 rounded-lg border-2 text-center transition-all ${isCurrentLevel
                                                ? `${level.bgColor} ${level.borderColor} border-2`
                                                : 'bg-slate-50 border-slate-200'}`, children: [_jsx(IconComponent, { className: `h-8 w-8 mx-auto mb-2 ${isCurrentLevel ? level.color : 'text-slate-400'}` }), _jsx("p", { className: `font-medium ${isCurrentLevel ? 'text-slate-700' : 'text-slate-500'}`, children: level.name }), isCurrentLevel && (_jsx(Badge, { className: "mt-1 bg-blue-500 text-white text-xs", children: "Atual" }))] }, level.name));
                                    }) }) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx(Gift, { className: "h-5 w-5 text-blue-500" }), "Seus Benef\u00EDcios Atuais"] }) }), _jsx(CardContent, { className: "space-y-3", children: currentBenefits.map((benefit, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-700", children: benefit.name }), _jsx("p", { className: "text-sm text-slate-500", children: benefit.description })] })] }, index))) })] }), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-medium text-slate-700", children: [_jsx(Target, { className: "h-5 w-5 text-blue-500" }), "Desbloqueie no Pr\u00F3ximo N\u00EDvel"] }) }), _jsx(CardContent, { className: "space-y-3", children: nextBenefits.map((benefit, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200", children: [_jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-600", children: benefit.name }), _jsx("p", { className: "text-sm text-slate-500", children: benefit.description })] })] }, index))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { onClick: () => navigate('/mobile/feed-opportunities'), className: "w-full h-12 bg-blue-500 hover:bg-blue-600 shadow-sm", children: [_jsx(Zap, { className: "h-5 w-5 mr-2" }), "Ganhar Mais Pontos"] }), _jsx(Button, { variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: "Ver Hist\u00F3rico de Pontos" })] })] })] }));
};
export default RewardsClub;
