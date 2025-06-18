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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useInvestorMutations } from "@/hooks/useInvestors";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
const investorSchema = z.object({
    full_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    cpf: z.string().optional(),
    birth_date: z.string().optional(),
    profession: z.string().optional(),
    income_range: z.string().optional(),
    investment_experience: z.string().optional(),
    notes: z.string().optional(),
    // Endereço
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipcode: z.string().optional(),
});
const InvestorRegistration = () => {
    const navigate = useNavigate();
    const { userProfile } = useAuth();
    const { createInvestor } = useInvestorMutations();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(investorSchema),
        defaultValues: {
            full_name: "",
            email: "",
            phone: "",
            cpf: "",
            birth_date: "",
            profession: "",
            income_range: "",
            investment_experience: "",
            notes: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            zipcode: "",
        },
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id)) {
            toast({
                title: "Erro",
                description: "Usuário não autenticado",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        try {
            // Buscar o partner_id baseado no profile_id
            const { data: partnerData, error: partnerError } = yield supabase
                .from('partners')
                .select('id')
                .eq('profile_id', userProfile.id)
                .single();
            if (partnerError || !partnerData) {
                throw new Error("Parceiro não encontrado");
            }
            // Preparar dados do endereço
            const address = {
                street: data.street,
                number: data.number,
                complement: data.complement,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                zipcode: data.zipcode,
            };
            // Criar investidor
            const investorData = {
                profile_id: null, // Será null inicialmente até o investidor fazer login
                full_name: data.full_name,
                email: data.email,
                phone: data.phone || null,
                cpf: data.cpf || null,
                address: Object.keys(address).length > 0 ? address : null,
                birth_date: data.birth_date || null,
                profession: data.profession || null,
                income_range: data.income_range || null,
                investment_experience: data.investment_experience || null,
                status: 'lead',
                lead_source: 'partner',
                partner_id: partnerData.id,
                notes: data.notes || null,
                tags: null,
                last_contact_date: new Date().toISOString(),
            };
            yield createInvestor.mutateAsync(investorData);
            toast({
                title: "Investidor cadastrado",
                description: "Investidor foi cadastrado com sucesso!",
            });
            navigate('/partner/investors');
        }
        catch (error) {
            console.error('Error creating investor:', error);
            toast({
                title: "Erro ao cadastrar investidor",
                description: error.message || "Ocorreu um erro inesperado",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "flex items-center justify-between px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/partner/dashboard'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Voltar"] }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Cadastrar Novo Investidor" })] }) }) }), _jsx("div", { className: "p-6", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Dados do Investidor" }), _jsx(CardDescription, { children: "Preencha as informa\u00E7\u00F5es do investidor que voc\u00EA est\u00E1 indicando" })] }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Dados Pessoais" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "full_name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nome Completo *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Nome completo" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "email", placeholder: "email@exemplo.com" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(FormField, { control: form.control, name: "phone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Telefone" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "(11) 99999-9999" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "cpf", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "CPF" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "000.000.000-00" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "birth_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Data de Nascimento" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "date" }, field)) }), _jsx(FormMessage, {})] })) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Endere\u00E7o" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx("div", { className: "md:col-span-2", children: _jsx(FormField, { control: form.control, name: "street", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Rua" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Nome da rua" }, field)) }), _jsx(FormMessage, {})] })) }) }), _jsx(FormField, { control: form.control, name: "number", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "N\u00FAmero" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "123" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "complement", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Complemento" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Apto, bloco, etc" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(FormField, { control: form.control, name: "neighborhood", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Bairro" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Bairro" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "city", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Cidade" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Cidade" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "state", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Estado" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "SP" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "zipcode", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "CEP" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "00000-000" }, field)) }), _jsx(FormMessage, {})] })) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Informa\u00E7\u00F5es Profissionais" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(FormField, { control: form.control, name: "profession", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Profiss\u00E3o" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Ex: Engenheiro, M\u00E9dico" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "income_range", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Faixa de Renda" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione a faixa" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "at\u00E9-5k", children: "At\u00E9 R$ 5.000" }), _jsx(SelectItem, { value: "5k-10k", children: "R$ 5.000 - R$ 10.000" }), _jsx(SelectItem, { value: "10k-20k", children: "R$ 10.000 - R$ 20.000" }), _jsx(SelectItem, { value: "20k-50k", children: "R$ 20.000 - R$ 50.000" }), _jsx(SelectItem, { value: "acima-50k", children: "Acima de R$ 50.000" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "investment_experience", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Experi\u00EAncia em Investimentos" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o n\u00EDvel" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "iniciante", children: "Iniciante" }), _jsx(SelectItem, { value: "intermediario", children: "Intermedi\u00E1rio" }), _jsx(SelectItem, { value: "avancado", children: "Avan\u00E7ado" }), _jsx(SelectItem, { value: "especialista", children: "Especialista" })] })] }), _jsx(FormMessage, {})] })) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Observa\u00E7\u00F5es" }), _jsx(FormField, { control: form.control, name: "notes", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Notas sobre o investidor" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Informa\u00E7\u00F5es adicionais, contexto da indica\u00E7\u00E3o, interesses espec\u00EDficos...", className: "resize-none", rows: 4 }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "flex gap-4 pt-6", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate('/partner/dashboard'), disabled: isLoading, children: "Cancelar" }), _jsxs(Button, { type: "submit", disabled: isLoading, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isLoading ? "Cadastrando..." : "Cadastrar Investidor"] })] })] }) })) })] }) }) })] }));
};
export default InvestorRegistration;
