import { Card, CardContent } from "@/components/ui/card";
import { useReferralStats } from "@/hooks/useReferralStats";

export const MobileReferralStatsCards = () => {
  const { stats, isLoading } = useReferralStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
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
    <div className="grid grid-cols-3 gap-3">
      <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="p-3 text-center">
          <p className="text-lg font-light text-blue-500">{stats?.totalReferrals || 0}</p>
          <p className="text-xs text-slate-500">Total</p>
        </CardContent>
      </Card>
      
      <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="p-3 text-center">
          <p className="text-lg font-light text-green-500">{stats?.completedReferrals || 0}</p>
          <p className="text-xs text-slate-500">Concluídas</p>
        </CardContent>
      </Card>
      
      <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="p-3 text-center">
          <p className="text-sm font-light text-blue-600">
            {formatCurrency(stats?.totalBonusPaid || 0)}
          </p>
          <p className="text-xs text-slate-500">Ganhos</p>
        </CardContent>
      </Card>
    </div>
  );
};