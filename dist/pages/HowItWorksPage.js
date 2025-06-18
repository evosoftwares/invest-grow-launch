import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, DollarSign, Shield, Target, CheckCircle, UserPlus, Link, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HowItWorksPage = () => {
    const navigate = useNavigate();
    const investorSteps = [
        {
            icon: UserPlus,
            title: "1. Cadastro",
            description: "Crie sua conta e complete seu perfil de investidor com suas informações básicas."
        },
        {
            icon: Target,
            title: "2. Escolha do Investimento",
            description: "Selecione o valor que deseja investir no Futuro PDV, a partir de R$ 5.000."
        },
        {
            icon: Shield,
            title: "3. Análise e Aprovação",
            description: "Nossa equipe analisa sua proposta e envia o contrato de investimento."
        },
        {
            icon: DollarSign,
            title: "4. Pagamento",
            description: "Realize o pagamento via PIX ou transferência bancária com total segurança."
        },
        {
            icon: BarChart3,
            title: "5. Acompanhamento",
            description: "Receba relatórios periódicos sobre o crescimento da empresa e seus retornos."
        }
    ];
    const partnerSteps = [
        {
            icon: UserPlus,
            title: "1. Cadastro como Parceiro",
            description: "Registre-se como parceiro comercial e aguarde a aprovação da equipe."
        },
        {
            icon: Link,
            title: "2. Links de Indicação",
            description: "Crie links personalizados para compartilhar com seus contatos."
        },
        {
            icon: Users,
            title: "3. Cadastro de Investidores",
            description: "Cadastre investidores interessados através do seu dashboard."
        },
        {
            icon: TrendingUp,
            title: "4. Acompanhamento",
            description: "Monitore suas indicações e conversões em tempo real."
        },
        {
            icon: DollarSign,
            title: "5. Recebimento de Comissões",
            description: "Receba 5% de comissão inicial + 2,5% recorrente sobre investimentos aprovados."
        }
    ];
    const benefits = [
        {
            title: "Para Investidores",
            items: [
                "Oportunidade de investir em tecnologia inovadora",
                "Retorno projetado de 300% em 24 meses",
                "Acompanhamento transparente do crescimento",
                "Participação nos lucros da empresa",
                "Contratos seguros e regulamentados"
            ]
        },
        {
            title: "Para Parceiros",
            items: [
                "Comissão de 5% sobre investimento inicial",
                "Comissão recorrente de 2,5% sobre rendimentos",
                "Dashboard completo para gestão de indicações",
                "Links personalizados para rastreamento",
                "Suporte dedicado da equipe comercial"
            ]
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-10 w-auto cursor-pointer", onClick: () => navigate('/') }), _jsx("div", { className: "w-px h-6 bg-gray-300" }), _jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Como Funciona" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate('/auth'), children: "Login" }), _jsx(Button, { size: "sm", onClick: () => navigate('/'), children: "Voltar ao In\u00EDcio" })] })] }) }), _jsxs("div", { className: "max-w-6xl mx-auto p-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx(Badge, { className: "mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200", children: "Sistema de Investimentos e Parcerias" }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: ["Como Funciona o", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent block", children: "Futuro PDV" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Entenda como nossa plataforma conecta investidores, parceiros comerciais e oportunidades de investimento em tecnologia inovadora para o varejo brasileiro." })] }), _jsxs("section", { className: "mb-16", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Para Investidores" }), _jsx("p", { className: "text-lg text-gray-600", children: "Processo simples e seguro para investir no futuro do PDV" })] }), _jsx("div", { className: "grid md:grid-cols-5 gap-6 mb-12", children: investorSteps.map((step, index) => (_jsxs(Card, { className: "relative", children: [index < investorSteps.length - 1 && (_jsx(ArrowRight, { className: "absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-500 hidden md:block" })), _jsxs(CardHeader, { className: "text-center", children: [_jsx(step.icon, { className: "w-12 h-12 text-blue-600 mx-auto mb-4" }), _jsx(CardTitle, { className: "text-lg", children: step.title })] }), _jsx(CardContent, { children: _jsx(CardDescription, { className: "text-center", children: step.description }) })] }, index))) })] }), _jsxs("section", { className: "mb-16", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Para Parceiros Comerciais" }), _jsx("p", { className: "text-lg text-gray-600", children: "Ganhe comiss\u00F5es indicando investidores qualificados" })] }), _jsx("div", { className: "grid md:grid-cols-5 gap-6 mb-12", children: partnerSteps.map((step, index) => (_jsxs(Card, { className: "relative", children: [index < partnerSteps.length - 1 && (_jsx(ArrowRight, { className: "absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-500 hidden md:block" })), _jsxs(CardHeader, { className: "text-center", children: [_jsx(step.icon, { className: "w-12 h-12 text-green-600 mx-auto mb-4" }), _jsx(CardTitle, { className: "text-lg", children: step.title })] }), _jsx(CardContent, { children: _jsx(CardDescription, { className: "text-center", children: step.description }) })] }, index))) })] }), _jsxs("section", { className: "mb-16", children: [_jsx("div", { className: "text-center mb-12", children: _jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Benef\u00EDcios da Plataforma" }) }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: benefits.map((category, index) => (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-2xl text-center", children: category.title }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-3", children: category.items.map((item, itemIndex) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: item })] }, itemIndex))) }) })] }, index))) })] }), _jsx("section", { className: "mb-16", children: _jsxs(Card, { className: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(Shield, { className: "w-16 h-16 text-blue-600 mx-auto mb-4" }), _jsx(CardTitle, { className: "text-3xl", children: "Seguran\u00E7a e Transpar\u00EAncia" })] }), _jsx(CardContent, { className: "text-center", children: _jsxs("div", { className: "grid md:grid-cols-3 gap-8 mt-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Contratos Seguros" }), _jsx("p", { className: "text-gray-600", children: "Todos os investimentos s\u00E3o formalizados atrav\u00E9s de contratos regulamentados e seguros." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Relat\u00F3rios Transparentes" }), _jsx("p", { className: "text-gray-600", children: "Acompanhe o crescimento da empresa atrav\u00E9s de relat\u00F3rios peri\u00F3dicos detalhados." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Equipe Especializada" }), _jsx("p", { className: "text-gray-600", children: "Nossa equipe est\u00E1 sempre dispon\u00EDvel para esclarecer d\u00FAvidas e dar suporte." })] })] }) })] }) }), _jsx("section", { className: "text-center", children: _jsx(Card, { className: "bg-gradient-to-r from-gray-900 to-blue-900 text-white", children: _jsxs(CardContent, { className: "p-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-6", children: "Pronto para Come\u00E7ar?" }), _jsx("p", { className: "text-xl mb-8 opacity-90", children: "Junte-se a n\u00F3s nesta jornada de transforma\u00E7\u00E3o do varejo brasileiro" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Button, { size: "lg", className: "bg-blue-600 text-white hover:bg-blue-700 border-0", onClick: () => navigate('/'), children: [_jsx(TrendingUp, { className: "mr-2 w-5 h-5" }), "Quero Investir"] }), _jsxs(Button, { size: "lg", variant: "outline", className: "border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent", onClick: () => navigate('/'), children: [_jsx(Users, { className: "mr-2 w-5 h-5" }), "Ser Parceiro"] })] })] }) }) })] })] }));
};
export default HowItWorksPage;
