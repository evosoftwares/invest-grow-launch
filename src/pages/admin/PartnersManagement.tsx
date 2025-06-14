
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
import { Search, UserPlus, Eye, Mail, DollarSign, TrendingUp } from "lucide-react";

const PartnersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - em produção viria de uma API
  const partners = [
    {
      id: 1,
      name: "Carlos Vendedor",
      email: "carlos@vendedor.com",
      phone: "(11) 99999-0001",
      status: "active",
      totalIndicacoes: 15,
      totalCaptado: 850000,
      comissaoTotal: 42500,
      comissaoPendente: 5000,
      registroDate: "2023-12-01",
      ultimaIndicacao: "2024-01-14"
    },
    {
      id: 2,
      name: "Ana Promotora",
      email: "ana@promotora.com",
      phone: "(11) 99999-0002",
      status: "active",
      totalIndicacoes: 8,
      totalCaptado: 450000,
      comissaoTotal: 22500,
      comissaoPendente: 2500,
      registroDate: "2024-01-05",
      ultimaIndicacao: "2024-01-13"
    },
    {
      id: 3,
      name: "Pedro Silva",
      email: "pedro@silva.com",
      phone: "(11) 99999-0003",
      status: "pending",
      totalIndicacoes: 2,
      totalCaptado: 75000,
      comissaoTotal: 0,
      comissaoPendente: 3750,
      registroDate: "2024-01-10",
      ultimaIndicacao: "2024-01-12"
    },
    {
      id: 4,
      name: "Julia Santos",
      email: "julia@santos.com",
      phone: "(11) 99999-0004",
      status: "inactive",
      totalIndicacoes: 5,
      totalCaptado: 200000,
      comissaoTotal: 10000,
      comissaoPendente: 0,
      registroDate: "2023-11-15",
      ultimaIndicacao: "2023-12-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", color: "bg-green-100 text-green-800" },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      inactive: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
      blocked: { label: "Bloqueado", color: "bg-red-100 text-red-800" }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'active').length,
    totalCaptado: partners.reduce((sum, p) => sum + p.totalCaptado, 0),
    totalComissoes: partners.reduce((sum, p) => sum + p.comissaoTotal, 0)
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Parceiros</h1>
            <p className="text-gray-600">Gerencie parceiros e suas comissões</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Parceiro
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalStats.totalPartners}</div>
                  <div className="text-sm text-gray-600">Total Parceiros</div>
                </div>
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{totalStats.activePartners}</div>
                  <div className="text-sm text-gray-600">Parceiros Ativos</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    R$ {(totalStats.totalCaptado / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-600">Total Captado</div>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    R$ {(totalStats.totalComissoes / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Comissões Pagas</div>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
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
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partners Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Parceiros ({filteredPartners.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Indicações</TableHead>
                    <TableHead>Total Captado</TableHead>
                    <TableHead>Comissão Paga</TableHead>
                    <TableHead>Pendente</TableHead>
                    <TableHead>Última Indicação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">{partner.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
                      <TableCell className="text-center font-medium">
                        {partner.totalIndicacoes}
                      </TableCell>
                      <TableCell className="font-semibold">
                        R$ {partner.totalCaptado.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        R$ {partner.comissaoTotal.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-semibold text-yellow-600">
                        R$ {partner.comissaoPendente.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>{partner.ultimaIndicacao}</TableCell>
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

export default PartnersManagement;
