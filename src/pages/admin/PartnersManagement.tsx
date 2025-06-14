
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { usePartners, usePartnerMutations } from "@/hooks/usePartners";
import { PartnerStatsCards } from "@/components/admin/partners/PartnerStatsCards";
import { PartnerFilters } from "@/components/admin/partners/PartnerFilters";
import { PartnersTable } from "@/components/admin/partners/PartnersTable";
import { filterPartners } from "@/utils/partnerFilters";

const PartnersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: partners = [], isLoading } = usePartners();
  const { updatePartnerStatus } = usePartnerMutations();

  const handleStatusChange = (partnerId: string, newStatus: 'pending' | 'active' | 'inactive' | 'blocked') => {
    updatePartnerStatus.mutate({ id: partnerId, status: newStatus });
  };

  const filteredPartners = filterPartners(partners, searchTerm, statusFilter);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Parceiros</h1>
            <p className="text-gray-600">Gerencie parceiros e suas comissões</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Parceiro
          </Button>
        </div>

        <PartnerStatsCards partners={partners} />
        
        <PartnerFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <PartnersTable
          partners={filteredPartners}
          onStatusChange={handleStatusChange}
          isLoading={updatePartnerStatus.isPending}
        />
      </div>
    </AdminLayout>
  );
};

export default PartnersManagement;
