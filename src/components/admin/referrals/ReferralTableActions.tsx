import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, X, MoreHorizontal, Eye, DollarSign } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

interface ReferralTableActionsProps {
  referral: DriverReferral;
  onStatusChange: (referralId: string, status: string) => void;
  onViewDetails: (referral: DriverReferral) => void;
  onPayBonus: (referral: DriverReferral) => void;
  isLoading: boolean;
}

export const ReferralTableActions = ({
  referral,
  onStatusChange,
  onViewDetails,
  onPayBonus,
  isLoading
}: ReferralTableActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(referral)}>
          <Eye className="mr-2 h-4 w-4" />
          Ver Detalhes
        </DropdownMenuItem>
        
        {referral.status === "pending" && (
          <DropdownMenuItem onClick={() => onStatusChange(referral.id, "active")}>
            <Check className="mr-2 h-4 w-4 text-green-600" />
            Ativar Indicação
          </DropdownMenuItem>
        )}
        
        {referral.status === "active" && (
          <DropdownMenuItem onClick={() => onStatusChange(referral.id, "completed")}>
            <Check className="mr-2 h-4 w-4 text-green-600" />
            Marcar como Concluída
          </DropdownMenuItem>
        )}
        
        {referral.status === "completed" && !referral.bonus_paid_at && (
          <DropdownMenuItem onClick={() => onPayBonus(referral)}>
            <DollarSign className="mr-2 h-4 w-4 text-green-600" />
            Pagar Bônus
          </DropdownMenuItem>
        )}
        
        {referral.status !== "cancelled" && referral.status !== "completed" && (
          <DropdownMenuItem onClick={() => onStatusChange(referral.id, "cancelled")}>
            <X className="mr-2 h-4 w-4 text-red-600" />
            Cancelar Indicação
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};