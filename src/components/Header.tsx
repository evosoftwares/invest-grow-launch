
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Fecha o menu mobile após clicar
    }
  };

  const handleInvestClick = () => {
    const investEvent = new CustomEvent('openInvestmentForm');
    window.dispatchEvent(investEvent);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/auth');
    setIsMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Futuro PDV" 
              className="h-10 w-auto cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-slate-700 hover:text-blue-600 transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('oportunidade')}
              className="text-slate-700 hover:text-blue-600 transition-colors"
            >
              Oportunidade
            </button>
            <button 
              onClick={() => scrollToSection('parceiros')}
              className="text-slate-700 hover:text-blue-600 transition-colors"
            >
              Seja um Parceiro
            </button>
            {!user ? (
              <>
                <Button 
                  variant="outline"
                  onClick={handleLoginClick}
                >
                  <LogIn className="mr-2 w-4 h-4" />
                  Entrar
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  onClick={handleInvestClick}
                >
                  Investir Agora
                </Button>
              </>
            ) : (
              <Button 
                variant="outline"
                onClick={handleLogoutClick}
              >
                Sair
              </Button>
            )}
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
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-slate-700 hover:text-blue-600 transition-colors text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('oportunidade')}
                className="text-slate-700 hover:text-blue-600 transition-colors text-left"
              >
                Oportunidade
              </button>
              <button 
                onClick={() => scrollToSection('parceiros')}
                className="text-slate-700 hover:text-blue-600 transition-colors text-left"
              >
                Seja um Parceiro
              </button>
              {!user ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={handleLoginClick}
                    className="w-full justify-start"
                  >
                    <LogIn className="mr-2 w-4 h-4" />
                    Entrar
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full"
                    onClick={handleInvestClick}
                  >
                    Investir Agora
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  onClick={handleLogoutClick}
                  className="w-full justify-start"
                >
                  Sair
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
