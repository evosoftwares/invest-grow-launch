
import { Badge } from "@/components/ui/badge";

interface PartnerStatusBadgeProps {
  status: string;
}

export const PartnerStatusBadge = ({ status }: PartnerStatusBadgeProps) => {
  const statusMap = {
    active: { label: "Ativo", color: "bg-green-100 text-green-800" },
    pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
    inactive: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
    blocked: { label: "Bloqueado", color: "bg-red-100 text-red-800" }
  };
  
  const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
  return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
};
