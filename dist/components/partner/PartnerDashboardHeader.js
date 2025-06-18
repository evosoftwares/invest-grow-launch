import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const PartnerDashboardHeader = ({ userFullName, onLogout }) => {
    const navigate = useNavigate();
    return _jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }), _jsx("div", { className: "w-px h-6 bg-gray-300" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Ol\u00E1, ", userFullName || 'Parceiro'] }), _jsx(Button, { variant: "outline", size: "sm", onClick: onLogout, children: "Sair" })] })] }) });
};
export default PartnerDashboardHeader;
