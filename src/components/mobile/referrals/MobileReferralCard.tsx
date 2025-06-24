import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type DriverReferral = Tables<"driver_referrals">;

interface MobileReferralCardProps {
  referral: DriverReferral;
  onShare?: (referral: DriverReferral) => void;
}

export const MobileReferralCard = ({ referral, onShare }: MobileReferralCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'active': return 'Ativa';
      case 'completed': return 'Concluída';
      case 'expired': return 'Expirada';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconhecido';
    }
  };

  const getProgressPercentage = () => {
    if (!referral.target_rides) return 0;
    return Math.min(100, ((referral.rides_completed || 0) / referral.target_rides) * 100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card 
      className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(`/mobile/referrals/${referral.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(referral.status || 'pending')}>
              {getStatusLabel(referral.status || 'pending')}
            </Badge>
            {referral.bonus_paid_at && (
              <Badge className="bg-green-100 text-green-800">
                💰 Pago
              </Badge>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-light text-blue-600">
              {referral.bonus_amount ? formatCurrency(referral.bonus_amount) : 'N/A'}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Código:</span>
            <span className="font-mono text-sm font-medium">{referral.referral_code}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Indicado:</span>
            <span className="text-sm font-medium">
              {(referral.referred as any)?.business_name || 
               (referral.referred as any)?.profiles?.full_name || 
               'Aguardando'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Progresso</span>
            <span>{referral.rides_completed || 0} / {referral.target_rides || 0} corridas</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Criado: {new Date(referral.created_at || '').toLocaleDateString('pt-BR')}
          </div>
          
          {onShare && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onShare(referral);
              }}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              📤 Compartilhar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};