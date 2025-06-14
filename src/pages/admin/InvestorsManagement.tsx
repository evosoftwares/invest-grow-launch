
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
import { Search, Filter, Download, Eye, Mail, Phone } from "lucide-react";

const InvestorsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - em produção viria de uma API
  const investors = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      amount: 50000,
      status: "confirmed",
      source: "Site",
      date: "2024-01-15",
      partner: "Carlos Vendedor"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      amount: 100000,
      status: "pending",
      source: "Parceiro",
      date: "2024-01-14",
      partner: "Ana Promotora"
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      phone: "(11) 77777-7777",
      amount: 25000,
      status: "confirmed",
      source: "Indicação",
      date: "2024-01-13",
      partner: "Direto"
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(11) 66666-6666",
      amount: 75000,
      status: "analysis",
      source: "Site",
      date: "2024-01-12",
      partner: "Carlos Vendedor"
    },
    {
      id: 5,
      name: "Pedro Lima",
      email: "pedro@email.com",
      phone: "(11) 55555-5555",
      amount: 150000,
      status: "negotiation",
      source: "Parceiro",
      date: "2024-01-11",
      partner: "Ana Promotora"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      confirmed: { label: "Confirmado", color: "bg-green-100 text-green-800" },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      analysis: { label: "Análise", color: "bg-blue-100 text-blue-800" },
      negotiation: { label: "Negociação", color: "bg-purple-100 text-purple-800" },
      lost: { label: "Perdido", color: "bg-red-100 text-red-800" }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || investor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Investidores</h1>
            <p className="text-gray-600">Gerencie todos os investidores e leads</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
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
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="analysis">Análise</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {investors.filter(i => i.status === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-600">Confirmados</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {investors.filter(i => i.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pendentes</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {investors.filter(i => i.status === 'analysis').length}
                </div>
                <div className="text-sm text-gray-600">Em Análise</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {investors.filter(i => i.status === 'negotiation').length}
                </div>
                <div className="text-sm text-gray-600">Negociação</div>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell className="font-medium">{investor.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {investor.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {investor.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        R$ {investor.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>{getStatusBadge(investor.status)}</TableCell>
                      <TableCell>{investor.source}</TableCell>
                      <TableCell>{investor.partner}</TableCell>
                      <TableCell>{investor.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default InvestorsManagement;
