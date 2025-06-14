
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, TrendingUp, DollarSign } from "lucide-react";
import { Partner } from "@/hooks/usePartners";

interface PartnerStatsCardsProps {
  partners: Partner[];
}

export const PartnerStatsCards = ({ partners }: PartnerStatsCardsProps) => {
  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'active').length,
    pendingPartners: partners.filter(p => p.status === 'pending').length,
    avgCommissionRate: partners.length > 0 
      ? partners.reduce((sum, p) => sum + Number(p.commission_rate), 0) / partners.length 
      : 0
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{totalStats.totalPartners}</div>
              <div className="text-sm text-gray-600">Total Parceiros</div>
            </div>
            <UserPlus className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{totalStats.activePartners}</div>
              <div className="text-sm text-gray-600">Parceiros Ativos</div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{totalStats.pendingPartners}</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {totalStats.avgCommissionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Comissão Média</div>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
