import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useDriverReferrals } from "@/hooks/useDriverReferrals";
import { Share2, Phone, MessageCircle, User, Calendar, Target, Wallet } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

const MobileReferralDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { referrals } = useDriverReferrals();
  const [referral, setReferral] = useState<DriverReferral | null>(null);

  useEffect(() => {
    if (referrals && id) {
      const found = referrals.find(r => r.id === id);
      setReferral(found || null);
    }
  }, [referrals, id]);

  if (!referral) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/referrals')}
              className="hover:bg-slate-100"
            >
              <span>←</span>
            </Button>
            <h1 className="text-xl font-light text-slate-700">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('pt-BR');
  };

  const handleShare = () => {
    navigate('/mobile/referrals/share', { 
      state: { referralCode: referral.referral_code } 
    });
  };

  const handleContact = () => {
    const referredData = referral.referred as any;
    const phone = referredData?.profiles?.phone;
    if (phone) {
      window.open(`tel:${phone}`, '_blank');
    }
  };

  const handleWhatsApp = () => {
    const referredData = referral.referred as any;
    const phone = referredData?.profiles?.phone;
    if (phone) {
      const message = encodeURIComponent(`Olá! Como está o progresso na plataforma? Você já tem ${referral.rides_completed || 0} de ${referral.target_rides} corridas completadas! 🚗`);
      window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/referrals')}
              className="hover:bg-slate-100"
            >
              <span>←</span>
            </Button>
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-6"
            />
            <h1 className="text-xl font-light text-slate-700">Detalhes da Indicação</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="border-slate-200 hover:bg-slate-50"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Overview */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge className={getStatusColor(referral.status || 'pending')}>
                {getStatusLabel(referral.status || 'pending')}
              </Badge>
              {referral.bonus_paid_at && (
                <Badge className="bg-green-100 text-green-800">
                  💰 Bônus Pago
                </Badge>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                {referral.referral_code}
              </div>
              <p className="text-sm text-slate-600">Código de Indicação</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-slate-800">Progresso das Corridas</h3>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {referral.rides_completed || 0}
                </div>
                <div className="text-sm text-slate-600">
                  de {referral.target_rides || 0} corridas
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progresso</span>
                  <span>{getProgressPercentage().toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
              
              {referral.target_rides && (
                <div className="text-center text-sm text-slate-600">
                  Faltam {Math.max(0, referral.target_rides - (referral.rides_completed || 0))} corridas para o bônus
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Info */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-medium text-slate-800">Informações Financeiras</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {referral.bonus_amount ? formatCurrency(referral.bonus_amount) : 'N/A'}
                </div>
                <div className="text-sm text-slate-600">Valor do Bônus</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700 mb-1">
                  {referral.bonus_paid_at ? '✅' : '⏳'}
                </div>
                <div className="text-sm text-slate-600">
                  {referral.bonus_paid_at ? 'Pago' : 'Pendente'}
                </div>
              </div>
            </div>
            
            {referral.bonus_paid_at && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 text-center">
                  💰 Bônus pago em {formatDateTime(referral.bonus_paid_at)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referred Person Info */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-slate-800">Motorista Indicado</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Nome:</span>
                <span className="font-medium">
                  {(referral.referred as any)?.business_name || 
                   (referral.referred as any)?.profiles?.full_name || 
                   'Aguardando cadastro'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Email:</span>
                <span className="text-sm">
                  {(referral.referred as any)?.profiles?.email || 'N/A'}
                </span>
              </div>
              
              {(referral.referred as any)?.profiles?.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Telefone:</span>
                  <span className="text-sm">
                    {(referral.referred as any).profiles.phone}
                  </span>
                </div>
              )}
            </div>
            
            {(referral.referred as any)?.profiles?.phone && (
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleContact}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-slate-800">Linha do Tempo</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Indicação Criada</div>
                  <div className="text-xs text-slate-500">
                    {formatDateTime(referral.created_at || '')}
                  </div>
                </div>
              </div>
              
              {referral.approved_at && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Indicação Aprovada</div>
                    <div className="text-xs text-slate-500">
                      {formatDateTime(referral.approved_at)}
                    </div>
                  </div>
                </div>
              )}
              
              {referral.bonus_paid_at && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Bônus Pago</div>
                    <div className="text-xs text-slate-500">
                      {formatDateTime(referral.bonus_paid_at)}
                    </div>
                  </div>
                </div>
              )}
              
              {referral.expires_at && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Data de Expiração</div>
                    <div className="text-xs text-slate-500">
                      {formatDateTime(referral.expires_at)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {referral.notes && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-slate-800 mb-3">📝 Observações</h3>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-slate-700">{referral.notes}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom Spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MobileReferralDetails;