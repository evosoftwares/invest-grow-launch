
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, UserPlus, Eye, Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useInvestorMutations } from "@/hooks/useInvestors";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PartnerInvestor {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  lead_source: string;
  created_at: string;
  last_contact_date: string | null;
  notes: string | null;
}

const PartnerInvestors = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { updateInvestorStatus } = useInvestorMutations();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: investors, isLoading, refetch } = useQuery({
    queryKey: ['partner-investors', userProfile?.id, searchTerm, statusFilter],
    queryFn: async () => {
      if (!userProfile?.id) return [];
      
      // Buscar o partner_id baseado no profile_id
      const { data: partnerData } = await supabase
        .from('partners')
        .select('id')
        .eq('profile_id', userProfile.id)
        .single();
      
      if (!partnerData) return [];
      
      // Construir query
      let query = supabase
        .from('investors')
        .select('*')
        .eq('partner_id', partnerData.id)
        .order('created_at', { ascending: false });
      
      // Aplicar filtros
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching partner investors:', error);
        return [];
      }
      
      return data as PartnerInvestor[];
    },
    enabled: !!userProfile?.id
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      lead: { label: "Lead", variant: "secondary" },
      contacted: { label: "Contatado", variant: "outline" },
      proposal_sent: { label: "Proposta Enviada", variant: "default" },
      negotiation: { label: "Negociação", variant: "default" },
      analysis: { label: "Em Análise", variant: "default" },
      invested: { label: "Investidor", variant: "default" },
      lost: { label: "Perdido", variant: "destructive" },
    };
    
    const config = statusMap[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleStatusChange = async (investorId: string, newStatus: string) => {
    try {
      await updateInvestorStatus.mutateAsync({
        id: investorId,
        status: newStatus as any
      });
      refetch();
    } catch (error) {
      console.error('Error updating investor status:', error);
    }
  };

  const filteredInvestors = investors || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/partner/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="w-px h-6 bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Meus Investidores
            </h1>
          </div>
          
          <Button onClick={() => navigate('/partner/investors/new')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Investidor
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtre seus investidores por status ou pesquise por nome/email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="proposal_sent">Proposta Enviada</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="analysis">Em Análise</SelectItem>
                  <SelectItem value="invested">Investidor</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {filteredInvestors.length}
              </div>
              <p className="text-sm text-gray-600">Total de Investidores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {filteredInvestors.filter(inv => inv.status === 'invested').length}
              </div>
              <p className="text-sm text-gray-600">Investidores Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredInvestors.filter(inv => ['analysis', 'proposal_sent', 'negotiation'].includes(inv.status)).length}
              </div>
              <p className="text-sm text-gray-600">Em Processo</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {filteredInvestors.filter(inv => inv.status === 'lead').length}
              </div>
              <p className="text-sm text-gray-600">Novos Leads</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Investidores */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Investidores</CardTitle>
            <CardDescription>
              Gerencie seus investidores cadastrados e acompanhe o status de cada um
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredInvestors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Nenhum investidor encontrado com esses filtros."
                    : "Você ainda não cadastrou nenhum investidor."}
                </p>
                <Button onClick={() => navigate('/partner/investors/new')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar Primeiro Investidor
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cadastrado em</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{investor.full_name}</div>
                          <div className="text-sm text-gray-500">{investor.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {investor.email && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={`mailto:${investor.email}`}>
                                <Mail className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {investor.phone && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={`tel:${investor.phone}`}>
                                <Phone className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(investor.status)}
                      </TableCell>
                      <TableCell>
                        {format(new Date(investor.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {investor.last_contact_date 
                          ? format(new Date(investor.last_contact_date), 'dd/MM/yyyy', { locale: ptBR })
                          : 'Nunca'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select 
                            value={investor.status} 
                            onValueChange={(value) => handleStatusChange(investor.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lead">Lead</SelectItem>
                              <SelectItem value="contacted">Contatado</SelectItem>
                              <SelectItem value="proposal_sent">Proposta Enviada</SelectItem>
                              <SelectItem value="negotiation">Negociação</SelectItem>
                              <SelectItem value="analysis">Em Análise</SelectItem>
                              <SelectItem value="invested">Investidor</SelectItem>
                              <SelectItem value="lost">Perdido</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerInvestors;
