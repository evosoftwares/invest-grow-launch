
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Mail } from "lucide-react";

interface PartnerTableActionsProps {
  partner: {
    id: string;
    status: string;
  };
  onStatusChange: (partnerId: string, status: 'pending' | 'active' | 'inactive' | 'blocked') => void;
  isLoading: boolean;
}

export const PartnerTableActions = ({ partner, onStatusChange, isLoading }: PartnerTableActionsProps) => {
  return (
    <div className="flex space-x-2">
      {partner.status === 'pending' && (
        <>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStatusChange(partner.id, 'active')}
            disabled={isLoading}
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStatusChange(partner.id, 'blocked')}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      )}
      <Button variant="outline" size="sm">
        <Eye className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="sm">
        <Mail className="w-4 h-4" />
      </Button>
    </div>
  );
};
