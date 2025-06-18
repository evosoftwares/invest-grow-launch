import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROICalculator } from "@/components/ROICalculator";
const ROICalculatorPage = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("header", { className: "bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx("div", { className: "flex items-center", children: _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }) }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/'), className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Voltar ao Site"] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-slate-900 mb-4", children: "Calculadora ROI" }), _jsx("p", { className: "text-xl text-slate-600 max-w-3xl mx-auto", children: "Simule diferentes cen\u00E1rios de investimento e visualize o potencial de crescimento do seu dinheiro." })] }), _jsx(ROICalculator, {})] })] }));
};
export default ROICalculatorPage;
