import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useDriverReferrals } from "@/hooks/useDriverReferrals";
import { useReferralStats } from "@/hooks/useReferralStats";
import { Wallet, TrendingUp, Clock, CheckCircle, DollarSign, Calendar } from "lucide-react";

const MobileReferralBonus = () => {
  const navigate = useNavigate();
  const { referrals } = useDriverReferrals();
  const { stats } = useReferralStats();
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Filter referrals based on status and bonus eligibility
  const completedReferrals = referrals?.filter(r => r.status === 'completed') || [];
  const paidBonuses = completedReferrals.filter(r => r.bonus_paid_at);
  const pendingBonuses = completedReferrals.filter(r => !r.bonus_paid_at);

  const filteredReferrals = filter === 'paid' ? paidBonuses : 
                           filter === 'pending' ? pendingBonuses : 
                           completedReferrals;

  const totalEarned = paidBonuses.reduce((sum, ref) => sum + (ref.bonus_amount || 0), 0);
  const totalPending = pendingBonuses.reduce((sum, ref) => sum + (ref.bonus_amount || 0), 0);

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
            <h1 className="text-xl font-light text-slate-700">Meus Ganhos</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Wallet className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600 mb-1">
                {formatCurrency(totalEarned)}
              </div>
              <div className="text-sm text-slate-600">Total Recebido</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-600 mb-1">
                {formatCurrency(totalPending)}
              </div>
              <div className="text-sm text-slate-600">Aguardando Pagamento</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-light text-blue-500">{paidBonuses.length}</div>
              <div className="text-xs text-slate-500">Pagos</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-light text-orange-500">{pendingBonuses.length}</div>
              <div className="text-xs text-slate-500">Pendentes</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-light text-green-500">
                {completedReferrals.length > 0 ? formatCurrency((totalEarned + totalPending) / completedReferrals.length) : 'R$ 0'}
              </div>
              <div className="text-xs text-slate-500">Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'all' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'border-slate-200 hover:bg-slate-50'}
          >
            Todos ({completedReferrals.length})
          </Button>
          <Button
            onClick={() => setFilter('paid')}
            variant={filter === 'paid' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'paid' ? 'bg-green-500 hover:bg-green-600 text-white' : 'border-slate-200 hover:bg-slate-50'}
          >
            Pagos ({paidBonuses.length})
          </Button>
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'pending' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-slate-200 hover:bg-slate-50'}
          >
            Pendentes ({pendingBonuses.length})
          </Button>
        </div>

        {/* Bonus List */}
        <div className="space-y-3">
          {filteredReferrals.length > 0 ? (
            filteredReferrals.map((referral) => (
              <Card 
                key={referral.id}
                className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/mobile/referrals/${referral.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${referral.bonus_paid_at ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div>
                        <div className="font-medium text-slate-800">
                          {(referral.referred as any)?.business_name || 
                           (referral.referred as any)?.profiles?.full_name || 
                           'Motorista Indicado'}
                        </div>
                        <div className="text-sm text-slate-500 font-mono">
                          {referral.referral_code}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(referral.bonus_amount || 0)}
                      </div>
                      <Badge className={referral.bonus_paid_at ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {referral.bonus_paid_at ? 'Pago' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Corridas completadas:</span>
                      <span className="font-medium">{referral.rides_completed}/{referral.target_rides}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Data de conclusão:</span>
                      <span className="font-medium">
                        {referral.updated_at ? formatDate(referral.updated_at) : 'N/A'}
                      </span>
                    </div>
                    
                    {referral.bonus_paid_at && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Data do pagamento:</span>
                        <span className="font-medium text-green-600">
                          {formatDate(referral.bonus_paid_at)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  {filter === 'paid' ? 'Nenhum bônus pago ainda' :
                   filter === 'pending' ? 'Nenhum bônus pendente' :
                   'Nenhuma indicação concluída'}
                </h3>
                <p className="text-slate-600 mb-4">
                  {filter === 'paid' ? 'Quando suas indicações completarem as metas, os bônus aparecerão aqui.' :
                   filter === 'pending' ? 'Bônus pendentes de pagamento aparecerão aqui.' :
                   'Continue indicando motoristas para começar a ganhar bônus.'}
                </p>
                <Button 
                  onClick={() => navigate('/mobile/referrals/share')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Fazer Nova Indicação
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Performance Insights */}
        {completedReferrals.length > 0 && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-slate-800">Insights de Performance</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Taxa de conversão:</span>
                  <span className="font-medium">
                    {stats?.conversionRate || 0}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo médio para conclusão:</span>
                  <span className="font-medium">~30 dias</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Melhor mês:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Schedule Info */}
        <Card className="border-slate-200 bg-blue-50/50 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-slate-800">Cronograma de Pagamentos</h3>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <span>📅</span>
                <span>Os pagamentos são processados toda sexta-feira às 18h</span>
              </div>
              <div className="flex items-start gap-2">
                <span>⚡</span>
                <span>Bônus são liberados automaticamente após a conclusão da meta</span>
              </div>
              <div className="flex items-start gap-2">
                <span>💳</span>
                <span>Pagamentos via PIX ou transferência bancária</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📱</span>
                <span>Você receberá uma notificação quando o pagamento for processado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MobileReferralBonus;