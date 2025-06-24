import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { Trophy, Target, Calendar, Gift } from "lucide-react";

interface MobileProgramOverviewProps {
  onGenerateCode?: () => void;
}

export const MobileProgramOverview = ({ onGenerateCode }: MobileProgramOverviewProps) => {
  const { activeProgram, isLoading } = useReferralPrograms();

  if (isLoading) {
    return (
      <Card className="border-slate-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activeProgram) {
    return (
      <Card className="border-slate-200 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4 text-center">
          <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h3 className="font-medium text-slate-800 mb-2">
            Nenhum programa ativo
          </h3>
          <p className="text-sm text-slate-600">
            Aguarde um programa de indicações ser ativado pelo administrador.
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="border-slate-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-slate-800">{activeProgram.name}</h3>
          </div>
          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
        </div>

        {activeProgram.description && (
          <p className="text-sm text-slate-600 mb-4">{activeProgram.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-slate-500">Bônus</p>
              <p className="font-medium text-green-600">
                {formatCurrency(activeProgram.bonus_amount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Meta</p>
              <p className="font-medium text-slate-700">
                {activeProgram.target_rides} corridas
              </p>
            </div>
          </div>
        </div>

        {activeProgram.expires_at && (
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-orange-600" />
            <div>
              <p className="text-xs text-slate-500">Expira em</p>
              <p className="text-sm font-medium text-slate-700">
                {formatDate(activeProgram.expires_at)}
              </p>
            </div>
          </div>
        )}

        {onGenerateCode && (
          <Button 
            onClick={onGenerateCode}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            🔗 Gerar Código de Indicação
          </Button>
        )}
      </CardContent>
    </Card>
  );
};