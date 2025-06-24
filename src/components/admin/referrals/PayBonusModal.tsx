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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type DriverReferral = Tables<"driver_referrals">;

interface PayBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: DriverReferral | null;
  onSuccess: () => void;
}

export const PayBonusModal = ({ isOpen, onClose, referral, onSuccess }: PayBonusModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: referral?.bonus_amount || 0,
    bonus_type: "referral_bonus" as const,
    payment_reference: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referral) return;

    setIsLoading(true);
    try {
      // Create bonus record
      const { error: bonusError } = await supabase
        .from("referral_bonuses")
        .insert({
          referral_id: referral.id,
          amount: formData.amount,
          bonus_type: formData.bonus_type,
          payment_reference: formData.payment_reference,
          notes: formData.notes,
          paid_at: new Date().toISOString(),
        });

      if (bonusError) throw bonusError;

      // Update referral with bonus payment info
      const { error: referralError } = await supabase
        .from("driver_referrals")
        .update({
          bonus_paid_at: new Date().toISOString(),
        })
        .eq("id", referral.id);

      if (referralError) throw referralError;

      toast.success("Bônus pago com sucesso!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erro ao pagar bônus: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!referral) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagar Bônus de Indicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Detalhes da Indicação</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Código:</strong> {referral.referral_code}</div>
              <div><strong>Corridas Completadas:</strong> {referral.rides_completed}/{referral.target_rides}</div>
              <div><strong>Status:</strong> {referral.status}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Valor do Bônus</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                min="0"
                step="0.01"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Valor sugerido: {formatCurrency(referral.bonus_amount || 0)}
              </p>
            </div>

            <div>
              <Label htmlFor="bonus_type">Tipo de Bônus</Label>
              <Select 
                value={formData.bonus_type} 
                onValueChange={(value) => setFormData({ ...formData, bonus_type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="referral_bonus">Bônus de Indicação</SelectItem>
                  <SelectItem value="milestone_bonus">Bônus de Meta</SelectItem>
                  <SelectItem value="completion_bonus">Bônus de Conclusão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payment_reference">Referência do Pagamento</Label>
              <Input
                id="payment_reference"
                value={formData.payment_reference}
                onChange={(e) => setFormData({ ...formData, payment_reference: e.target.value })}
                placeholder="Número da transferência, PIX, etc."
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Observações sobre o pagamento..."
              />
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
                {isLoading ? "Processando..." : "Confirmar Pagamento"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};