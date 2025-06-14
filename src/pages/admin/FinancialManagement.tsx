
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle,
  Download
} from "lucide-react";

const FinancialManagement = () => {
  // Mock data - em produção viria de uma API
  const financialStats = {
    totalCaptado: 2450000,
    metaMensal: 500000,
    captadoMesAtual: 385000,
    investimentosPendentes: 8,
    valorPendente: 325000,
    comissoesPendentes: 15750
  };

  const recentTransactions = [
    {
      id: 1,
      investor: "João Silva",
      amount: 50000,
      type: "investment",
      status: "confirmed",
      date: "2024-01-15",
      method: "TED"
    },
    {
      id: 2,
      investor: "Maria Santos",
      amount: 100000,
      type: "investment",
      status: "pending",
      date: "2024-01-14",
      method: "PIX"
    },
    {
      id: 3,
      partner: "Carlos Vendedor",
      amount: 2500,
      type: "commission",
      status: "paid",
      date: "2024-01-13",
      method: "PIX"
    },
    {
      id: 4,
      investor: "Ana Costa",
      amount: 75000,
      type: "investment",
      status: "pending",
      date: "2024-01-12",
      method: "TED"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      confirmed: { label: "Confirmado", color: "bg-green-100 text-green-800" },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      paid: { label: "Pago", color: "bg-blue-100 text-blue-800" },
      failed: { label: "Falhado", color: "bg-red-100 text-red-800" }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    return type === 'investment' ? <TrendingUp className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />;
  };

  const progressPercentage = (financialStats.captadoMesAtual / financialStats.metaMensal) * 100;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
            <p className="text-gray-600">Controle de investimentos e comissões</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Relatório Financeiro
          </Button>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Captado</p>
                  <p className="text-2xl font-bold">
                    R$ {(financialStats.totalCaptado / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12.5% vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meta Mensal</p>
                  <p className="text-2xl font-bold">
                    R$ {(financialStats.metaMensal / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progresso</span>
                  <span>{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Investimentos Pendentes</p>
                  <p className="text-2xl font-bold">{financialStats.investimentosPendentes}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                R$ {financialStats.valorPendente.toLocaleString('pt-BR')} em análise
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comissões Pendentes</p>
                  <p className="text-2xl font-bold">
                    R$ {(financialStats.comissoesPendentes / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                A pagar para parceiros
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(transaction.type)}
                          <span className="ml-2 capitalize">
                            {transaction.type === 'investment' ? 'Investimento' : 'Comissão'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.investor || transaction.partner}
                      </TableCell>
                      <TableCell className="font-semibold">
                        R$ {transaction.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {transaction.status === 'pending' && (
                            <Button variant="outline" size="sm" className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmar
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Janeiro 2024</p>
                    <p className="text-sm text-gray-600">Meta: R$ 500K</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">R$ 385K</p>
                    <p className="text-sm text-green-600">77% da meta</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Dezembro 2023</p>
                    <p className="text-sm text-gray-600">Meta: R$ 400K</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">R$ 420K</p>
                    <p className="text-sm text-blue-600">105% da meta</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium">Novembro 2023</p>
                    <p className="text-sm text-gray-600">Meta: R$ 350K</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">R$ 298K</p>
                    <p className="text-sm text-purple-600">85% da meta</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Necessárias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-l-4 border-yellow-400 bg-yellow-50">
                  <div>
                    <p className="font-medium">Investimentos Pendentes</p>
                    <p className="text-sm text-gray-600">8 investimentos aguardando confirmação</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Revisar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border-l-4 border-blue-400 bg-blue-50">
                  <div>
                    <p className="font-medium">Comissões a Pagar</p>
                    <p className="text-sm text-gray-600">R$ 15.750 para 5 parceiros</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Processar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border-l-4 border-green-400 bg-green-50">
                  <div>
                    <p className="font-medium">Meta Mensal</p>
                    <p className="text-sm text-gray-600">Faltam R$ 115K para atingir a meta</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Estratégia
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FinancialManagement;
