
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Futuro PDV" 
              className="h-10 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div className="w-px h-6 bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Como Funciona
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
            <Button 
              size="sm" 
              onClick={() => navigate('/')}
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Sistema de Investimentos e Parcerias
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Como Funciona o 
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent block">
              Futuro PDV
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda como nossa plataforma conecta investidores, parceiros comerciais e oportunidades 
            de investimento em tecnologia inovadora para o varejo brasileiro.
          </p>
        </div>

        {/* Para Investidores */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Investidores
            </h2>
            <p className="text-lg text-gray-600">
              Processo simples e seguro para investir no futuro do PDV
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {investorSteps.map((step, index) => (
              <Card key={index} className="relative">
                {index < investorSteps.length - 1 && (
                  <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-500 hidden md:block" />
                )}
                <CardHeader className="text-center">
                  <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Para Parceiros */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Parceiros Comerciais
            </h2>
            <p className="text-lg text-gray-600">
              Ganhe comissões indicando investidores qualificados
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {partnerSteps.map((step, index) => (
              <Card key={index} className="relative">
                {index < partnerSteps.length - 1 && (
                  <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-500 hidden md:block" />
                )}
                <CardHeader className="text-center">
                  <step.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefícios da Plataforma
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Segurança e Transparência */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-3xl">Segurança e Transparência</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contratos Seguros</h3>
                  <p className="text-gray-600">
                    Todos os investimentos são formalizados através de contratos 
                    regulamentados e seguros.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Relatórios Transparentes</h3>
                  <p className="text-gray-600">
                    Acompanhe o crescimento da empresa através de relatórios 
                    periódicos detalhados.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Equipe Especializada</h3>
                  <p className="text-gray-600">
                    Nossa equipe está sempre disponível para esclarecer dúvidas 
                    e dar suporte.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">
                Pronto para Começar?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a nós nesta jornada de transformação do varejo brasileiro
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => navigate('/')}
                >
                  <TrendingUp className="mr-2 w-5 h-5" />
                  Quero Investir
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/')}
                >
                  <Users className="mr-2 w-5 h-5" />
                  Ser Parceiro
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage;
