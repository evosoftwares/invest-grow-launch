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
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { LayoutDashboard, Users, UserCheck, DollarSign, BarChart3, LogOut, Home } from 'lucide-react';
export const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const { signOut, userProfile } = useAuth();
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Investidores', path: '/admin/investors' },
        { icon: UserCheck, label: 'Parceiros', path: '/admin/partners' },
        { icon: DollarSign, label: 'Financeiro', path: '/admin/financial' },
        { icon: BarChart3, label: 'Relatórios', path: '/admin/reports' },
    ];
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut();
        navigate('/auth');
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate('/'), className: "text-blue-600 hover:text-blue-700", children: [_jsx(Home, { className: "w-5 h-5 mr-2" }), "Voltar ao Site"] }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Painel Administrativo" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(NotificationBell, {}), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Ol\u00E1, ", (userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name) || 'Admin'] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleLogout, className: "text-gray-700 hover:text-gray-900", children: [_jsx(LogOut, { className: "w-4 h-4 mr-2" }), "Sair"] })] })] })] }) }), _jsxs("div", { className: "flex", children: [_jsx("aside", { className: "w-64 bg-white shadow-sm min-h-screen", children: _jsx("nav", { className: "p-4 space-y-2", children: menuItems.map((item) => {
                                const isActive = window.location.pathname === item.path;
                                return (_jsxs(Button, { variant: isActive ? "default" : "ghost", className: `w-full justify-start ${isActive
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`, onClick: () => navigate(item.path), children: [_jsx(item.icon, { className: "w-4 h-4 mr-3" }), item.label] }, item.path));
                            }) }) }), _jsx("main", { className: "flex-1", children: children })] })] }));
};
