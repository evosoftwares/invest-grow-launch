import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Phone, MapPin } from "lucide-react";
export const Footer = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };
    const handleInvestClick = () => {
        const investEvent = new CustomEvent('openInvestmentForm');
        window.dispatchEvent(investEvent);
    };
    const handlePartnerClick = () => {
        const partnerEvent = new CustomEvent('openPartnerForm');
        window.dispatchEvent(partnerEvent);
    };
    return _jsx("footer", { className: "bg-slate-900 text-white py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "grid md:grid-cols-4 gap-8", children: [_jsxs("div", { className: "col-span-2", children: [_jsx("img", { src: "/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png", alt: "Futuro PDV", className: "h-12 w-auto mb-6 filter brightness-0 invert cursor-pointer", onClick: () => window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    }) }), _jsx("p", { className: "text-slate-300 mb-6 max-w-md", children: "Revolucionando o varejo brasileiro com tecnologia de ponta e solu\u00E7\u00F5es inovadoras para PDV." }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center text-slate-300", children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), _jsx("a", { href: "mailto:contato@futuropdv.com", className: "hover:text-white transition-colors", children: "contato@futuropdv.com" })] }), _jsxs("div", { className: "flex items-center text-slate-300", children: [_jsx(Phone, { className: "w-4 h-4 mr-2" }), _jsx("a", { href: "tel:+5511999999999", className: "hover:text-white transition-colors", children: "(11) 9999-9999" })] }), _jsxs("div", { className: "flex items-center text-slate-300", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), "S\u00E3o Paulo, SP"] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-4", children: "Investidores" }), _jsxs("ul", { className: "space-y-2 text-slate-300", children: [_jsx("li", { children: _jsx("button", { onClick: handleInvestClick, className: "hover:text-white transition-colors text-left", children: "Como Investir" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('sobre'), className: "hover:text-white transition-colors text-left", children: "Documentos" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('oportunidade'), className: "hover:text-white transition-colors text-left", children: "FAQ" }) }), _jsx("li", { children: _jsx("a", { href: "mailto:contato@futuropdv.com", className: "hover:text-white transition-colors", children: "Contato" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-4", children: "Parceiros" }), _jsxs("ul", { className: "space-y-2 text-slate-300", children: [_jsx("li", { children: _jsx("button", { onClick: handlePartnerClick, className: "hover:text-white transition-colors text-left", children: "Seja um Parceiro" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('parceiros'), className: "hover:text-white transition-colors text-left", children: "Comiss\u00F5es" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('parceiros'), className: "hover:text-white transition-colors text-left", children: "Material de Apoio" }) }), _jsx("li", { children: _jsx("button", { onClick: handlePartnerClick, className: "hover:text-white transition-colors text-left", children: "Dashboard" }) })] })] })] }), _jsx("div", { className: "border-t border-slate-700 mt-12 pt-8 text-center text-slate-400", children: _jsx("p", { children: "\u00A9 2024 Futuro PDV. Todos os direitos reservados." }) })] }) });
};
