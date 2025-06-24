import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { Tables } from "@/integrations/supabase/types";

type ReferralProgram = Tables<"referral_programs">;

interface ReferralProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program?: ReferralProgram | null;
}

export const ReferralProgramModal = ({ isOpen, onClose, program }: ReferralProgramModalProps) => {
  const { createProgram, updateProgram, isCreating, isUpdating } = useReferralPrograms();
  
  const [formData, setFormData] = useState({
    name: program?.name || "",
    description: program?.description || "",
    bonus_amount: program?.bonus_amount || 1000,
    target_rides: program?.target_rides || 400,
    is_active: program?.is_active || false,
    expires_at: program?.expires_at ? new Date(program.expires_at).toISOString().split('T')[0] : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const programData = {
      ...formData,
      expires_at: formData.expires_at || null,
    };

    if (program) {
      updateProgram({ id: program.id, updates: programData });
    } else {
      createProgram(programData);
    }
    onClose();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {program ? "Editar Programa" : "Novo Programa de Indicação"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Programa</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Programa Motorista Parceiro"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o programa de indicação..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bonus_amount">Valor do Bônus (R$)</Label>
              <Input
                id="bonus_amount"
                type="number"
                value={formData.bonus_amount}
                onChange={(e) => setFormData({ ...formData, bonus_amount: Number(e.target.value) })}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="target_rides">Meta de Corridas</Label>
              <Input
                id="target_rides"
                type="number"
                value={formData.target_rides}
                onChange={(e) => setFormData({ ...formData, target_rides: Number(e.target.value) })}
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expires_at">Data de Expiração (opcional)</Label>
            <Input
              id="expires_at"
              type="date"
              value={formData.expires_at}
              onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active">Programa Ativo</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : (program ? "Atualizar" : "Criar")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};