import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { usePartners, usePartnerMutations } from "@/hooks/usePartners";
import { PartnerStatsCards } from "@/components/admin/partners/PartnerStatsCards";
import { PartnerFilters } from "@/components/admin/partners/PartnerFilters";
import { PartnersTable } from "@/components/admin/partners/PartnersTable";
import { filterPartners } from "@/utils/partnerFilters";
const PartnersManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { data: partners = [], isLoading } = usePartners();
    const { updatePartnerStatus } = usePartnerMutations();
    const handleStatusChange = (partnerId, newStatus) => {
        updatePartnerStatus.mutate({ id: partnerId, status: newStatus });
    };
    const filteredPartners = filterPartners(partners, searchTerm, statusFilter);
    if (isLoading) {
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }) }));
    }
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Gest\u00E3o de Parceiros" }), _jsx("p", { className: "text-gray-600", children: "Gerencie parceiros e suas comiss\u00F5es" })] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Novo Parceiro"] })] }), _jsx(PartnerStatsCards, { partners: partners }), _jsx(PartnerFilters, { searchTerm: searchTerm, setSearchTerm: setSearchTerm, statusFilter: statusFilter, setStatusFilter: setStatusFilter }), _jsx(PartnersTable, { partners: filteredPartners, onStatusChange: handleStatusChange, isLoading: updatePartnerStatus.isPending })] }) }));
};
export default PartnersManagement;
