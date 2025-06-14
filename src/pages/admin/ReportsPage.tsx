
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Loader2,
  FileText
} from "lucide-react";
import { useReportsData } from "@/hooks/useReportsData";
import { InvestmentChart } from "@/components/reports/InvestmentChart";
import { ChannelAnalysisChart } from "@/components/reports/ChannelAnalysisChart";
import { ConversionFunnelChart } from "@/components/reports/ConversionFunnelChart";
import { toast } from "@/components/ui/use-toast";

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const { data: reportsData, isLoading, error } = useReportsData(timeRange);

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "O relatório será gerado e enviado por email em breve.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">Erro ao carregar dados dos relatórios</p>
            <p className="text-gray-500">{error.message}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
            <p className="text-gray-600">Análises detalhadas de performance e captação</p>
          </div>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            Carregando relatórios...
          </div>
        ) : reportsData ? (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Captado</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(reportsData.investmentStats.totalCaptured)}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Investimentos Ativos</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {reportsData.conversionFunnel.investors}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {reportsData.conversionFunnel.leads > 0 ? 
                          ((reportsData.conversionFunnel.investors / reportsData.conversionFunnel.leads) * 100).toFixed(1) : 0
                        }%
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Crescimento</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {reportsData.monthlyInvestments.length > 1 ? 
                          reportsData.monthlyInvestments[reportsData.monthlyInvestments.length - 1].growth.toFixed(1) : 0
                        }%
                      </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <InvestmentChart data={reportsData.monthlyInvestments} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChannelAnalysisChart data={reportsData.channelAnalysis} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance de Captação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportsData.monthlyInvestments.slice(-3).map((month, index) => (
                      <div key={month.month} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-gray-600">{month.investorCount} investidores</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(month.totalAmount)}
                          </p>
                          <p className={`text-sm ${month.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {month.growth >= 0 ? '↗' : '↘'} {Math.abs(month.growth).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Funnel */}
            <ConversionFunnelChart data={reportsData.conversionFunnel} />

            {/* Top Partners */}
            {reportsData.topPartners.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Top Parceiros (Período Selecionado)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportsData.topPartners.slice(0, 5).map((partner, index) => (
                      <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{partner.name}</p>
                            <p className="text-sm text-gray-500">{partner.referrals} indicações</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(partner.totalAmount)}</p>
                          <p className="text-sm text-gray-500">{formatCurrency(partner.commission)} comissão</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum dado disponível para o período selecionado</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
