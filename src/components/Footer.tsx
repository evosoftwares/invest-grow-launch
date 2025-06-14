import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Futuro PDV" 
              className="h-12 w-auto mb-6 filter brightness-0 invert"
            />
            <p className="text-slate-300 mb-6 max-w-md">
              Revolucionando o varejo brasileiro com tecnologia de ponta e soluções inovadoras para PDV.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-2" />
                contato@futuropdv.com
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-2" />
                (11) 9999-9999
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
              <li><a href="#" className="hover:text-white transition-colors">Como Investir</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Parceiros</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Seja um Parceiro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comissões</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Material de Apoio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Futuro PDV. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Investimentos envolvem riscos. Leia atentamente os documentos antes de investir.
          </p>
        </div>
      </div>
    </footer>
  );
};
