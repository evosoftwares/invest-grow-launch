import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import { useInvestmentApprovals } from '@/hooks/useInvestmentApprovals';
export const InvestmentApprovalActions = ({ investmentId, currentStatus }) => {
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
    return (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Dialog, { open: approvalDialogOpen, onOpenChange: setApprovalDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", variant: "outline", className: "text-green-600 border-green-200 hover:bg-green-50", disabled: isApproving, children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-1" }), "Aprovar"] }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Aprovar Investimento" }), _jsx(DialogDescription, { children: "Tem certeza que deseja aprovar este investimento? Esta a\u00E7\u00E3o n\u00E3o pode ser desfeita." })] }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "approval-notes", children: "Observa\u00E7\u00F5es (opcional)" }), _jsx(Textarea, { id: "approval-notes", placeholder: "Adicione observa\u00E7\u00F5es sobre a aprova\u00E7\u00E3o...", value: approvalNotes, onChange: (e) => setApprovalNotes(e.target.value) })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setApprovalDialogOpen(false), children: "Cancelar" }), _jsx(Button, { onClick: handleApproval, disabled: isApproving, children: isApproving ? 'Aprovando...' : 'Aprovar' })] })] })] }), _jsxs(Dialog, { open: rejectionDialogOpen, onOpenChange: setRejectionDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", variant: "outline", className: "text-red-600 border-red-200 hover:bg-red-50", disabled: isRejecting, children: [_jsx(XCircle, { className: "w-4 h-4 mr-1" }), "Rejeitar"] }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Rejeitar Investimento" }), _jsx(DialogDescription, { children: "Por favor, informe o motivo da rejei\u00E7\u00E3o. Esta informa\u00E7\u00E3o ser\u00E1 registrada no sistema." })] }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "rejection-notes", children: "Motivo da rejei\u00E7\u00E3o *" }), _jsx(Textarea, { id: "rejection-notes", placeholder: "Explique o motivo da rejei\u00E7\u00E3o...", value: rejectionNotes, onChange: (e) => setRejectionNotes(e.target.value), required: true })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setRejectionDialogOpen(false), children: "Cancelar" }), _jsx(Button, { onClick: handleRejection, disabled: isRejecting || !rejectionNotes.trim(), variant: "destructive", children: isRejecting ? 'Rejeitando...' : 'Rejeitar' })] })] })] })] }));
};
