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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
const AuthPage = () => {
    const navigate = useNavigate();
    const { signIn, signUp, loading } = useAuth();
    // Login form state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // Signup form state
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("investor");
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha email e senha.",
                variant: "destructive",
            });
            return;
        }
        const { error } = yield signIn(loginEmail, loginPassword);
        if (!error) {
            // Redirecionamento será feito automaticamente pelo hook useAuth
        }
    });
    const handleSignup = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!signupEmail || !signupPassword || !fullName) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os campos.",
                variant: "destructive",
            });
            return;
        }
        const { error } = yield signUp(signupEmail, signupPassword, {
            full_name: fullName,
            role: role,
        });
        if (!error) {
            // Reset form
            setSignupEmail("");
            setSignupPassword("");
            setFullName("");
            setRole("investor");
        }
    });
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("header", { className: "bg-white/90 backdrop-blur-md border-b border-slate-200", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx("div", { className: "flex items-center", children: _jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }) }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/'), className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Voltar ao Site"] })] }) }) }), _jsx("div", { className: "flex items-center justify-center min-h-[calc(100vh-80px)] p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl text-center", children: "Acesso ao Sistema" }), _jsx(CardDescription, { className: "text-center", children: "Fa\u00E7a login ou crie sua conta para acessar o sistema" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "login", children: "Entrar" }), _jsx(TabsTrigger, { value: "signup", children: "Cadastrar" })] }), _jsx(TabsContent, { value: "login", className: "space-y-4", children: _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "login-email", children: "Email" }), _jsx(Input, { id: "login-email", type: "email", placeholder: "seu@email.com", value: loginEmail, onChange: (e) => setLoginEmail(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "login-password", children: "Senha" }), _jsx(Input, { id: "login-password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: loginPassword, onChange: (e) => setLoginPassword(e.target.value), required: true })] }), _jsxs(Button, { type: "submit", className: "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800", disabled: loading, children: [loading ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(LogIn, { className: "w-4 h-4 mr-2" })), "Entrar"] })] }) }), _jsx(TabsContent, { value: "signup", className: "space-y-4", children: _jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "signup-name", children: "Nome Completo" }), _jsx(Input, { id: "signup-name", type: "text", placeholder: "Seu nome completo", value: fullName, onChange: (e) => setFullName(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "signup-email", children: "Email" }), _jsx(Input, { id: "signup-email", type: "email", placeholder: "seu@email.com", value: signupEmail, onChange: (e) => setSignupEmail(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "signup-password", children: "Senha" }), _jsx(Input, { id: "signup-password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: signupPassword, onChange: (e) => setSignupPassword(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "role", children: "Tipo de Conta" }), _jsxs(Select, { value: role, onValueChange: setRole, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o tipo de conta" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "investor", children: "Investidor" }), _jsx(SelectItem, { value: "partner", children: "Parceiro" }), _jsx(SelectItem, { value: "admin", children: "Administrador" })] })] })] }), _jsxs(Button, { type: "submit", className: "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800", disabled: loading, children: [loading ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(UserPlus, { className: "w-4 h-4 mr-2" })), "Criar Conta"] })] }) })] }) })] }) })] }));
};
export default AuthPage;
