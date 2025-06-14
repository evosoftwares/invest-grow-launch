
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Users, User, Mail, Phone, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PartnerRegistrationProps {
  onClose: () => void;
}

export const PartnerRegistration = ({ onClose }: PartnerRegistrationProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    partnerType: "",
    experience: "",
    audience: "",
    platforms: "",
    comments: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partner registration submitted:", formData);
    // Simulate unique link generation
    const uniqueLink = `https://futuropdv.com/invest?ref=${Date.now().toString(36)}`;
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: `Seu link exclusivo: ${uniqueLink}`,
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
            <Users className="mr-2 w-6 h-6 text-blue-600" />
            Cadastro de Parceiro
          </CardTitle>
          <CardDescription>
            Torne-se um parceiro e ganhe comissões por cada investidor indicado
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="bg-[#B8FAFF]/20 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
              <Share2 className="mr-2 w-5 h-5 text-blue-600" />
              Estrutura de Comissões
            </h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• <strong>5%</strong> sobre o primeiro investimento</li>
              <li>• <strong>2,5% - 3%</strong> sobre novos aportes</li>
              <li>• <strong>1,5% - 2%</strong> mensalmente sobre o saldo investido</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  <User className="mr-2 w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="mr-2 w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="mr-2 w-4 h-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="partnerType">Tipo de Parceiro</Label>
                <Select onValueChange={(value) => handleInputChange("partnerType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="influencer">Influenciador Digital</SelectItem>
                    <SelectItem value="consultant">Consultor Financeiro</SelectItem>
                    <SelectItem value="broker">Corretor de Investimentos</SelectItem>
                    <SelectItem value="entrepreneur">Empreendedor</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="audience">Tamanho da Audiência</Label>
                <Select onValueChange={(value) => handleInputChange("audience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1000">0 - 1.000</SelectItem>
                    <SelectItem value="1000-10000">1.000 - 10.000</SelectItem>
                    <SelectItem value="10000-50000">10.000 - 50.000</SelectItem>
                    <SelectItem value="50000-100000">50.000 - 100.000</SelectItem>
                    <SelectItem value="100000+">100.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experiência com Investimentos</Label>
                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a experiência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                    <SelectItem value="professional">Profissional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platforms">Principais Plataformas</Label>
              <Input
                id="platforms"
                value={formData.platforms}
                onChange={(e) => handleInputChange("platforms", e.target.value)}
                placeholder="Ex: Instagram, LinkedIn, YouTube, WhatsApp..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Como pretende divulgar?</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                placeholder="Descreva sua estratégia de divulgação..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Gerar Link Exclusivo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-8"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
