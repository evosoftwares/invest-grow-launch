
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Download, Eye, Mail, Phone, Loader2 } from "lucide-react";
import { useInvestors, useInvestorMutations } from "@/hooks/useInvestors";
import { toast } from "@/components/ui/use-toast";

const InvestorsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: investors = [], isLoading, error } = useInvestors();
  const { updateInvestorStatus } = useInvestorMutations();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      lead: { label: "Lead", color: "bg-gray-100 text-gray-800" },
      contacted: { label: "Contatado", color: "bg-blue-100 text-blue-800" },
      proposal_sent: { label: "Proposta Enviada", color: "bg-yellow-100 text-yellow-800" },
      negotiation: { label: "Negociação", color: "bg-purple-100 text-purple-800" },
      analysis: { label: "Análise", color: "bg-orange-100 text-orange-800" },
      invested: { label: "Investiu", color: "bg-green-100 text-green-800" },
      lost: { label: "Perdido", color: "bg-red-100 text-red-800" }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.lead;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getSourceLabel = (source: string) => {
    const sourceMap = {
      website: "Site",
      partner: "Parceiro", 
      referral: "Indicação",
      social_media: "Redes Sociais",
      direct: "Direto"
    };
    return sourceMap[source as keyof typeof sourceMap] || source;
  };

  const handleStatusChange = (investorId: string, newStatus: any) => {
    updateInvestorStatus.mutate({ id: investorId, status: newStatus });
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados serão exportados em breve.",
    });
  };

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || investor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      lead: investors.filter(i => i.status === 'lead').length,
      contacted: investors.filter(i => i.status === 'contacted').length,
      analysis: investors.filter(i => i.status === 'analysis').length,
      negotiation: investors.filter(i => i.status === 'negotiation').length,
      invested: investors.filter(i => i.status === 'invested').length,
      lost: investors.filter(i => i.status === 'lost').length
    };
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">Erro ao carregar investidores</p>
            <p className="text-gray-500">{error.message}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Investidores</h1>
            <p className="text-gray-600">Gerencie todos os investidores e leads</p>
          </div>
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="proposal_sent">Proposta Enviada</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="analysis">Análise</SelectItem>
                  <SelectItem value="invested">Investiu</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {statusCounts.lead}
                </div>
                <div className="text-sm text-gray-600">Leads</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {statusCounts.contacted}
                </div>
                <div className="text-sm text-gray-600">Contatados</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {statusCounts.analysis}
                </div>
                <div className="text-sm text-gray-600">Em Análise</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {statusCounts.negotiation}
                </div>
                <div className="text-sm text-gray-600">Negociação</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {statusCounts.invested}
                </div>
                <div className="text-sm text-gray-600">Investiram</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {statusCounts.lost}
                </div>
                <div className="text-sm text-gray-600">Perdidos</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Investidores ({filteredInvestors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Carregando investidores...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Data de Criação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvestors.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell className="font-medium">
                          {investor.full_name || 'Nome não informado'}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-3 h-3 mr-1" />
                              {investor.email}
                            </div>
                            {investor.phone && (
                              <div className="flex items-center text-sm">
                                <Phone className="w-3 h-3 mr-1" />
                                {investor.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(investor.status)}</TableCell>
                        <TableCell>{getSourceLabel(investor.lead_source)}</TableCell>
                        <TableCell>
                          {new Date(investor.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
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
                                <SelectItem value="analysis">Análise</SelectItem>
                                <SelectItem value="invested">Investiu</SelectItem>
                                <SelectItem value="lost">Perdido</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInvestors.length === 0 && !isLoading && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Nenhum investidor encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default InvestorsManagement;
