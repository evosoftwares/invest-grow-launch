
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Link as LinkIcon,
  Eye,
  UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  
  // Mock data - em produção virá da API
  const stats = {
    totalReferrals: 12,
    activeInvestors: 8,
    totalCommissions: 2450.00,
    monthlyCommissions: 320.00,
    conversionRate: 18.5,
    clicks: 156
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

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
            Acompanhe suas indicações, comissões e desempenho como parceiro.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Indicações</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReferrals}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeInvestors} investidores ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissões Totais</CardTitle>
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
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.clicks} cliques nos seus links
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
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/partner/links')}
                className="w-full justify-start"
                variant="outline"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
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
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nível:</span>
                <Badge variant="outline">Parceiro Padrão</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comissão:</span>
                <span className="text-sm font-bold">5% inicial / 2,5% recorrente</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
