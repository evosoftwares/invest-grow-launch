
import { useState } from "react";
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle,
  Download,
  Loader2
} from "lucide-react";
import { useInvestments, useInvestmentMutations } from "@/hooks/useInvestments";
import { toast } from "@/components/ui/use-toast";

const FinancialManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: investments = [], isLoading, error } = useInvestments();
  const { updateInvestmentStatus } = useInvestmentMutations();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      analysis: { label: "Análise", color: "bg-blue-100 text-blue-800" },
      approved: { label: "Aprovado", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejeitado", color: "bg-red-100 text-red-800" },
      paid: { label: "Pago", color: "bg-purple-100 text-purple-800" }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const handleStatusChange = (investmentId: string, newStatus: any) => {
    updateInvestmentStatus.mutate({ id: investmentId, status: newStatus });
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados financeiros serão exportados em breve.",
    });
  };

  const getFinancialStats = () => {
    if (!investments.length) return {
      totalCaptado: 0,
      investimentosPendentes: 0,
      valorPendente: 0,
      valorAprovado: 0,
      valorPago: 0
    };

    const totalCaptado = investments
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    const investimentosPendentes = investments.filter(inv => inv.status === 'pending').length;
    
    const valorPendente = investments
      .filter(inv => inv.status === 'pending')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    const valorAprovado = investments
      .filter(inv => inv.status === 'approved')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    const valorPago = investments
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    return {
      totalCaptado,
      investimentosPendentes,
      valorPendente,
      valorAprovado,
      valorPago
    };
  };

  const filteredInvestments = investments.filter(investment => {
    return statusFilter === "all" || investment.status === statusFilter;
  });

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">Erro ao carregar dados financeiros</p>
            <p className="text-gray-500">{error.message}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const financialStats = getFinancialStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
            <p className="text-gray-600">Controle de investimentos e pagamentos</p>
          </div>
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
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
                <span className="text-green-600">Investimentos pagos</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Aprovado</p>
                  <p className="text-2xl font-bold">
                    R$ {(financialStats.valorAprovado / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Aguardando pagamento
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
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold">
                    R$ {((financialStats.totalCaptado + financialStats.valorAprovado + financialStats.valorPendente) / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Todos os investimentos
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtrar Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="analysis">Análise</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Investimentos Recentes ({filteredInvestments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Carregando investimentos...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investidor</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvestments.map((investment) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{investment.investors?.full_name || 'Nome não informado'}</p>
                            <p className="text-sm text-gray-500">{investment.investors?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          R$ {Number(investment.amount).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>{getStatusBadge(investment.status)}</TableCell>
                        <TableCell>{investment.investment_type || 'Equity'}</TableCell>
                        <TableCell>
                          {new Date(investment.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Select 
                              value={investment.status} 
                              onValueChange={(value) => handleStatusChange(investment.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="analysis">Análise</SelectItem>
                                <SelectItem value="approved">Aprovado</SelectItem>
                                <SelectItem value="rejected">Rejeitado</SelectItem>
                                <SelectItem value="paid">Pago</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInvestments.length === 0 && !isLoading && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Nenhum investimento encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Necessárias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialStats.investimentosPendentes > 0 && (
                  <div className="flex items-center justify-between p-4 border-l-4 border-yellow-400 bg-yellow-50">
                    <div>
                      <p className="font-medium">Investimentos Pendentes</p>
                      <p className="text-sm text-gray-600">
                        {financialStats.investimentosPendentes} investimentos aguardando análise
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Revisar
                    </Button>
                  </div>
                )}

                {financialStats.valorAprovado > 0 && (
                  <div className="flex items-center justify-between p-4 border-l-4 border-blue-400 bg-blue-50">
                    <div>
                      <p className="font-medium">Pagamentos Pendentes</p>
                      <p className="text-sm text-gray-600">
                        R$ {financialStats.valorAprovado.toLocaleString('pt-BR')} para processar
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Processar
                    </Button>
                  </div>
                )}

                {investments.length === 0 && (
                  <div className="flex items-center justify-between p-4 border-l-4 border-gray-400 bg-gray-50">
                    <div>
                      <p className="font-medium">Nenhum Investimento</p>
                      <p className="text-sm text-gray-600">Aguardando primeiros investimentos</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Estratégia
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Pendentes</p>
                    <p className="text-sm text-gray-600">
                      {investments.filter(i => i.status === 'pending').length} investimentos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">
                      R$ {(investments.filter(i => i.status === 'pending').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Pagos</p>
                    <p className="text-sm text-gray-600">
                      {investments.filter(i => i.status === 'paid').length} investimentos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      R$ {(investments.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Aprovados</p>
                    <p className="text-sm text-gray-600">
                      {investments.filter(i => i.status === 'approved').length} investimentos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      R$ {(investments.filter(i => i.status === 'approved').reduce((sum, i) => sum + Number(i.amount), 0) / 1000).toFixed(0)}K
                    </p>
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

export default FinancialManagement;
