
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useInvestmentApprovals } from '@/hooks/useInvestmentApprovals';

interface InvestmentApprovalActionsProps {
  investmentId: string;
  currentStatus: string;
}

export const InvestmentApprovalActions = ({ investmentId, currentStatus }: InvestmentApprovalActionsProps) => {
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  
  const { approveInvestment, rejectInvestment, isApproving, isRejecting } = useInvestmentApprovals();

  const handleApproval = () => {
    approveInvestment({ investmentId, notes: approvalNotes });
    setApprovalDialogOpen(false);
    setApprovalNotes('');
  };

  const handleRejection = () => {
    if (!rejectionNotes.trim()) {
      return;
    }
    rejectInvestment({ investmentId, notes: rejectionNotes });
    setRejectionDialogOpen(false);
    setRejectionNotes('');
  };

  if (currentStatus !== 'pending') {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50"
            disabled={isApproving}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Aprovar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar Investimento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja aprovar este investimento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approval-notes">Observações (opcional)</Label>
              <Textarea
                id="approval-notes"
                placeholder="Adicione observações sobre a aprovação..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleApproval} disabled={isApproving}>
              {isApproving ? 'Aprovando...' : 'Aprovar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
            disabled={isRejecting}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Rejeitar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Investimento</DialogTitle>
            <DialogDescription>
              Por favor, informe o motivo da rejeição. Esta informação será registrada no sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-notes">Motivo da rejeição *</Label>
              <Textarea
                id="rejection-notes"
                placeholder="Explique o motivo da rejeição..."
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRejection} 
              disabled={isRejecting || !rejectionNotes.trim()}
              variant="destructive"
            >
              {isRejecting ? 'Rejeitando...' : 'Rejeitar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
