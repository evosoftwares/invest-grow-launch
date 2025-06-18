import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, DollarSign, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const InvestmentForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        investmentAmount: "",
        investorType: "",
        experience: "",
        comments: ""
    });
    const { toast } = useToast();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Investment form submitted:", formData);
        toast({
            title: "Cadastro realizado com sucesso!",
            description: "Entraremos em contato em breve com mais informações sobre o investimento.",
        });
        onClose();
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsxs(CardHeader, { className: "relative", children: [_jsx("button", { onClick: onClose, className: "absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs(CardTitle, { className: "text-2xl font-bold text-slate-900 flex items-center", children: [_jsx(DollarSign, { className: "mr-2 w-6 h-6 text-blue-600" }), "Cadastro de Investidor"] }), _jsx(CardDescription, { children: "Preencha seus dados para participar da rodada de investimento" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "name", className: "flex items-center", children: [_jsx(User, { className: "mr-2 w-4 h-4" }), "Nome Completo"] }), _jsx(Input, { id: "name", value: formData.name, onChange: (e) => handleInputChange("name", e.target.value), placeholder: "Seu nome completo", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "email", className: "flex items-center", children: [_jsx(Mail, { className: "mr-2 w-4 h-4" }), "Email"] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange("email", e.target.value), placeholder: "seu@email.com", required: true })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "phone", className: "flex items-center", children: [_jsx(Phone, { className: "mr-2 w-4 h-4" }), "Telefone"] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: (e) => handleInputChange("phone", e.target.value), placeholder: "(11) 99999-9999", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "investmentAmount", children: "Valor do Investimento" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("investmentAmount", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o valor" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "5000-10000", children: "R$ 5.000 - R$ 10.000" }), _jsx(SelectItem, { value: "10000-25000", children: "R$ 10.000 - R$ 25.000" }), _jsx(SelectItem, { value: "25000-50000", children: "R$ 25.000 - R$ 50.000" }), _jsx(SelectItem, { value: "50000-100000", children: "R$ 50.000 - R$ 100.000" }), _jsx(SelectItem, { value: "100000+", children: "R$ 100.000+" })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "investorType", children: "Perfil de Investidor" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("investorType", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione seu perfil" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "individual", children: "Pessoa F\u00EDsica" }), _jsx(SelectItem, { value: "company", children: "Pessoa Jur\u00EDdica" }), _jsx(SelectItem, { value: "fund", children: "Fundo de Investimento" }), _jsx(SelectItem, { value: "angel", children: "Investidor Anjo" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "experience", children: "Experi\u00EAncia em Investimentos" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("experience", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione sua experi\u00EAncia" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "beginner", children: "Iniciante" }), _jsx(SelectItem, { value: "intermediate", children: "Intermedi\u00E1rio" }), _jsx(SelectItem, { value: "advanced", children: "Avan\u00E7ado" }), _jsx(SelectItem, { value: "professional", children: "Profissional" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "comments", children: "Coment\u00E1rios Adicionais" }), _jsx(Textarea, { id: "comments", value: formData.comments, onChange: (e) => handleInputChange("comments", e.target.value), placeholder: "Conte-nos sobre suas expectativas e objetivos...", rows: 3 })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { type: "submit", className: "flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white", children: "Enviar Cadastro" }), _jsx(Button, { type: "button", variant: "outline", onClick: onClose, className: "px-8", children: "Cancelar" })] })] }) })] }) }));
};
