var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const MobileLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const { error } = yield signIn(email, password);
            if (!error) {
                navigate('/mobile/partner-dashboard');
            }
        }
        catch (error) {
            console.error('Login error:', error);
        }
        setLoading(false);
    });
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4", children: _jsxs("div", { className: "max-w-sm mx-auto pt-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Logo", className: "h-20 mx-auto mb-4" }), _jsx("h1", { className: "text-2xl font-light text-slate-700", children: "Bem-vindo" }), _jsx("p", { className: "text-slate-500", children: "Fa\u00E7a login para continuar" })] }), _jsxs(Card, { className: "shadow-sm border-slate-200 bg-white/90 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsx("h2", { className: "text-xl font-light text-center text-slate-700", children: "Entrar" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "relative", children: _jsx(Input, { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "h-12 border-slate-200 focus:border-blue-300 focus:ring-blue-200" }) }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Senha", value: password, onChange: (e) => setPassword(e.target.value), className: "h-12 border-slate-200 focus:border-blue-300 focus:ring-blue-200" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-slate-400 hover:text-slate-600", children: showPassword ? 'Ocultar' : 'Mostrar' })] }), _jsx("div", { className: "text-center", children: _jsx("button", { className: "text-blue-500 text-sm hover:text-blue-600 transition-colors", children: "Esqueceu sua senha?" }) }), _jsx(Button, { onClick: handleLogin, disabled: loading, className: "w-full h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-sm", children: loading ? 'Entrando...' : 'Entrar' }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-center text-slate-500 text-sm", children: "ou continue com" }), _jsxs(Button, { variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: [_jsx("img", { src: "https://developers.google.com/identity/images/g-logo.png", alt: "Google", className: "w-5 h-5 mr-2" }), "Google"] }), _jsxs(Button, { variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: [_jsx("div", { className: "w-5 h-5 mr-2 bg-black rounded-sm flex items-center justify-center", children: _jsx("span", { className: "text-white text-xs", children: "\uD83D\uDDB1\uFE0F" }) }), "Apple"] })] }), _jsxs("div", { className: "space-y-3 pt-4 border-t border-slate-100", children: [_jsx(Button, { onClick: () => navigate('/mobile/partner-profile'), className: "w-full h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-sm", children: "Quero oferecer meus servi\u00E7os" }), _jsx(Button, { onClick: () => navigate('/mobile/client-dashboard'), variant: "outline", className: "w-full h-12 border-slate-200 hover:bg-slate-50", children: "Quero Contratar" })] })] })] })] }) }));
};
export default MobileLogin;
