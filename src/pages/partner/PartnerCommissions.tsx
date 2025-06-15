
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign,
  ArrowLeft,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PartnerCommissions = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  
  // Mock data - em produção virá da API
  const commissions = [
    {
      id: 1,
      investor_name: "João Silva",
      type: "inicial",
      amount: 500.00,
      investment_amount: 10000.00,
      rate: 5,
      date: "2024-01-15",
      status: "pago"
    },
    {
      id: 2,
      investor_name: "Maria Santos",
      type: "recorrente",
      amount: 75.00,
      investment_amount: 3000.00,
      rate: 2.5,
      date: "2024-01-20",
      status: "pendente"
    },
    {
      id: 3,
      investor_name: "Carlos Oliveira",
      type: "inicial",
      amount: 250.00,
      investment_amount: 5000.00,
      rate: 5,
      date: "2024-01-25",
      status: "pago"
    }
  ];

  const totalPaid = commissions.filter(c => c.status === 'pago').reduce((acc, c) => acc + c.amount, 0);
  const totalPending = commissions.filter(c => c.status === 'pendente').reduce((acc, c) => acc + c.amount, 0);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'pago') {
      return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
    } else if (status === 'pendente') {
      return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    if (type === 'inicial') {
      return <Badge className="bg-blue-100 text-blue-800">Inicial</Badge>;
    } else if (type === 'recorrente') {
      return <Badge className="bg-purple-100 text-purple-800">Recorrente</Badge>;
    }
    return <Badge variant="outline">{type}</Badge>;
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
            <Button 
              variant="ghost" 
              onClick={() => navigate('/partner/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Histórico de Comissões
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
            Suas Comissões
          </h2>
          <p className="text-gray-600">
            Acompanhe o histórico completo das suas comissões por indicação.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalPaid.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendente</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                R$ {totalPending.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                R$ {(totalPaid + totalPending).toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico Detalhado</CardTitle>
            <CardDescription>
              Lista completa de todas as suas comissões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{commission.investor_name}</h3>
                      {getTypeBadge(commission.type)}
                      {getStatusBadge(commission.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Investimento: R$ {commission.investment_amount.toLocaleString('pt-BR')}</div>
                      <div>Taxa: {commission.rate}%</div>
                      <div>Data: {new Date(commission.date).toLocaleDateString('pt-BR')}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {commission.amount.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {commissions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma comissão ainda</h3>
                <p>Suas comissões aparecerão aqui assim que você fizer suas primeiras indicações.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerCommissions;
