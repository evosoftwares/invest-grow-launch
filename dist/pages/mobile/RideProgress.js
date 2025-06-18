import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Phone, Search, CheckCircle2, Car, Route, Flag, User, Star, MapPin, Map, MessageSquare, CircleDot, LocateFixed, X } from 'lucide-react';
const RideProgress = () => {
    const navigate = useNavigate();
    const [rideStatus, setRideStatus] = useState('searching'); // searching, found, arriving, in-progress, completed
    const [estimatedTime, setEstimatedTime] = useState(5);
    const driver = {
        name: "Carlos Silva",
        rating: 4.9,
        car: "Honda Civic Prata",
        plate: "ABC-1234",
        phone: "(11) 99999-9999"
    };
    const rideInfo = {
        pickup: "Rua das Flores, 123 - Centro",
        destination: "Aeroporto Internacional",
        price: "R$ 18,90",
        distance: "12 km",
        type: "Conforto"
    };
    // Simulação da progressão do status da corrida
    useEffect(() => {
        const statusProgression = ['searching', 'found', 'arriving', 'in-progress', 'completed'];
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex++;
            if (currentIndex < statusProgression.length) {
                setRideStatus(statusProgression[currentIndex]);
                if (statusProgression[currentIndex] === 'arriving') {
                    setEstimatedTime(2);
                }
            }
            else {
                clearInterval(interval);
            }
        }, 4000); // Aumentado para 4s para melhor visualização
        return () => clearInterval(interval);
    }, []);
    const getStatusInfo = () => {
        switch (rideStatus) {
            case 'searching':
                return { message: 'Procurando motorista...', Icon: Search, color: 'bg-blue-500' };
            case 'found':
                return { message: 'Motorista encontrado!', Icon: CheckCircle2, color: 'bg-green-500' };
            case 'arriving':
                return { message: 'Motorista a caminho', Icon: Car, color: 'bg-blue-500' };
            case 'in-progress':
                return { message: 'Corrida em andamento', Icon: Route, color: 'bg-blue-600' };
            case 'completed':
                return { message: 'Corrida finalizada', Icon: Flag, color: 'bg-green-600' };
            default:
                return { message: 'Processando...', Icon: Search, color: 'bg-slate-500' };
        }
    };
    const { message: statusMessage, Icon: StatusIcon, color: statusColor } = getStatusInfo();
    const handleCompleteRide = () => {
        navigate('/mobile/client-dashboard');
    };
    const handleCancelRide = () => {
        navigate('/mobile/client-dashboard');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("div", { className: "bg-white/90 backdrop-blur-sm shadow-sm p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-6" }), _jsx("h1", { className: "text-xl font-light text-slate-700", children: "Andamento da Corrida" })] }), rideStatus !== 'completed' && rideStatus !== 'searching' && (_jsx(Button, { variant: "outline", size: "icon", className: "border-slate-200 hover:bg-slate-50", children: _jsx(Phone, { className: "h-5 w-5 text-slate-600" }) }))] }) }), _jsxs("div", { className: "p-4 space-y-4 pb-6", children: [_jsx(Card, { className: `${statusColor} text-white shadow-lg`, children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "mb-4 flex justify-center", children: _jsx(StatusIcon, { className: "h-10 w-10", strokeWidth: 1.5 }) }), _jsx("h2", { className: "text-2xl font-light mb-2", children: statusMessage }), (rideStatus === 'searching' || rideStatus === 'arriving') && (_jsxs("p", { className: "opacity-90", children: ["Tempo estimado: ", estimatedTime, " min"] }))] }) }), rideStatus !== 'searching' && (_jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-medium text-slate-700 flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5 text-blue-500" }), "Seu Motorista"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-blue-600 text-lg font-medium", children: driver.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-slate-800", children: driver.name }), _jsxs("div", { className: "flex items-center gap-1 text-slate-500", children: [_jsx(Star, { className: "h-4 w-4 text-amber-400 fill-amber-400" }), _jsx("span", { className: "text-sm font-medium", children: driver.rating })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-semibold text-slate-700", children: driver.car }), _jsx("p", { className: "text-sm text-slate-500", children: driver.plate })] })] }) })] })), _jsxs(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-medium text-slate-700 flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-blue-500" }), "Detalhes da Corrida"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CircleDot, { className: "h-5 w-5 text-blue-500 flex-shrink-0 mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-500", children: "Partida" }), _jsx("p", { className: "font-medium text-slate-700", children: rideInfo.pickup })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(LocateFixed, { className: "h-5 w-5 text-green-500 flex-shrink-0 mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-500", children: "Destino" }), _jsx("p", { className: "font-medium text-slate-700", children: rideInfo.destination })] })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-slate-200", children: [_jsx(Badge, { variant: "outline", className: "border-blue-300 bg-blue-50 text-blue-700", children: rideInfo.type }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-lg font-medium text-blue-600", children: rideInfo.price }), _jsx("p", { className: "text-sm text-slate-500", children: rideInfo.distance })] })] })] })] }), (rideStatus === 'arriving' || rideStatus === 'in-progress') && (_jsx(Card, { className: "border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm", children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "h-32 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200", children: _jsxs("div", { className: "text-center text-slate-500", children: [_jsx(Map, { className: "h-8 w-8 mx-auto" }), _jsx("p", { className: "text-sm mt-2", children: "Mapa em tempo real (simulado)" })] }) }) }) })), _jsx("div", { className: "space-y-3", children: rideStatus === 'completed' ? (_jsxs(Button, { onClick: handleCompleteRide, className: "w-full h-14 bg-amber-500 hover:bg-amber-600 text-lg font-semibold text-white shadow-sm flex items-center gap-2", children: [_jsx(Star, { className: "h-6 w-6" }), "Avaliar Corrida"] })) : rideStatus === 'searching' ? (_jsxs(Button, { onClick: handleCancelRide, variant: "outline", className: "w-full h-14 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 text-base font-semibold shadow-sm flex items-center gap-2", children: [_jsx(X, { className: "h-5 w-5" }), "Cancelar Solicita\u00E7\u00E3o"] })) : (_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { variant: "outline", className: "h-12 border-slate-200 hover:bg-slate-50 flex items-center gap-2", children: [_jsx(MessageSquare, { className: "h-5 w-5" }), "Chat"] }), _jsxs(Button, { variant: "outline", className: "h-12 border-slate-200 hover:bg-slate-50 flex items-center gap-2", children: [_jsx(Phone, { className: "h-5 w-5" }), "Ligar"] })] })) })] })] }));
};
export default RideProgress;
