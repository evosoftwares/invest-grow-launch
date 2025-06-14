
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Link as LinkIcon,
  Eye,
  Share
} from "lucide-react";
import { Link } from "react-router-dom";

const PartnerDashboard = () => {
  // Mock data - em produção viria de uma API
  const partnerStats = {
    totalIndicacoes: 15,
    totalCaptado: 850000,
    comissaoTotal: 42500,
    comissaoPendente: 5000,
    taxaConversao: 18.5,
    rankingPosicao: 1
  };

  const recentIndicacoes = [
    {
      id: 1,
      investor: "João Silva",
      amount: 50000,
      status: "confirmed",
      commission: 2500,
      date: "2024-01-15"
    },
    {
      id: 2,
      investor: "Maria Santos",
      amount: 100000,
      status: "pending",
      commission: 5000,
      date: "2024-01-14"
    },
    {
      id: 3,
      investor: "Carlos Oliveira",
      amount: 25000,
      status: "confirmed",
      commission: 1250,
      date: "2024-01-13"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      confirmed: { label: "Confirmado", color: "bg-green-100 text-green-800" },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      analysis: { label: "Análise", color: "bg-blue-100 text-blue-800" },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

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
                <h1 className="text-xl font-semibold">Dashboard do Parceiro</h1>
                <p className="text-sm text-gray-600">Bem-vindo, Carlos Vendedor</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to="/partner/links">
                <Button variant="outline">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Meus Links
                </Button>
              </Link>
              <Link to="/partner/commissions">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Comissões
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Indicações</p>
                    <p className="text-2xl font-bold">{partnerStats.totalIndicacoes}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Taxa de conversão: {partnerStats.taxaConversao}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Captado</p>
                    <p className="text-2xl font-bold">
                      R$ {(partnerStats.totalCaptado / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600">
                  ↗ +12.5% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Comissão Recebida</p>
                    <p className="text-2xl font-bold">
                      R$ {(partnerStats.comissaoTotal / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Última comissão: R$ 2.500
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Comissão Pendente</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      R$ {(partnerStats.comissaoPendente / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  A receber em 5 dias
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ranking and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sua Posição no Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">#{partnerStats.rankingPosicao}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">🏆 1º Lugar</h3>
                  <p className="text-gray-600 mb-4">
                    Parabéns! Você está em primeiro lugar no ranking de parceiros deste mês.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">15</div>
                      <div className="text-gray-600">Indicações</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">R$ 850K</div>
                      <div className="text-gray-600">Captado</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/partner/links">
                    <Button variant="outline" className="w-full justify-start">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Gerar novo link de indicação
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Compartilhar material de divulgação
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver ranking completo
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Histórico de comissões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Indicações */}
          <Card>
            <CardHeader>
              <CardTitle>Indicações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIndicacoes.map((indicacao) => (
                  <div key={indicacao.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{indicacao.investor}</p>
                        <p className="text-sm text-gray-500">{indicacao.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R$ {indicacao.amount.toLocaleString('pt-BR')}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(indicacao.status)}
                        <span className="text-sm text-green-600">
                          +R$ {indicacao.commission.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
