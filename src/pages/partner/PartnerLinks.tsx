
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Eye, 
  ExternalLink,
  ArrowLeft,
  Trash2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { usePartnerLinks, usePartnerLinkMutations } from "@/hooks/usePartnerLinks";
import { usePartnerId } from "@/hooks/usePartnerId";
import { CreateLinkModal } from "@/components/partner/CreateLinkModal";
import PartnerErrorBoundary from "@/components/partner/PartnerErrorBoundary";

const PartnerLinksContent = () => {
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();
  const { data: partnerId, isLoading: isLoadingPartnerId, error: partnerError } = usePartnerId();
  
  const { data: links = [], isLoading, error } = usePartnerLinks();
  const { deletePartnerLink } = usePartnerLinkMutations();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  const handleDeleteLink = async (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o link "${name}"?`)) {
      await deletePartnerLink.mutateAsync(id);
    }
  };

  if (isLoadingPartnerId || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando links...</p>
        </div>
      </div>
    );
  }

  if (partnerError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro de Configuração</h2>
          <p className="text-gray-600 mb-4">
            Não foi possível carregar seus dados de parceiro. 
            Isso pode acontecer se sua conta ainda não foi configurada como parceiro.
          </p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate('/partner/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!partnerId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Conta em Configuração</h2>
          <p className="text-gray-600 mb-4">
            Sua conta de parceiro está sendo configurada. 
            Tente novamente em alguns minutos ou entre em contato com o suporte.
          </p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Verificar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate('/partner/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Erro ao carregar links: {error.message}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

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
            <Button 
              variant="ghost" 
              onClick={() => navigate('/partner/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Links de Indicação
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Olá, {userProfile?.full_name || 'Parceiro'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Seus Links de Indicação
            </h2>
            <p className="text-gray-600">
              Gerencie seus links personalizados e acompanhe o desempenho.
            </p>
          </div>
          
          <CreateLinkModal />
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <Card key={link.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{link.name}</CardTitle>
                    <CardDescription>
                      {link.description && (
                        <span className="block mb-1">{link.description}</span>
                      )}
                      Criado em {new Date(link.created_at).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      {link.clicks} cliques
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      {link.conversions} conversões
                    </Badge>
                    {!link.is_active && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Input 
                    value={link.url} 
                    readOnly 
                    className="flex-1 bg-gray-50"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(link.url)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteLink(link.id, link.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Taxa de Conversão:</span>
                    <div className="font-semibold">
                      {link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total de Cliques:</span>
                    <div className="font-semibold">{link.clicks}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversões:</span>
                    <div className="font-semibold">{link.conversions}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {links.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Nenhum link criado ainda</h3>
                <p>Crie seu primeiro link de indicação para começar a ganhar comissões.</p>
              </div>
              <CreateLinkModal />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const PartnerLinks = () => {
  return (
    <PartnerErrorBoundary>
      <PartnerLinksContent />
    </PartnerErrorBoundary>
  );
};

export default PartnerLinks;
