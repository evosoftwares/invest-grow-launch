import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, TrendingUp, Users } from "lucide-react";
import { ReferralStatsCards } from "@/components/admin/referrals/ReferralStatsCards";
import { ReferralTable } from "@/components/admin/referrals/ReferralTable";
import { ReferralProgramModal } from "@/components/admin/referrals/ReferralProgramModal";
import { PayBonusModal } from "@/components/admin/referrals/PayBonusModal";
import { ReferralDetailsModal } from "@/components/admin/referrals/ReferralDetailsModal";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { useDriverReferrals } from "@/hooks/useDriverReferrals";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;
type ReferralProgram = Tables<"referral_programs">;

export const DriverReferralManagement = () => {
  const { activeProgram, programs, activateProgram, deleteProgram } = useReferralPrograms();
  const { referrals } = useDriverReferrals();
  
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isPayBonusModalOpen, setIsPayBonusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ReferralProgram | null>(null);
  const [selectedReferral, setSelectedReferral] = useState<DriverReferral | null>(null);

  const handleEditProgram = (program: ReferralProgram) => {
    setSelectedProgram(program);
    setIsProgramModalOpen(true);
  };

  const handleViewDetails = (referral: DriverReferral) => {
    setSelectedReferral(referral);
    setIsDetailsModalOpen(true);
  };

  const handlePayBonus = (referral: DriverReferral) => {
    setSelectedReferral(referral);
    setIsPayBonusModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsProgramModalOpen(false);
    setIsPayBonusModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedProgram(null);
    setSelectedReferral(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programa de Indicações</h1>
          <p className="text-gray-600">Gerencie o programa de indicação de motoristas</p>
        </div>
        <Button 
          onClick={() => setIsProgramModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Programa
        </Button>
      </div>

      {/* Active Program Card */}
      {activeProgram && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-blue-900">Programa Ativo</CardTitle>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditProgram(activeProgram)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-blue-600">Nome</div>
                <div className="font-medium">{activeProgram.name}</div>
              </div>
              <div>
                <div className="text-sm text-blue-600">Valor do Bônus</div>
                <div className="font-medium text-green-600">
                  {formatCurrency(activeProgram.bonus_amount)}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-600">Meta de Corridas</div>
                <div className="font-medium">{activeProgram.target_rides} corridas</div>
              </div>
              <div>
                <div className="text-sm text-blue-600">Prazo</div>
                <div className="font-medium">
                  {activeProgram.expires_at 
                    ? new Date(activeProgram.expires_at).toLocaleDateString('pt-BR')
                    : "Em aberto"
                  }
                </div>
              </div>
            </div>
            {activeProgram.description && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="text-sm text-blue-600">Descrição</div>
                <div className="text-sm text-blue-800">{activeProgram.description}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* No Active Program */}
      {!activeProgram && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-yellow-900 mb-2">
                Nenhum programa ativo
              </h3>
              <p className="text-yellow-700 mb-4">
                Configure um programa de indicações para começar a atrair novos motoristas.
              </p>
              <Button 
                onClick={() => setIsProgramModalOpen(true)}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Programa
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <ReferralStatsCards />

      {/* Programs Management */}
      {programs && programs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Programas Configurados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {programs.map((program) => (
                <div 
                  key={program.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{program.name}</h4>
                      <Badge 
                        className={program.is_active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                        }
                      >
                        {program.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 grid grid-cols-3 gap-4">
                      <span>Bônus: {formatCurrency(program.bonus_amount)}</span>
                      <span>Meta: {program.target_rides} corridas</span>
                      <span>
                        Expira: {program.expires_at 
                          ? new Date(program.expires_at).toLocaleDateString('pt-BR')
                          : "Sem prazo"
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!program.is_active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => activateProgram(program.id)}
                      >
                        Ativar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProgram(program)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteProgram(program.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Referrals Table */}
      <ReferralTable 
        onViewDetails={handleViewDetails}
        onPayBonus={handlePayBonus}
      />

      {/* Modals */}
      <ReferralProgramModal
        isOpen={isProgramModalOpen}
        onClose={handleCloseModals}
        program={selectedProgram}
      />

      <PayBonusModal
        isOpen={isPayBonusModalOpen}
        onClose={handleCloseModals}
        referral={selectedReferral}
        onSuccess={() => {
          // Refresh data
          window.location.reload();
        }}
      />

      <ReferralDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModals}
        referral={selectedReferral}
      />
    </div>
  );
};