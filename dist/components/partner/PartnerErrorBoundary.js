import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
class PartnerErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Partner Error Boundary caught an error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsx(CardTitle, { className: "text-xl text-gray-900", children: "Erro no Sistema de Parceiros" })] }), _jsxs(CardContent, { className: "text-center space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "Ocorreu um erro inesperado no sistema de parceiros. Tente recarregar a p\u00E1gina ou entre em contato com o suporte." }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { onClick: () => window.location.reload(), className: "w-full", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Recarregar P\u00E1gina"] }), _jsx(Button, { variant: "outline", onClick: () => window.history.back(), className: "w-full", children: "Voltar" })] }), this.state.error && (_jsxs("details", { className: "text-xs text-gray-500 mt-4", children: [_jsx("summary", { className: "cursor-pointer", children: "Detalhes do erro" }), _jsx("pre", { className: "mt-2 text-left bg-gray-100 p-2 rounded", children: this.state.error.message })] }))] })] }) }));
        }
        return this.props.children;
    }
}
export default PartnerErrorBoundary;
