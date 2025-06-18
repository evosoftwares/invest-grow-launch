import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export const LoadingSpinner = ({ size = 'md', className, text }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };
    return (_jsxs("div", { className: cn('flex items-center justify-center gap-2', className), children: [_jsx("div", { className: cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses[size]) }), text && (_jsx("span", { className: "text-sm text-gray-600", children: text }))] }));
};
export const LoadingPage = ({ text = 'Carregando...' }) => (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx(LoadingSpinner, { size: "lg", text: text }) }));
export const LoadingCard = ({ text = 'Carregando dados...' }) => (_jsx("div", { className: "p-8 flex items-center justify-center", children: _jsx(LoadingSpinner, { text: text }) }));
