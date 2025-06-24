import { Card, CardContent } from "@/components/ui/card";
import { Gift, Users, TrendingUp, DollarSign, Clock, Trophy } from "lucide-react";
import { useReferralStats } from "@/hooks/useReferralStats";

export const ReferralStatsCards = () => {
  const { stats, isLoading } = useReferralStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats?.totalReferrals || 0}</div>
              <div className="text-sm text-gray-600">Total Indicações</div>
            </div>
            <Gift className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats?.activeReferrals || 0}</div>
              <div className="text-sm text-gray-600">Ativas</div>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats?.completedReferrals || 0}</div>
              <div className="text-sm text-gray-600">Concluídas</div>
            </div>
            <Trophy className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats?.pendingReferrals || 0}</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats?.totalBonusPaid || 0)}
              </div>
              <div className="text-sm text-gray-600">Bônus Pagos</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {stats?.conversionRate || 0}%
              </div>
              <div className="text-sm text-gray-600">Taxa Conversão</div>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};