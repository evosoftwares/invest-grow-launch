import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export const PartnerStatusBadge = ({ status }) => {
    const statusMap = {
        active: { label: "Ativo", color: "bg-green-100 text-green-800" },
        pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
        inactive: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
        blocked: { label: "Bloqueado", color: "bg-red-100 text-red-800" }
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return _jsx(Badge, { className: statusInfo.color, children: statusInfo.label });
};
