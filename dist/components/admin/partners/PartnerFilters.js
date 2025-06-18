import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
export const PartnerFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Filtros" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: "Buscar por nome ou email...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }) }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos os Status" }), _jsx(SelectItem, { value: "active", children: "Ativo" }), _jsx(SelectItem, { value: "pending", children: "Pendente" }), _jsx(SelectItem, { value: "inactive", children: "Inativo" }), _jsx(SelectItem, { value: "blocked", children: "Bloqueado" })] })] })] }) })] }));
};
