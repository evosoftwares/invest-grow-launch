import { Badge } from "@/components/ui/badge";

interface ReferralStatusBadgeProps {
  status: string;
}

export const ReferralStatusBadge = ({ status }: ReferralStatusBadgeProps) => {
  const statusMap = {
    pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
    active: { label: "Ativa", color: "bg-blue-100 text-blue-800" },
    completed: { label: "Concluída", color: "bg-green-100 text-green-800" },
    expired: { label: "Expirada", color: "bg-gray-100 text-gray-800" },
    cancelled: { label: "Cancelada", color: "bg-red-100 text-red-800" }
  };
  
  const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
  return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
};