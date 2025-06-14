
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvestors } from '@/hooks/useInvestors';
import { useInvestments } from '@/hooks/useInvestments';
import { InvestmentApprovalActions } from '@/components/admin/InvestmentApprovalActions';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Plus, FileText, DollarSign, User, Calendar } from 'lucide-react';

const InvestorsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'investors' | 'investments'>('investors');
  
  const { 
    data: investors, 
    isLoading: investorsLoading, 
    error: investorsError 
  } = useInvestors();
  
  const { 
    data: investments, 
    isLoading: investmentsLoading, 
    error: investmentsError 
  } = useInvestments();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'lead': { label: 'Lead', variant: 'secondary' as const },
      'interested': { label: 'Interessado', variant: 'default' as const },
      'investor': { label: 'Investidor', variant: 'default' as const },
      'inactive': { label: 'Inativo', variant: 'outline' as const },
      'pending': { label: 'Pendente', variant: 'secondary' as const },
      'approved': { label: 'Aprovado', variant: 'default' as const },
      'rejected': { label: 'Rejeitado', variant: 'destructive' as const },
      'paid': { label: 'Pago', variant: 'default' as const },
    };

    const config = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'outline' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const filteredInvestors = investors?.filter(investor => {
    const matchesSearch = investor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || investor.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const filteredInvestments = investments?.filter(investment => {
    const matchesSearch = investment.investors?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.investors?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || investment.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const isLoading = investorsLoading || investmentsLoading;
  const error = investorsError || investmentsError;

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-red-600">
                Erro ao carregar dados: {error.message}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'investors' ? 'Gerenciamento de Investidores' : 'Gerenciamento de Investimentos'}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === 'investors' 
                ? 'Gerencie investidores e leads do sistema'
                : 'Aprove e gerencie investimentos'
              }
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo {activeTab === 'investors' ? 'Investidor' : 'Investimento'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('investors')}
            className={`pb-2 px-1 font-medium text-sm ${
              activeTab === 'investors'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Investidores ({investors?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`pb-2 px-1 font-medium text-sm ${
              activeTab === 'investments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Investimentos ({investments?.length || 0})
          </button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Buscar ${activeTab === 'investors' ? 'investidores' : 'investimentos'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {activeTab === 'investors' ? (
                    <>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="interested">Interessado</SelectItem>
                      <SelectItem value="investor">Investidor</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                      <SelectItem value="paid">Pago</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {activeTab === 'investors' ? (
                <><User className="w-5 h-5" />Lista de Investidores</>
              ) : (
                <><DollarSign className="w-5 h-5" />Lista de Investimentos</>
              )}
            </CardTitle>
            <CardDescription>
              {activeTab === 'investors' 
                ? `${filteredInvestors.length} investidores encontrados`
                : `${filteredInvestments.length} investimentos encontrados`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingSpinner text="Carregando dados..." />
            ) : activeTab === 'investors' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell className="font-medium">{investor.full_name}</TableCell>
                      <TableCell>{investor.email}</TableCell>
                      <TableCell>{getStatusBadge(investor.status)}</TableCell>
                      <TableCell className="capitalize">{investor.lead_source.replace('_', ' ')}</TableCell>
                      <TableCell>{formatDate(investor.created_at)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investidor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestments.map((investment) => (
                    <TableRow key={investment.id}>
                      <TableCell className="font-medium">
                        {investment.investors?.full_name || 'N/A'}
                      </TableCell>
                      <TableCell>{formatCurrency(investment.amount)}</TableCell>
                      <TableCell>{getStatusBadge(investment.status)}</TableCell>
                      <TableCell>{formatDate(investment.created_at)}</TableCell>
                      <TableCell>
                        {investment.partners?.profile_id ? 'Sim' : 'Direto'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <InvestmentApprovalActions 
                            investmentId={investment.id}
                            currentStatus={investment.status}
                          />
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Detalhes
                          </Button>
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
    </AdminLayout>
  );
};

export default InvestorsManagement;
