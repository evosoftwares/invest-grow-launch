import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Cloud, BarChart3, Users, Shield, Zap } from "lucide-react";
export const FeaturesSection = () => {
    const features = [
        {
            icon: Smartphone,
            title: "Tecnologia Inovadora",
            description: "Sistema PDV completo com interface intuitiva e recursos avançados de gestão."
        },
        {
            icon: Cloud,
            title: "Infraestrutura Escalável",
            description: "Arquitetura cloud-native preparada para suportar milhares de estabelecimentos."
        },
        {
            icon: BarChart3,
            title: "Analytics Avançado",
            description: "Relatórios inteligentes e insights de negócio para maximizar resultados."
        },
        {
            icon: Users,
            title: "Mercado Amplo",
            description: "Atendemos desde pequenos comerciantes até grandes redes de varejo."
        },
        {
            icon: Shield,
            title: "Segurança Garantida",
            description: "Certificações de segurança e conformidade com regulamentações do setor."
        },
        {
            icon: Zap,
            title: "Performance Superior",
            description: "Processamento rápido e confiável para operações de alto volume."
        }
    ];
    return (_jsx("section", { id: "sobre", className: "py-20 px-4 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-slate-900 mb-6", children: "Por que Investir no Futuro PDV?" }), _jsx("p", { className: "text-xl text-slate-600 max-w-3xl mx-auto", children: "Uma solu\u00E7\u00E3o completa que combina inova\u00E7\u00E3o tecnol\u00F3gica com oportunidade de mercado excepcional." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(Card, { className: "hover:shadow-lg transition-all duration-300 border-2 hover:border-[#B8FAFF]", children: [_jsxs(CardHeader, { children: [_jsx(feature.icon, { className: "w-12 h-12 text-blue-600 mb-4" }), _jsx(CardTitle, { className: "text-slate-900", children: feature.title })] }), _jsx(CardContent, { children: _jsx(CardDescription, { className: "text-slate-600", children: feature.description }) })] }, index))) })] }) }));
};
