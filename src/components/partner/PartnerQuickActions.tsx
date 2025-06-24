
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, ExternalLink, DollarSign, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PartnerQuickActionsProps {
  partnerId: string | null;
}

const PartnerQuickActions = ({ partnerId }: PartnerQuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>
          Gerencie seus investidores e acompanhe o desempenho
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={() => navigate('/partner/investors/new')}
          className="w-full justify-start"
          variant="default"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Cadastrar Novo Investidor
        </Button>
        
        <Button 
          onClick={() => navigate('/partner/investors')}
          className="w-full justify-start"
          variant="outline"
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver Meus Investidores
        </Button>
        
        <Button 
          onClick={() => navigate('/mobile/referrals')}
          className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
          variant="default"
        >
          <Gift className="mr-2 h-4 w-4" />
          Programa de Indicações
        </Button>
        
        <Button 
          onClick={() => navigate('/partner/links')}
          className="w-full justify-start"
          variant="outline"
          disabled={!partnerId}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Gerenciar Links de Indicação
        </Button>
        
        <Button 
          onClick={() => navigate('/partner/commissions')}
          className="w-full justify-start"
          variant="outline"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Ver Histórico de Comissões
        </Button>
      </CardContent>
    </Card>
  );
};

export default PartnerQuickActions;
