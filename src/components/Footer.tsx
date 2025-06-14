import { Mail, Phone, MapPin } from "lucide-react";
export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
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
  return <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <img src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" alt="Futuro PDV" className="h-12 w-auto mb-6 filter brightness-0 invert cursor-pointer" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })} />
            <p className="text-slate-300 mb-6 max-w-md">
              Revolucionando o varejo brasileiro com tecnologia de ponta e soluções inovadoras para PDV.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:contato@futuropdv.com" className="hover:text-white transition-colors">
                  contato@futuropdv.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  (11) 9999-9999
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-2" />
                São Paulo, SP
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Investidores</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={handleInvestClick} className="hover:text-white transition-colors text-left">
                  Como Investir
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sobre')} className="hover:text-white transition-colors text-left">
                  Documentos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('oportunidade')} className="hover:text-white transition-colors text-left">
                  FAQ
                </button>
              </li>
              <li>
                <a href="mailto:contato@futuropdv.com" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Parceiros</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={handlePartnerClick} className="hover:text-white transition-colors text-left">
                  Seja um Parceiro
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('parceiros')} className="hover:text-white transition-colors text-left">
                  Comissões
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('parceiros')} className="hover:text-white transition-colors text-left">
                  Material de Apoio
                </button>
              </li>
              <li>
                <button onClick={handlePartnerClick} className="hover:text-white transition-colors text-left">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Futuro PDV. Todos os direitos reservados.</p>
          
        </div>
      </div>
    </footer>;
};