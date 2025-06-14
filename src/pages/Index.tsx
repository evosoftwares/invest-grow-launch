
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, Shield, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { InvestmentForm } from "@/components/InvestmentForm";
import { PartnerRegistration } from "@/components/PartnerRegistration";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <HeroSection 
        onInvestClick={() => setShowInvestmentForm(true)}
        onPartnerClick={() => setShowPartnerForm(true)}
      />
      
      <FeaturesSection />
      
      {/* Investment Opportunity Section */}
      <section className="py-20 px-4">
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

      <Footer />

      {/* Investment Form Modal */}
      {showInvestmentForm && (
        <InvestmentForm onClose={() => setShowInvestmentForm(false)} />
      )}

      {/* Partner Registration Modal */}
      {showPartnerForm && (
        <PartnerRegistration onClose={() => setShowPartnerForm(false)} />
      )}
    </div>
  );
};

export default Index;
