
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data - em produção viria de uma API
  const stats = {
    totalInvestors: 127,
    totalCaptured: 2450000,
    activePartners: 23,
    conversionRate: 15.8,
    monthlyGrowth: 12.5,
    pendingInvestments: 8
  };

  const recentInvestors = [
    { name: "João Silva", amount: 50000, status: "Confirmado", date: "2024-01-15" },
    { name: "Maria Santos", amount: 100000, status: "Pendente", date: "2024-01-14" },
    { name: "Carlos Oliveira", amount: 25000, status: "Confirmado", date: "2024-01-13" },
    { name: "Ana Costa", amount: 75000, status: "Análise", date: "2024-01-12" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral das captações e investimentos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investidores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestors}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Captado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {(stats.totalCaptured / 1000000).toFixed(1)}M
              </div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.monthlyGrowth}% este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parceiros Ativos</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePartners}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +3 novos este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <div className="flex items-center text-xs text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.1% vs mês anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Investimentos Recentes</CardTitle>
              <CardDescription>Últimos investimentos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvestors.map((investor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{investor.name}</p>
                      <p className="text-sm text-gray-500">{investor.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        R$ {investor.amount.toLocaleString('pt-BR')}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        investor.status === 'Confirmado' 
                          ? 'bg-green-100 text-green-800'
                          : investor.status === 'Pendente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {investor.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Pendentes</CardTitle>
              <CardDescription>Itens que precisam da sua atenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-medium">Investimentos Pendentes</p>
                    <p className="text-sm text-gray-600">Aguardando confirmação</p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.pendingInvestments}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium">Novos Parceiros</p>
                    <p className="text-sm text-gray-600">Aguardando aprovação</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    5
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium">Meta Mensal</p>
                    <p className="text-sm text-gray-600">78% atingido</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    78%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
