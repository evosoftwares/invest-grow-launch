
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

  return (
    <section id="sobre" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Por que Investir no Futuro PDV?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Uma solução completa que combina inovação tecnológica com oportunidade de mercado excepcional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-[#B8FAFF]">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-slate-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
