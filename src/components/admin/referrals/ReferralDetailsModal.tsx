import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ReferralStatusBadge } from "./ReferralStatusBadge";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

interface ReferralDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: DriverReferral | null;
}

export const ReferralDetailsModal = ({ isOpen, onClose, referral }: ReferralDetailsModalProps) => {
  if (!referral) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString('pt-BR');
  };

  const getProgressPercentage = () => {
    if (!referral.target_rides) return 0;
    return Math.min(100, ((referral.rides_completed || 0) / referral.target_rides) * 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes da Indicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Código da Indicação</h4>
              <p className="font-mono text-lg">{referral.referral_code}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Status</h4>
              <ReferralStatusBadge status={referral.status || "pending"} />
            </div>
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Indicador</h4>
              <div className="space-y-1">
                <p className="font-medium">
                  {(referral.referrer as any)?.business_name || 
                   (referral.referrer as any)?.profiles?.full_name || 
                   'Nome não informado'}
                </p>
                <p className="text-sm text-blue-700">
                  {(referral.referrer as any)?.profiles?.email || 'Email não informado'}
                </p>
                {(referral.referrer as any)?.profiles?.phone && (
                  <p className="text-sm text-blue-700">
                    {(referral.referrer as any).profiles.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Indicado</h4>
              <div className="space-y-1">
                <p className="font-medium">
                  {(referral.referred as any)?.business_name || 
                   (referral.referred as any)?.profiles?.full_name || 
                   'Nome não informado'}
                </p>
                <p className="text-sm text-green-700">
                  {(referral.referred as any)?.profiles?.email || 'Email não informado'}
                </p>
                {(referral.referred as any)?.profiles?.phone && (
                  <p className="text-sm text-green-700">
                    {(referral.referred as any).profiles.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Progresso das Corridas</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Corridas Completadas</span>
                <span>{referral.rides_completed || 0} / {referral.target_rides || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {getProgressPercentage().toFixed(1)}% concluído
              </p>
            </div>
          </div>

          {/* Financial Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Valor do Bônus</h4>
              <p className="text-lg font-semibold text-green-600">
                {referral.bonus_amount ? formatCurrency(referral.bonus_amount) : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Status do Pagamento</h4>
              {referral.bonus_paid_at ? (
                <Badge className="bg-green-100 text-green-800">
                  Pago em {formatDate(referral.bonus_paid_at)}
                </Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800">
                  Pendente
                </Badge>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900">Criado em</h4>
              <p className="text-gray-600">{formatDate(referral.created_at)}</p>
            </div>
            {referral.approved_at && (
              <div>
                <h4 className="font-medium text-gray-900">Aprovado em</h4>
                <p className="text-gray-600">{formatDate(referral.approved_at)}</p>
              </div>
            )}
            {referral.expires_at && (
              <div>
                <h4 className="font-medium text-gray-900">Expira em</h4>
                <p className="text-gray-600">{formatDate(referral.expires_at)}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          {referral.notes && (
            <div>
              <h4 className="font-medium text-gray-900">Observações</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1">
                {referral.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};