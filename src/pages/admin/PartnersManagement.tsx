
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
import { Search, UserPlus, Eye, Mail, DollarSign, TrendingUp, Check, X } from "lucide-react";
import { usePartners, usePartnerMutations } from "@/hooks/usePartners";

const PartnersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: partners = [], isLoading } = usePartners();
  const { updatePartnerStatus } = usePartnerMutations();

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

  const handleStatusChange = (partnerId: string, newStatus: string) => {
    updatePartnerStatus.mutate({ id: partnerId, status: newStatus });
  };

  const filteredPartners = partners.filter(partner => {
    const partnerName = partner.profiles?.full_name || partner.business_name || '';
    const partnerEmail = partner.profiles?.email || '';
    
    const matchesSearch = partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'active').length,
    pendingPartners: partners.filter(p => p.status === 'pending').length,
    avgCommissionRate: partners.length > 0 
      ? partners.reduce((sum, p) => sum + Number(p.commission_rate), 0) / partners.length 
      : 0
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

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
                  <div className="text-2xl font-bold text-yellow-600">{totalStats.pendingPartners}</div>
                  <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {totalStats.avgCommissionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Comissão Média</div>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
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
                    <TableHead>Taxa Comissão</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Data Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {partner.profiles?.full_name || partner.business_name || 'Nome não informado'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {partner.profiles?.email || 'Email não informado'}
                          </div>
                          {partner.profiles?.phone && (
                            <div className="text-sm text-gray-500">{partner.profiles.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
                      <TableCell className="font-medium">
                        {Number(partner.commission_rate).toFixed(1)}%
                      </TableCell>
                      <TableCell>{partner.specialty || '-'}</TableCell>
                      <TableCell>
                        {new Date(partner.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {partner.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(partner.id, 'active')}
                                disabled={updatePartnerStatus.isPending}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(partner.id, 'blocked')}
                                disabled={updatePartnerStatus.isPending}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
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
