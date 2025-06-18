var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, userProfile, signOut } = useAuth();
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); // Fecha o menu mobile após clicar
        }
    };
    const handleInvestClick = () => {
        const investEvent = new CustomEvent('openInvestmentForm');
        window.dispatchEvent(investEvent);
        setIsMenuOpen(false);
    };
    const handleLoginClick = () => {
        navigate('/auth');
        setIsMenuOpen(false);
    };
    const handleLogoutClick = () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut();
        setIsMenuOpen(false);
    });
    const handleDashboardClick = () => {
        if (!userProfile)
            return;
        const role = userProfile.role || 'investor';
        switch (role) {
            case 'admin':
                navigate('/admin/dashboard');
                break;
            case 'partner':
                navigate('/partner/dashboard');
                break;
            case 'investor':
            default:
                navigate('/calculadora');
                break;
        }
        setIsMenuOpen(false);
    };
    return (_jsx("header", { className: "bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx("div", { className: "flex items-center", children: _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }) }), _jsxs("nav", { className: "hidden md:flex items-center space-x-8", children: [_jsx("button", { onClick: () => scrollToSection('sobre'), className: "text-slate-700 hover:text-blue-600 transition-colors", children: "Sobre" }), _jsx("button", { onClick: () => scrollToSection('oportunidade'), className: "text-slate-700 hover:text-blue-600 transition-colors", children: "Oportunidade" }), _jsx("button", { onClick: () => scrollToSection('parceiros'), className: "text-slate-700 hover:text-blue-600 transition-colors", children: "Seja um Parceiro" }), !user ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: handleLoginClick, children: [_jsx(LogIn, { className: "mr-2 w-4 h-4" }), "Entrar"] }), _jsx(Button, { className: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white", onClick: handleInvestClick, children: "Investir Agora" })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: handleDashboardClick, children: [_jsx(LayoutDashboard, { className: "mr-2 w-4 h-4" }), "Meu Dashboard"] }), _jsx(Button, { variant: "outline", onClick: handleLogoutClick, children: "Sair" })] }))] }), _jsx("button", { className: "md:hidden", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), isMenuOpen && (_jsx("div", { className: "md:hidden py-4 border-t border-slate-200", children: _jsxs("nav", { className: "flex flex-col space-y-4", children: [_jsx("button", { onClick: () => scrollToSection('sobre'), className: "text-slate-700 hover:text-blue-600 transition-colors text-left", children: "Sobre" }), _jsx("button", { onClick: () => scrollToSection('oportunidade'), className: "text-slate-700 hover:text-blue-600 transition-colors text-left", children: "Oportunidade" }), _jsx("button", { onClick: () => scrollToSection('parceiros'), className: "text-slate-700 hover:text-blue-600 transition-colors text-left", children: "Seja um Parceiro" }), !user ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: handleLoginClick, className: "w-full justify-start", children: [_jsx(LogIn, { className: "mr-2 w-4 h-4" }), "Entrar"] }), _jsx(Button, { className: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full", onClick: handleInvestClick, children: "Investir Agora" })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: handleDashboardClick, className: "w-full justify-start", children: [_jsx(LayoutDashboard, { className: "mr-2 w-4 h-4" }), "Meu Dashboard"] }), _jsx(Button, { variant: "outline", onClick: handleLogoutClick, className: "w-full justify-start", children: "Sair" })] }))] }) }))] }) }));
};
