import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleReload = () => {
            window.location.reload();
        };
        this.handleGoHome = () => {
            window.location.href = '/';
        };
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-gray-50", children: _jsxs(Card, { className: "max-w-lg w-full", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4", children: _jsx(AlertTriangle, { className: "w-6 h-6 text-red-600" }) }), _jsx(CardTitle, { className: "text-red-900", children: "Ops! Algo deu errado" }), _jsx(CardDescription, { children: "Ocorreu um erro inesperado. Nossa equipe foi notificada e est\u00E1 trabalhando para resolver o problema." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("div", { className: "p-4 bg-gray-100 rounded-lg", children: [_jsx("p", { className: "text-sm font-mono text-gray-800 mb-2", children: this.state.error.message }), this.state.errorInfo && (_jsxs("details", { className: "text-xs text-gray-600", children: [_jsx("summary", { className: "cursor-pointer mb-2", children: "Stack trace" }), _jsx("pre", { className: "whitespace-pre-wrap overflow-auto", children: this.state.errorInfo.componentStack })] }))] })), _jsxs("div", { className: "flex gap-3 justify-center", children: [_jsxs(Button, { onClick: this.handleReload, variant: "outline", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Recarregar p\u00E1gina"] }), _jsxs(Button, { onClick: this.handleGoHome, children: [_jsx(Home, { className: "w-4 h-4 mr-2" }), "Ir para in\u00EDcio"] })] })] }) })] }) }));
        }
        return this.props.children;
    }
}
// Hook para capturar erros em componentes funcionais
export const useErrorHandler = () => {
    return (error, errorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);
        // Aqui você pode enviar para um serviço de monitoramento como Sentry
    };
};
