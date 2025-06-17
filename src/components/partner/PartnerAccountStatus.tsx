import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface PartnerAccountStatusProps {
  partnerId: string | null;
  stats: {
    totalInvestors: number;
    monthlyCommissions: number;
  };
}
const PartnerAccountStatus = ({
  partnerId,
  stats
}: PartnerAccountStatusProps) => {
  return <Card>
      <CardHeader>
        <CardTitle>Status da Conta</CardTitle>
        <CardDescription>
          Informações sobre sua conta de parceiro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge className="bg-green-100 text-green-800">
            {partnerId ? 'Ativo' : 'Configurando'}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Nível:</span>
          <Badge variant="outline">Parceiro Padrão</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Comissão:</span>
          <span className="text-sm font-bold text-right">5% inicial / 2,5% recorrente</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Investidores:</span>
          <span className="text-sm font-bold">{stats.totalInvestors} cadastrados</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Este Mês:</span>
          <span className="text-sm font-bold text-green-600">
            R$ {stats.monthlyCommissions.toLocaleString('pt-BR')}
          </span>
        </div>
      </CardContent>
    </Card>;
};
export default PartnerAccountStatus;