
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, Shield, Clock, Calculator } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { InvestmentForm } from "@/components/InvestmentForm";
import { PartnerRegistration } from "@/components/PartnerRegistration";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();

  // Redirecionar usuários autenticados para o sistema
  useEffect(() => {
    if (!loading && user && userProfile) {
      console.log('Usuario logado detectado, redirecionando para o sistema:', userProfile.role);
      
      // Redirecionar baseado no papel do usuário
      const role = userProfile.role || 'investor';
      
      switch (role) {
        case 'admin':
          console.log('Redirecionando admin para dashboard');
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'partner':
          console.log('Redirecionando parceiro para dashboard');
          navigate('/partner/dashboard', { replace: true });
          break;
        default:
          console.log('Redirecionando investidor para calculadora');
          navigate('/calculadora', { replace: true });
          break;
      }
    }
  }, [user, userProfile, loading, navigate]);

  useEffect(() => {
    const handleOpenInvestmentForm = () => {
      setShowInvestmentForm(true);
    };

    const handleOpenPartnerForm = () => {
      setShowPartnerForm(true);
    };

    window.addEventListener('openInvestmentForm', handleOpenInvestmentForm);
    window.addEventListener('openPartnerForm', handleOpenPartnerForm);

    return () => {
      window.removeEventListener('openInvestmentForm', handleOpenInvestmentForm);
      window.removeEventListener('openPartnerForm', handleOpenPartnerForm);
    };
  }, []);

  // Mostrar loading apenas quando realmente carregando
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se usuário logado, não mostrar a landing page enquanto processa redirecionamento
  if (user && userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <HeroSection 
        onInvestClick={() => setShowInvestmentForm(true)}
        onPartnerClick={() => setShowPartnerForm(true)}
      />
      
      {/* ROI Calculator Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
            Nova Ferramenta
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Calcule seu Retorno de Investimento
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Use nossa calculadora avançada para simular diferentes cenários de investimento 
            e visualizar o potencial de crescimento do seu dinheiro.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
            onClick={() => navigate('/calculadora')}
          >
            <Calculator className="mr-2 w-5 h-5" />
            Usar Calculadora ROI
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
      
      <FeaturesSection />
      
      {/* Investment Opportunity Section */}
      <section id="oportunidade" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#B8FAFF] text-slate-800 hover:bg-[#9BEAFF]">
              Oportunidade Exclusiva
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Invista no Futuro do PDV
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Seja parte da revolução tecnológica que está transformando o varejo. 
              Uma oportunidade única de investimento em uma empresa em crescimento exponencial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-slate-900">Alto Potencial de Retorno</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Mercado em expansão com projeções de crescimento de 300% nos próximos 2 anos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-slate-900">Investimento Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Empresa com base sólida, tecnologia comprovada e equipe experiente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-slate-900">Tempo Limitado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Rodada de investimento disponível apenas até o lançamento oficial do aplicativo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg"
              onClick={() => setShowInvestmentForm(true)}
            >
              Investir Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="parceiros" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#B8FAFF] text-slate-800 hover:bg-[#9BEAFF]">
              Programa de Parceiros
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Seja um Parceiro de Captação
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ganhe comissões atrativas indicando investidores para nossa plataforma. 
              Sistema automático de tracking e pagamentos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">
                  5%
                </div>
                <CardTitle className="text-slate-900">Comissão Inicial</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  5% sobre o primeiro investimento de cada pessoa que você indicar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                  2,5%
                </div>
                <CardTitle className="text-slate-900">Novos Aportes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  2,5% a 3% sobre investimentos futuros dos seus indicados.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#B8FAFF] hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                  2%
                </div>
                <CardTitle className="text-slate-900">Comissão Recorrente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  1,5% a 2% mensalmente sobre o saldo investido dos seus indicados.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg"
              onClick={() => setShowPartnerForm(true)}
            >
              <Users className="mr-2 w-5 h-5" />
              Quero ser Parceiro
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {showInvestmentForm && (
        <InvestmentForm onClose={() => setShowInvestmentForm(false)} />
      )}

      {showPartnerForm && (
        <PartnerRegistration onClose={() => setShowPartnerForm(false)} />
      )}
    </div>
  );
};

export default Index;
