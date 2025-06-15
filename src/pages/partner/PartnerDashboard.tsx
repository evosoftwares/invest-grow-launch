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

  // CORREÇÃO: Calcular comissões baseadas nos dados reais com validações rigorosas
  const commissionStats = {
    totalCommissions: commissions.reduce((sum, comm) => sum + Number(comm.amount), 0),
    paidCommissions: commissions
      .filter(comm => {
        if (!comm.paid_at) return false;
        const paidDate = new Date(comm.paid_at);
        const now = new Date();
        // Garantir que a data não é futura
        return paidDate <= now;
      })
      .reduce((sum, comm) => sum + Number(comm.amount), 0),
    pendingCommissions: commissions
      .filter(comm => !comm.paid_at)
      .reduce((sum, comm) => sum + Number(comm.amount), 0),
    // CORREÇÃO: Comissões mensais baseadas APENAS em paid_at válido
    monthlyCommissions: commissions
      .filter(comm => {
        if (!comm.paid_at) return false;
        const paidDate = new Date(comm.paid_at);
        const now = new Date();
        // Verificar se é do mês atual e não é futuro
        return paidDate <= now && 
               paidDate.getMonth() === now.getMonth() && 
               paidDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, comm) => sum + Number(comm.amount), 0)
  };

  // CORREÇÃO: Log detalhado das comissões para debugging
  console.log('=== COMMISSION STATS DETAILED VALIDATION ===');
  console.log('💰 Total commissions found:', commissions.length);
  console.log('💵 Total commission amount:', commissionStats.totalCommissions);
  console.log('✅ Paid commissions amount:', commissionStats.paidCommissions);
  console.log('⏳ Pending commissions amount:', commissionStats.pendingCommissions);
  console.log('📅 Monthly commissions (current month):', commissionStats.monthlyCommissions);
  
  // Validar se a soma está correta
  const calculatedTotal = commissionStats.paidCommissions + commissionStats.pendingCommissions;
  if (Math.abs(calculatedTotal - commissionStats.totalCommissions) > 0.01) {
    console.error('❌ COMMISSION CALCULATION ERROR: Total != Paid + Pending');
    console.error('Total:', commissionStats.totalCommissions);
    console.error('Paid + Pending:', calculatedTotal);
    console.error('Difference:', Math.abs(calculatedTotal - commissionStats.totalCommissions));
  } else {
    console.log('✅ Commission calculations are consistent');
  }

  // Validar comissões individualmente
  commissions.forEach(comm => {
    if (comm.paid_at) {
      const paidDate = new Date(comm.paid_at);
      const now = new Date();
      if (paidDate > now) {
        console.error(`❌ CRITICAL: Commission ${comm.id} still has future paid_at:`, comm.paid_at);
      }
    }
    if (Number(comm.amount) <= 0) {
      console.warn(`⚠️ Commission ${comm.id} has zero or negative amount:`, comm.amount);
    }
  });

  // Log das comissões para debugging com validações
  console.log('=== COMMISSION STATS VALIDATION ===');
  console.log('Total commissions found:', commissions.length);
  console.log('Commission stats calculated:', commissionStats);
  
  // Validar se total = pago + pendente
  const calculatedTotal = commissionStats.paidCommissions + commissionStats.pendingCommissions;
  if (Math.abs(calculatedTotal - commissionStats.totalCommissions) > 0.01) {
    console.warn('⚠️ INCONSISTENCY: Total commissions != Paid + Pending');
    console.warn('Total:', commissionStats.totalCommissions);
    console.warn('Paid + Pending:', calculatedTotal);
  }

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

  // Log das estatísticas finais com validação
  console.log('=== FINAL DASHBOARD STATS ===');
  console.log('Final stats used in dashboard:', stats);
  
  // Validações finais
  if (stats.activeInvestors > stats.totalInvestors) {
    console.error('❌ CRITICAL: Active investors > Total investors!');
  }
  if (stats.conversionRate > 100) {
    console.error('❌ CRITICAL: Conversion rate > 100%!');
  }
  if (stats.approvedInvestments < 0) {
    console.error('❌ CRITICAL: Negative approved investments!');
  }

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
