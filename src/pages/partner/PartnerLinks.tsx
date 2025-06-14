
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Link as LinkIcon, 
  QrCode, 
  Share, 
  Eye,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const PartnerLinks = () => {
  const [newLinkName, setNewLinkName] = useState("");
  const { toast } = useToast();

  // Mock data - em produção viria de uma API
  const partnerLinks = [
    {
      id: 1,
      name: "Link Principal",
      url: "https://futuropdv.com/invest?ref=carlos001",
      clicks: 245,
      conversions: 8,
      created: "2024-01-01",
      active: true
    },
    {
      id: 2,
      name: "WhatsApp Business",
      url: "https://futuropdv.com/invest?ref=carlos002",
      clicks: 89,
      conversions: 3,
      created: "2024-01-10",
      active: true
    },
    {
      id: 3,
      name: "Instagram Stories",
      url: "https://futuropdv.com/invest?ref=carlos003",
      clicks: 156,
      conversions: 5,
      created: "2024-01-12",
      active: true
    },
    {
      id: 4,
      name: "Email Marketing",
      url: "https://futuropdv.com/invest?ref=carlos004",
      clicks: 67,
      conversions: 2,
      created: "2024-01-14",
      active: false
    }
  ];

  const copyToClipboard = (text: string, linkName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copiado!",
      description: `O link "${linkName}" foi copiado para a área de transferência.`,
    });
  };

  const generateNewLink = () => {
    if (!newLinkName.trim()) {
      toast({
        title: "Erro",
        description: "Digite um nome para o link.",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a requisição para a API
    toast({
      title: "Link criado!",
      description: `Novo link "${newLinkName}" foi gerado com sucesso.`,
    });
    setNewLinkName("");
  };

  const totalStats = {
    totalClicks: partnerLinks.reduce((sum, link) => sum + link.clicks, 0),
    totalConversions: partnerLinks.reduce((sum, link) => sum + link.conversions, 0),
    conversionRate: ((partnerLinks.reduce((sum, link) => sum + link.conversions, 0) / partnerLinks.reduce((sum, link) => sum + link.clicks, 0)) * 100).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
                alt="Futuro PDV" 
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold">Meus Links de Indicação</h1>
                <p className="text-sm text-gray-600">Gerencie seus links únicos de captação</p>
              </div>
            </div>
            <Link to="/partner/dashboard">
              <Button variant="outline">
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Cliques</p>
                    <p className="text-2xl font-bold">{totalStats.totalClicks}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversões</p>
                    <p className="text-2xl font-bold">{totalStats.totalConversions}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <LinkIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">{totalStats.conversionRate}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Share className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Link */}
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="linkName">Nome do Link</Label>
                  <Input
                    id="linkName"
                    placeholder="Ex: Facebook, Instagram, WhatsApp..."
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={generateNewLink} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Gerar Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links List */}
          <Card>
            <CardHeader>
              <CardTitle>Seus Links de Indicação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partnerLinks.map((link) => (
                  <div key={link.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{link.name}</h3>
                          <Badge variant={link.active ? "default" : "secondary"}>
                            {link.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border text-sm font-mono break-all">
                          {link.url}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{link.clicks}</div>
                        <div className="text-sm text-gray-600">Cliques</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{link.conversions}</div>
                        <div className="text-sm text-gray-600">Conversões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : '0'}%
                        </div>
                        <div className="text-sm text-gray-600">Taxa</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Criado em</div>
                        <div className="text-sm text-gray-600">{link.created}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(link.url, link.name)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Code
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-1" />
                        Compartilhar
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Dicas para Maximizar suas Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Personalize sua mensagem</p>
                      <p className="text-sm text-gray-600">Adapte o conteúdo para cada canal (WhatsApp, Instagram, etc.)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Use chamadas para ação claras</p>
                      <p className="text-sm text-gray-600">Incentive as pessoas a clicarem com frases como "Saiba mais" ou "Invista agora"</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Monitore performance</p>
                      <p className="text-sm text-gray-600">Acompanhe quais links têm melhor performance e foque neles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-600 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Compartilhe regularmente</p>
                      <p className="text-sm text-gray-600">Mantenha uma frequência constante de divulgação em suas redes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerLinks;
