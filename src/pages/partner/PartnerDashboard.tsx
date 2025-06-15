
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  Eye,
  PlusCircle,
  ExternalLink,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePartnerId } from "@/hooks/usePartnerId";
import PartnerErrorBoundary from "@/components/partner/PartnerErrorBoundary";

const PartnerDashboardContent = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  const { data: partnerId, isLoading: isLoadingPartnerId, error: partnerError } = usePartnerId();
  
  // Buscar estatísticas específicas do parceiro
  const { data: partnerStats, isLoading } = useQuery({
    queryKey: ['partner-stats', partnerId],
    queryFn: async () => {
      if (!partnerId) return null;
      
      // Buscar investidores do parceiro
      const { data: investors } = await supabase
        .from('investors')
        .select('*')
        .eq('partner_id', partnerId);
      
      // Buscar investimentos dos investidores do parceiro
      const { data: investments } = await supabase
        .from('investments')
        .select('amount, status')
        .eq('partner_id', partnerId);
      
      // Calcular estatísticas
      const totalInvestors = investors?.length || 0;
      const activeInvestors = investors?.filter(inv => inv.status === 'invested').length || 0;
      const totalInvestments = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      const approvedInvestments = investments?.filter(inv => inv.status === 'approved' || inv.status === 'paid').length || 0;
      const conversionRate = totalInvestors > 0 ? (activeInvestors / totalInvestors) * 100 : 0;
      
      // Mock de comissões (seria calculado baseado nos investimentos)
      const totalCommissions = totalInvestments * 0.05; // 5% de comissão
      const monthlyCommissions = totalCommissions * 0.1; // Mock de comissões do mês
      
      return {
        totalInvestors,
        activeInvestors,
        totalCommissions,
        monthlyCommissions,
        conversionRate,
        approvedInvestments,
        totalInvestments
      };
    },
    enabled: !!partnerId
  });

  const stats = partnerStats || {
    totalInvestors: 0,
    activeInvestors: 0,
    totalCommissions: 0,
    monthlyCommissions: 0,
    conversionRate: 0,
    approvedInvestments: 0,
    totalInvestments: 0
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoadingPartnerId || isLoading) {
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Futuro PDV" 
              className="h-10 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div className="w-px h-6 bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Dashboard do Parceiro
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Olá, {userProfile?.full_name || 'Parceiro'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao seu Dashboard
          </h2>
          <p className="text-gray-600">
            Gerencie seus investidores cadastrados e acompanhe suas comissões.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Investidores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestors}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeInvestors} investidores ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissões Estimadas</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalCommissions.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground">
                +R$ {stats.monthlyCommissions.toLocaleString('pt-BR')} este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.approvedInvestments} investimentos aprovados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerencie seus investidores e acompanhe o desempenho
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/partner/investors/new')}
                className="w-full justify-start"
                variant="default"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Cadastrar Novo Investidor
              </Button>
              
              <Button 
                onClick={() => navigate('/partner/investors')}
                className="w-full justify-start"
                variant="outline"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Meus Investidores
              </Button>
              
              <Button 
                onClick={() => navigate('/partner/links')}
                className="w-full justify-start"
                variant="outline"
                disabled={!partnerId}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Gerenciar Links de Indicação
              </Button>
              
              <Button 
                onClick={() => navigate('/partner/commissions')}
                className="w-full justify-start"
                variant="outline"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Ver Histórico de Comissões
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status da Conta</CardTitle>
              <CardDescription>
                Informações sobre sua conta de parceiro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge className="bg-green-100 text-green-800">
                  {partnerId ? 'Ativo' : 'Configurando'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nível:</span>
                <Badge variant="outline">Parceiro Padrão</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comissão:</span>
                <span className="text-sm font-bold">5% inicial / 2,5% recorrente</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Investidores:</span>
                <span className="text-sm font-bold">{stats.totalInvestors} cadastrados</span>
              </div>
            </CardContent>
          </Card>
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
