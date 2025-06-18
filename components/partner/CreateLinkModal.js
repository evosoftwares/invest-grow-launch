var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { usePartnerLinkMutations } from "@/hooks/usePartnerLinks";
export const CreateLinkModal = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createPartnerLink } = usePartnerLinkMutations();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }
        setIsSubmitting(true);
        try {
            yield createPartnerLink.mutateAsync({
                name: name.trim(),
                description: description.trim() || undefined,
            });
            // Limpar o formulário e fechar modal
            setName("");
            setDescription("");
            setOpen(false);
        }
        catch (error) {
            console.error('Error creating link:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Novo Link"] }) }), _jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Criar Novo Link de Indica\u00E7\u00E3o" }), _jsx(DialogDescription, { children: "Crie um link personalizado para suas indica\u00E7\u00F5es. O c\u00F3digo ser\u00E1 gerado automaticamente." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Nome do Link *" }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Ex: Link Principal, Redes Sociais...", required: true })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Descri\u00E7\u00E3o (opcional)" }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Descri\u00E7\u00E3o ou notas sobre este link...", rows: 3 })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), disabled: isSubmitting, children: "Cancelar" }), _jsx(Button, { type: "submit", disabled: !name.trim() || isSubmitting, children: isSubmitting ? "Criando..." : "Criar Link" })] })] }) })] }));
};
