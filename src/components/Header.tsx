
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Futuro PDV" 
              className="h-10 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="text-slate-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
            <a href="#oportunidade" className="text-slate-700 hover:text-blue-600 transition-colors">
              Oportunidade
            </a>
            <a href="#parceiros" className="text-slate-700 hover:text-blue-600 transition-colors">
              Seja um Parceiro
            </a>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Investir Agora
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <a href="#sobre" className="text-slate-700 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <a href="#oportunidade" className="text-slate-700 hover:text-blue-600 transition-colors">
                Oportunidade
              </a>
              <a href="#parceiros" className="text-slate-700 hover:text-blue-600 transition-colors">
                Seja um Parceiro
              </a>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full"
              >
                Investir Agora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
