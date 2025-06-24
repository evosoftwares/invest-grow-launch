import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useDriverReferrals } from "@/hooks/useDriverReferrals";
import { MobileReferralStatsCards } from "@/components/mobile/referrals/MobileReferralStatsCards";
import { MobileReferralCard } from "@/components/mobile/referrals/MobileReferralCard";
import { MobileProgramOverview } from "@/components/mobile/referrals/MobileProgramOverview";
import { Share2, Gift, Wallet, Info, Plus, RefreshCw } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

const MobileReferrals = () => {
  const navigate = useNavigate();
  const { referrals, isLoading } = useDriverReferrals();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 1000);
    window.location.reload();
  };

  const handleShare = (referral: DriverReferral) => {
    navigate('/mobile/referrals/share', { 
      state: { referralCode: referral.referral_code } 
    });
  };

  const handleGenerateCode = () => {
    navigate('/mobile/referrals/share');
  };

  // Group referrals by status for better organization
  const activeReferrals = referrals?.filter(r => r.status === 'active') || [];
  const completedReferrals = referrals?.filter(r => r.status === 'completed') || [];
  const pendingReferrals = referrals?.filter(r => r.status === 'pending') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/partner-dashboard')}
              className="hover:bg-slate-100"
            >
              <span>←</span>
            </Button>
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-6"
            />
            <h1 className="text-xl font-light text-slate-700">Programa de Indicações</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Program Overview */}
        <MobileProgramOverview onGenerateCode={handleGenerateCode} />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => navigate('/mobile/referrals/share')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 h-auto flex-col gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Compartilhar</span>
          </Button>
          <Button
            onClick={() => navigate('/mobile/referrals/bonus')}
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 p-4 h-auto flex-col gap-2"
          >
            <Wallet className="w-5 h-5 text-green-600" />
            <span className="text-sm">Meus Ganhos</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-slate-800">📊 Minhas Estatísticas</h2>
          <MobileReferralStatsCards />
        </div>

        {/* Active Referrals */}
        {activeReferrals.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-800">🔥 Indicações Ativas</h2>
              <Badge className="bg-blue-100 text-blue-800">
                {activeReferrals.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {activeReferrals.map((referral) => (
                <MobileReferralCard
                  key={referral.id}
                  referral={referral}
                  onShare={handleShare}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Referrals */}
        {completedReferrals.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-800">✅ Indicações Concluídas</h2>
              <Badge className="bg-green-100 text-green-800">
                {completedReferrals.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {completedReferrals.slice(0, 3).map((referral) => (
                <MobileReferralCard
                  key={referral.id}
                  referral={referral}
                />
              ))}
              {completedReferrals.length > 3 && (
                <Button 
                  variant="outline" 
                  className="w-full border-slate-200 hover:bg-slate-50"
                  onClick={() => navigate('/mobile/referrals/bonus')}
                >
                  Ver todas as {completedReferrals.length} concluídas
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Pending Referrals */}
        {pendingReferrals.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-800">⏳ Aguardando Aprovação</h2>
              <Badge className="bg-yellow-100 text-yellow-800">
                {pendingReferrals.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {pendingReferrals.map((referral) => (
                <MobileReferralCard
                  key={referral.id}
                  referral={referral}
                  onShare={handleShare}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!referrals || referrals.length === 0) && !isLoading && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-6 text-center">
              <Gift className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                Comece a indicar motoristas
              </h3>
              <p className="text-slate-600 mb-4">
                Gere seu código de indicação e comece a ganhar bônus por cada motorista que você trouxer para a plataforma.
              </p>
              <Button 
                onClick={handleGenerateCode}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Indicação
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Link */}
        <Button
          variant="outline"
          onClick={() => navigate('/mobile/referrals/rules')}
          className="w-full border-slate-200 hover:bg-slate-50 text-slate-600"
        >
          <Info className="w-4 h-4 mr-2" />
          Como funciona o programa de indicações?
        </Button>

        {/* Bottom Spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MobileReferrals;