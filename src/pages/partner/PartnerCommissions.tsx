
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign,
  ArrowLeft,
  Calendar,
  TrendingUp,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePartnerCommissions } from "@/hooks/usePartnerCommissions";

const PartnerCommissions = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  const { data: commissions = [], isLoading, error } = usePartnerCommissions();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  // Calcular totais
  const totalPaid = commissions
    .filter(c => c.paid_at !== null)
    .reduce((acc, c) => acc + Number(c.amount), 0);
  
  const totalPending = commissions
    .filter(c => c.paid_at === null)
    .reduce((acc, c) => acc + Number(c.amount), 0);

  const getStatusBadge = (paidAt: string | null) => {
    if (paidAt) {
      return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
    }
  };

  const getTypeBadge = (rate: number) => {
    if (rate === 5.0) {
      return <Badge className="bg-blue-100 text-blue-800">Inicial</Badge>;
    } else {
      return <Badge className="bg-purple-100 text-purple-800">Recorrente</Badge>;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <h3 className="text-lg font-semibold mb-2">Erro ao carregar comissões</h3>
              <p className="text-sm">{error.message}</p>
            </div>
          </CardContent>
        </Card>
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
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  `R$ ${totalPaid.toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}`
                )}
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
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  `R$ ${totalPending.toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}`
                )}
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
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  `R$ ${(totalPaid + totalPending).toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}`
                )}
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
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">
                          {commission.investments?.investors?.full_name || 'Investidor'}
                        </h3>
                        {getTypeBadge(Number(commission.rate))}
                        {getStatusBadge(commission.paid_at)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>
                          Investimento: R$ {Number(commission.investments?.amount || 0).toLocaleString('pt-BR', { 
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2 
                          })}
                        </div>
                        <div>Taxa: {Number(commission.rate)}%</div>
                        <div>
                          Data: {new Date(commission.calculated_at).toLocaleDateString('pt-BR')}
                        </div>
                        {commission.paid_at && (
                          <div>
                            Pago em: {new Date(commission.paid_at).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        R$ {Number(commission.amount).toLocaleString('pt-BR', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2 
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {commissions.length === 0 && !isLoading && (
                  <div className="text-center py-12 text-gray-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma comissão ainda</h3>
                    <p>Suas comissões aparecerão aqui assim que você fizer suas primeiras indicações.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerCommissions;
