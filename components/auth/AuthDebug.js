import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
export const AuthDebug = () => {
    const { user, userProfile } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    if (!isVisible) {
        return (_jsx("div", { className: "fixed bottom-4 right-4", children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsVisible(true), children: "Debug Auth" }) }));
    }
    return (_jsx("div", { className: "fixed bottom-4 right-4 w-80", children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs(CardTitle, { className: "text-sm flex justify-between items-center", children: ["Debug de Autentica\u00E7\u00E3o", _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsVisible(false), children: "\u2715" })] }), _jsx(CardDescription, { className: "text-xs", children: "Informa\u00E7\u00F5es de debug para autentica\u00E7\u00E3o" })] }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "text-xs space-y-1", children: [_jsxs("div", { children: [_jsx("strong", { children: "User ID:" }), " ", (user === null || user === void 0 ? void 0 : user.id) || 'Não logado'] }), _jsxs("div", { children: [_jsx("strong", { children: "Email:" }), " ", (user === null || user === void 0 ? void 0 : user.email) || 'N/A'] }), _jsxs("div", { children: [_jsx("strong", { children: "Profile:" }), " ", userProfile ? 'Encontrado' : 'Não encontrado'] }), userProfile && (_jsxs("div", { children: [_jsx("strong", { children: "Role:" }), " ", userProfile.role || 'N/A'] }))] }), _jsx("div", { className: "text-xs text-gray-500", children: "Informa\u00E7\u00F5es de debug para verificar o estado da autentica\u00E7\u00E3o." })] })] }) }));
};
