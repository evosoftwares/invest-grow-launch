
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onInvestClick: () => void;
  onPartnerClick: () => void;
}

export const HeroSection = ({ onInvestClick, onPartnerClick }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8FAFF]/20 to-blue-100/30 -z-10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#B8FAFF]/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto text-center">
        <Badge className="mb-8 bg-[#B8FAFF] text-slate-800 hover:bg-[#9BEAFF] text-sm px-4 py-2">
          🚀 Rodada de Investimento Aberta - Tempo Limitado
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
          O Futuro do
          <span className="bg-gradient-to-r from-blue-600 to-[#B8FAFF] bg-clip-text text-transparent block">
            PDV Chegou
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Seja parte da revolução tecnológica que está transformando o varejo brasileiro. 
          Uma oportunidade única de investimento em uma empresa com potencial de crescimento exponencial.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={onInvestClick}
          >
            <TrendingUp className="mr-2 w-5 h-5" />
            Investir Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            onClick={onPartnerClick}
          >
            <Users className="mr-2 w-5 h-5" />
            Seja um Parceiro
          </Button>
        </div>
        
        <div className="mb-16">
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-6 py-3"
            onClick={() => navigate('/como-funciona')}
          >
            <Info className="mr-2 w-5 h-5" />
            Como Funciona o Sistema
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">R$ 2.5M+</div>
            <div className="text-slate-600">Meta de Captação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">300%</div>
            <div className="text-slate-600">Crescimento Projetado</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">45 dias</div>
            <div className="text-slate-600">Tempo Restante</div>
          </div>
        </div>
      </div>
    </section>
  );
};
