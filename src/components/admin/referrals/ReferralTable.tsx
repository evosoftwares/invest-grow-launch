import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDriverReferrals } from "@/hooks/useDriverReferrals";
import { ReferralStatusBadge } from "./ReferralStatusBadge";
import { ReferralTableActions } from "./ReferralTableActions";
import { ReferralFilters } from "./ReferralFilters";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

interface ReferralTableProps {
  onViewDetails: (referral: DriverReferral) => void;
  onPayBonus: (referral: DriverReferral) => void;
}

export const ReferralTable = ({ onViewDetails, onPayBonus }: ReferralTableProps) => {
  const { referrals, updateReferral, isLoading } = useDriverReferrals();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const handleStatusChange = (referralId: string, status: string) => {
    updateReferral({ id: referralId, updates: { status } });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Filter referrals
  const filteredReferrals = referrals?.filter(referral => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      referral.referral_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.referrer as any)?.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.referrer as any)?.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.referred as any)?.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.referred as any)?.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;

    // Date filter
    let matchesDate = true;
    if (dateFilter !== "all") {
      const referralDate = new Date(referral.created_at || "");
      const now = new Date();
      
      switch (dateFilter) {
        case "today":
          matchesDate = referralDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = referralDate >= weekAgo;
          break;
        case "month":
          matchesDate = referralDate.getMonth() === now.getMonth() && 
                       referralDate.getFullYear() === now.getFullYear();
          break;
        case "quarter":
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const referralQuarter = Math.floor(referralDate.getMonth() / 3);
          matchesDate = referralQuarter === currentQuarter && 
                       referralDate.getFullYear() === now.getFullYear();
          break;
        case "year":
          matchesDate = referralDate.getFullYear() === now.getFullYear();
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  }) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ReferralFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Indicações ({filteredReferrals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Indicado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Bônus</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>
                      <div className="font-mono font-medium">
                        {referral.referral_code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {(referral.referrer as any)?.business_name || 
                           (referral.referrer as any)?.profiles?.full_name || 
                           'Nome não informado'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(referral.referrer as any)?.profiles?.email || 'Email não informado'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {(referral.referred as any)?.business_name || 
                           (referral.referred as any)?.profiles?.full_name || 
                           'Nome não informado'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(referral.referred as any)?.profiles?.email || 'Email não informado'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ReferralStatusBadge status={referral.status || "pending"} />
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{referral.rides_completed || 0} / {referral.target_rides || 0} corridas</div>
                        {referral.target_rides && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ 
                                width: `${Math.min(100, ((referral.rides_completed || 0) / referral.target_rides) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {referral.bonus_amount ? formatCurrency(referral.bonus_amount) : 'N/A'}
                        </div>
                        {referral.bonus_paid_at && (
                          <Badge variant="outline" className="text-xs mt-1">
                            Pago
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {referral.created_at ? formatDate(referral.created_at) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <ReferralTableActions
                        referral={referral}
                        onStatusChange={handleStatusChange}
                        onViewDetails={onViewDetails}
                        onPayBonus={onPayBonus}
                        isLoading={isLoading}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReferrals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-gray-500">
                        {referrals?.length === 0 
                          ? "Nenhuma indicação encontrada." 
                          : "Nenhuma indicação corresponde aos filtros aplicados."
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};