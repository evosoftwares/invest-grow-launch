import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Users, User, Mail, Phone, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const PartnerRegistration = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        partnerType: "",
        experience: "",
        audience: "",
        platforms: "",
        comments: ""
    });
    const { toast } = useToast();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Partner registration submitted:", formData);
        // Simulate unique link generation
        const uniqueLink = `https://futuropdv.com/invest?ref=${Date.now().toString(36)}`;
        toast({
            title: "Cadastro realizado com sucesso!",
            description: `Seu link exclusivo: ${uniqueLink}`,
        });
        onClose();
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsxs(CardHeader, { className: "relative", children: [_jsx("button", { onClick: onClose, className: "absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs(CardTitle, { className: "text-2xl font-bold text-slate-900 flex items-center", children: [_jsx(Users, { className: "mr-2 w-6 h-6 text-blue-600" }), "Cadastro de Parceiro"] }), _jsx(CardDescription, { children: "Torne-se um parceiro e ganhe comiss\u00F5es por cada investidor indicado" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "bg-[#B8FAFF]/20 p-4 rounded-lg mb-6", children: [_jsxs("h3", { className: "font-semibold text-slate-900 mb-2 flex items-center", children: [_jsx(Share2, { className: "mr-2 w-5 h-5 text-blue-600" }), "Estrutura de Comiss\u00F5es"] }), _jsxs("ul", { className: "text-sm text-slate-700 space-y-1", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "5%" }), " sobre o primeiro investimento"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "2,5% - 3%" }), " sobre novos aportes"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "1,5% - 2%" }), " mensalmente sobre o saldo investido"] })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "name", className: "flex items-center", children: [_jsx(User, { className: "mr-2 w-4 h-4" }), "Nome Completo"] }), _jsx(Input, { id: "name", value: formData.name, onChange: (e) => handleInputChange("name", e.target.value), placeholder: "Seu nome completo", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "email", className: "flex items-center", children: [_jsx(Mail, { className: "mr-2 w-4 h-4" }), "Email"] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange("email", e.target.value), placeholder: "seu@email.com", required: true })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "phone", className: "flex items-center", children: [_jsx(Phone, { className: "mr-2 w-4 h-4" }), "Telefone"] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: (e) => handleInputChange("phone", e.target.value), placeholder: "(11) 99999-9999", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "partnerType", children: "Tipo de Parceiro" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("partnerType", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o tipo" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "influencer", children: "Influenciador Digital" }), _jsx(SelectItem, { value: "consultant", children: "Consultor Financeiro" }), _jsx(SelectItem, { value: "broker", children: "Corretor de Investimentos" }), _jsx(SelectItem, { value: "entrepreneur", children: "Empreendedor" }), _jsx(SelectItem, { value: "other", children: "Outro" })] })] })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "audience", children: "Tamanho da Audi\u00EAncia" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("audience", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o tamanho" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "0-1000", children: "0 - 1.000" }), _jsx(SelectItem, { value: "1000-10000", children: "1.000 - 10.000" }), _jsx(SelectItem, { value: "10000-50000", children: "10.000 - 50.000" }), _jsx(SelectItem, { value: "50000-100000", children: "50.000 - 100.000" }), _jsx(SelectItem, { value: "100000+", children: "100.000+" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "experience", children: "Experi\u00EAncia com Investimentos" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("experience", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione a experi\u00EAncia" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "beginner", children: "Iniciante" }), _jsx(SelectItem, { value: "intermediate", children: "Intermedi\u00E1rio" }), _jsx(SelectItem, { value: "advanced", children: "Avan\u00E7ado" }), _jsx(SelectItem, { value: "professional", children: "Profissional" })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "platforms", children: "Principais Plataformas" }), _jsx(Input, { id: "platforms", value: formData.platforms, onChange: (e) => handleInputChange("platforms", e.target.value), placeholder: "Ex: Instagram, LinkedIn, YouTube, WhatsApp..." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "comments", children: "Como pretende divulgar?" }), _jsx(Textarea, { id: "comments", value: formData.comments, onChange: (e) => handleInputChange("comments", e.target.value), placeholder: "Descreva sua estrat\u00E9gia de divulga\u00E7\u00E3o...", rows: 3 })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { type: "submit", className: "flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white", children: "Gerar Link Exclusivo" }), _jsx(Button, { type: "button", variant: "outline", onClick: onClose, className: "px-8", children: "Cancelar" })] })] })] })] }) }));
};
