
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp } from "lucide-react";

interface PartnerStatsCardsProps {
  stats: {
    totalInvestors: number;
    activeInvestors: number;
    totalCommissions: number;
    paidCommissions: number;
    pendingCommissions: number;
    conversionRate: number;
    approvedInvestments: number;
  };
}

const PartnerStatsCards = ({ stats }: PartnerStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Investidores</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInvestors}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeInvestors} investiram efetivamente
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
            R$ {stats.paidCommissions.toLocaleString('pt-BR')} já recebidas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comissões Pendentes</CardTitle>
          <DollarSign className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">R$ {stats.pendingCommissions.toLocaleString('pt-BR')}</div>
          <p className="text-xs text-muted-foreground">
            Aguardando pagamento
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
            De {stats.totalInvestors} leads para {stats.activeInvestors} investidores
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerStatsCards;
