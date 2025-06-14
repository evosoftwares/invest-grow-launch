
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  Clock, 
  CheckCircle, 
  Download,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const PartnerCommissions = () => {
  const [periodFilter, setPeriodFilter] = useState("all");

  // Mock data - em produção viria de uma API
  const commissionStats = {
    totalRecebido: 42500,
    pendente: 5000,
    proximoPagamento: "2024-01-25",
    totalIndicacoes: 15
  };

  const commissions = [
    {
      id: 1,
      investor: "João Silva",
      investmentAmount: 50000,
      commissionAmount: 2500,
      status: "paid",
      paymentDate: "2024-01-20",
      investmentDate: "2024-01-15",
      paymentMethod: "PIX"
    },
    {
      id: 2,
      investor: "Carlos Oliveira",
      investmentAmount: 25000,
      commissionAmount: 1250,
      status: "paid",
      paymentDate: "2024-01-18",
      investmentDate: "2024-01-13",
      paymentMethod: "TED"
    },
    {
      id: 3,
      investor: "Ana Costa",
      investmentAmount: 75000,
      commissionAmount: 3750,
      status: "pending",
      paymentDate: "2024-01-25",
      investmentDate: "2024-01-12",
      paymentMethod: "PIX"
    },
    {
      id: 4,
      investor: "Maria Santos",
      investmentAmount: 100000,
      commissionAmount: 5000,
      status: "processing",
      paymentDate: "2024-01-25",
      investmentDate: "2024-01-14",
      paymentMethod: "PIX"
    },
    {
      id: 5,
      investor: "Pedro Lima",
      investmentAmount: 30000,
      commissionAmount: 1500,
      status: "paid",
      paymentDate: "2024-01-15",
      investmentDate: "2024-01-10",
      paymentMethod: "PIX"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      paid: { label: "Pago", color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      processing: { label: "Processando", color: "bg-blue-100 text-blue-800", icon: Clock }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    const Icon = statusInfo.icon;
    
    return (
      <Badge className={statusInfo.color}>
        <Icon className="w-3 h-3 mr-1" />
        {statusInfo.label}
      </Badge>
    );
  };

  const filteredCommissions = commissions.filter(commission => {
    if (periodFilter === "all") return true;
    if (periodFilter === "paid") return commission.status === "paid";
    if (periodFilter === "pending") return commission.status === "pending" || commission.status === "processing";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
                alt="Futuro PDV" 
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold">Minhas Comissões</h1>
                <p className="text-sm text-gray-600">Histórico e pagamentos de comissões</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Link to="/partner/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Recebido</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {(commissionStats.totalRecebido / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  De {commissionStats.totalIndicacoes} indicações
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendente</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      R$ {(commissionStats.pendente / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  A receber em breve
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próximo Pagamento</p>
                    <p className="text-2xl font-bold text-blue-600">25/01</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Segunda-feira
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa Média</p>
                    <p className="text-2xl font-bold text-purple-600">5%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Por indicação confirmada
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Comissões</SelectItem>
                    <SelectItem value="paid">Pagas</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Commissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Comissões ({filteredCommissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investidor</TableHead>
                      <TableHead>Valor Investido</TableHead>
                      <TableHead>Comissão</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Investimento</TableHead>
                      <TableHead>Data Pagamento</TableHead>
                      <TableHead>Método</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell className="font-medium">{commission.investor}</TableCell>
                        <TableCell>
                          R$ {commission.investmentAmount.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          R$ {commission.commissionAmount.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>{getStatusBadge(commission.status)}</TableCell>
                        <TableCell>{commission.investmentDate}</TableCell>
                        <TableCell>
                          {commission.status === 'paid' ? commission.paymentDate : commission.paymentDate}
                        </TableCell>
                        <TableCell>{commission.paymentMethod}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-medium">Próximo Pagamento</p>
                    <p className="text-sm text-gray-600">25 de Janeiro de 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">R$ 8.750</p>
                    <p className="text-sm text-gray-600">2 comissões pendentes</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium mb-2">✅ Como Funcionam os Pagamentos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pagamentos realizados toda segunda-feira</li>
                      <li>• Comissões pagas após confirmação do investimento</li>
                      <li>• Prazo de 5 dias úteis para processamento</li>
                      <li>• Pagamento via PIX ou TED</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium mb-2">📊 Sua Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Taxa de comissão:</span>
                        <span className="font-semibold">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total de indicações:</span>
                        <span className="font-semibold">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de conversão:</span>
                        <span className="font-semibold">18.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ticket médio:</span>
                        <span className="font-semibold">R$ 56.667</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerCommissions;
