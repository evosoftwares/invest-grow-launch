
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePartnerId } from "@/hooks/usePartnerId";
import { usePartnerCommissions } from "@/hooks/usePartnerCommissions";
import { usePartnerStats } from "@/hooks/usePartnerStats";
import PartnerErrorBoundary from "@/components/partner/PartnerErrorBoundary";
import PartnerDashboardHeader from "@/components/partner/PartnerDashboardHeader";
import PartnerStatsCards from "@/components/partner/PartnerStatsCards";
import PartnerQuickActions from "@/components/partner/PartnerQuickActions";
import PartnerAccountStatus from "@/components/partner/PartnerAccountStatus";

const PartnerDashboardContent = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  const { data: partnerId, isLoading: isLoadingPartnerId, error: partnerError } = usePartnerId();
  const { data: commissions = [], isLoading: isLoadingCommissions } = usePartnerCommissions();
  const { data: partnerStats, isLoading } = usePartnerStats(partnerId);

  // Calcular comissões baseadas nos dados reais
  const commissionStats = {
    totalCommissions: commissions.reduce((sum, comm) => sum + Number(comm.amount), 0),
    paidCommissions: commissions
      .filter(comm => comm.paid_at)
      .reduce((sum, comm) => sum + Number(comm.amount), 0),
    pendingCommissions: commissions
      .filter(comm => !comm.paid_at)
      .reduce((sum, comm) => sum + Number(comm.amount), 0),
    monthlyCommissions: commissions
      .filter(comm => {
        const commDate = new Date(comm.calculated_at);
        const now = new Date();
        return commDate.getMonth() === now.getMonth() && commDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, comm) => sum + Number(comm.amount), 0)
  };

  // Log das comissões para debugging
  console.log('Commission stats:', commissionStats);

  const stats = partnerStats ? {
    ...partnerStats,
    ...commissionStats
  } : {
    totalInvestors: 0,
    activeInvestors: 0,
    totalInvestments: 0,
    approvedInvestments: 0,
    conversionRate: 0,
    totalCommissions: 0,
    paidCommissions: 0,
    pendingCommissions: 0,
    monthlyCommissions: 0
  };

  // Log das estatísticas finais
  console.log('Final stats used in dashboard:', stats);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoadingPartnerId || isLoading || isLoadingCommissions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (partnerError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro de Configuração</h2>
          <p className="text-gray-600 mb-4">
            Não foi possível carregar seus dados de parceiro. 
            Sua conta pode ainda estar sendo configurada.
          </p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerDashboardHeader 
        userFullName={userProfile?.full_name}
        onLogout={handleLogout}
      />

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao seu Dashboard
          </h2>
          <p className="text-gray-600">
            Gerencie seus investidores cadastrados e acompanhe suas comissões.
          </p>
        </div>

        <PartnerStatsCards stats={stats} />

        <div className="grid md:grid-cols-2 gap-6">
          <PartnerQuickActions partnerId={partnerId} />
          <PartnerAccountStatus partnerId={partnerId} stats={stats} />
        </div>
      </div>
    </div>
  );
};

const PartnerDashboard = () => {
  return (
    <PartnerErrorBoundary>
      <PartnerDashboardContent />
    </PartnerErrorBoundary>
  );
};

export default PartnerDashboard;
