
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, UserCheck, TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useInvestments } from "@/hooks/useInvestments";
import { usePartners } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardData();
  const { data: investments, isLoading: investmentsLoading } = useInvestments();
  const { data: partners, isLoading: partnersLoading } = usePartners();

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (statsLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema de captação de investimentos
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const progressPercentage = dashboardStats 
    ? (dashboardStats.totalAmount / dashboardStats.investmentGoal) * 100 
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de captação de investimentos
          </p>
        </div>

        {/* Cards de estatísticas principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Investidores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.totalInvestors || 0}</div>
              <p className="text-xs text-muted-foreground">
                Leads registrados no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parceiros Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.activePartners || 0}</div>
              <p className="text-xs text-muted-foreground">
                de {dashboardStats?.totalPartners || 0} parceiros cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Captado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(dashboardStats?.totalAmount || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Investimentos confirmados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPercentage(dashboardStats?.conversionRate || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Leads convertidos em investidores
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cards de progresso e status */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Progresso da Captação
              </CardTitle>
              <CardDescription>
                Meta: {formatCurrency(dashboardStats?.investmentGoal || 0)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Captado</span>
                  <span>{formatCurrency(dashboardStats?.totalAmount || 0)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className="font-medium">{formatPercentage(progressPercentage)}</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Status dos Investimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendentes</span>
                  <Badge variant="outline">
                    {dashboardStats?.pendingInvestments || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total</span>
                  <Badge variant="secondary">
                    {dashboardStats?.totalInvestments || 0}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de investimentos recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Investimentos Recentes</CardTitle>
            <CardDescription>
              Últimos investimentos registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {investmentsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : investments && investments.length > 0 ? (
              <div className="space-y-3">
                {investments.slice(0, 5).map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{investment.investors?.full_name}</p>
                      <p className="text-sm text-muted-foreground">{investment.investors?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(investment.amount)}</p>
                      <Badge 
                        variant={
                          investment.status === 'paid' ? 'default' : 
                          investment.status === 'approved' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {investment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum investimento encontrado
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
