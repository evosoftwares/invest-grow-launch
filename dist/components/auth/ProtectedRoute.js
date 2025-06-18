import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading, userProfile } = useAuth();
    console.log('ProtectedRoute check:', {
        user: !!user,
        loading,
        userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.role,
        requiredRole
    });
    // Mostrar loading enquanto está carregando
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Carregando..." })] }) }));
    }
    // Se não tem usuário, redirecionar para login
    if (!user) {
        console.log('No user, redirecting to auth');
        return _jsx(Navigate, { to: "/auth", replace: true });
    }
    // Se não tem perfil ainda, aguardar um pouco mais
    if (!userProfile) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Carregando perfil..." })] }) }));
    }
    // Verificar role se necessário
    if (requiredRole && userProfile) {
        const userRole = userProfile.role || 'investor';
        console.log('Role check:', { userRole, requiredRole });
        // Admin tem acesso a tudo
        if (userRole === 'admin') {
            return _jsx(_Fragment, { children: children });
        }
        // Verificar se o role específico é necessário
        if (userRole !== requiredRole) {
            console.log('Insufficient permissions, redirecting based on role');
            // Redirecionar para a página apropriada baseada no role do usuário
            switch (userRole) {
                case 'partner':
                    return _jsx(Navigate, { to: "/partner/dashboard", replace: true });
                case 'investor':
                    return _jsx(Navigate, { to: "/calculadora", replace: true });
                default:
                    return _jsx(Navigate, { to: "/", replace: true });
            }
        }
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
