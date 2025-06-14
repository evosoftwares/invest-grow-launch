
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
  Calendar,
  FileText
} from "lucide-react";

const ReportsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
            <p className="text-gray-600">Análises detalhadas de performance e captação</p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="30days">
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Relatório de Captação</p>
                  <p className="text-xs text-gray-500 mt-1">Performance mensal</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Relatório de Investidores</p>
                  <p className="text-xs text-gray-500 mt-1">Análise de perfil</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Relatório de Parceiros</p>
                  <p className="text-xs text-gray-500 mt-1">Performance e comissões</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Relatório Financeiro</p>
                  <p className="text-xs text-gray-500 mt-1">Fluxo de caixa</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Target className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance de Captação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Janeiro 2024</p>
                    <p className="text-sm text-gray-600">127 investidores</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">R$ 2.45M</p>
                    <p className="text-sm text-green-600">↗ +12.5%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Dezembro 2023</p>
                    <p className="text-sm text-gray-600">98 investidores</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">R$ 2.18M</p>
                    <p className="text-sm text-blue-600">↗ +8.2%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium">Novembro 2023</p>
                    <p className="text-sm text-gray-600">89 investidores</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">R$ 2.01M</p>
                    <p className="text-sm text-purple-600">↗ +5.1%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Site Direto</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">45%</p>
                    <p className="text-sm text-gray-500">R$ 1.1M</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Parceiros</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">35%</p>
                    <p className="text-sm text-gray-500">R$ 857K</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span>Indicações</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">15%</p>
                    <p className="text-sm text-gray-500">R$ 367K</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Marketing Digital</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">5%</p>
                    <p className="text-sm text-gray-500">R$ 122K</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,250</div>
                <div className="text-sm text-gray-600">Visitantes</div>
                <div className="text-xs text-gray-500 mt-1">100%</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">385</div>
                <div className="text-sm text-gray-600">Leads</div>
                <div className="text-xs text-gray-500 mt-1">30.8%</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">198</div>
                <div className="text-sm text-gray-600">Interessados</div>
                <div className="text-xs text-gray-500 mt-1">51.4%</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Propostas</div>
                <div className="text-xs text-gray-500 mt-1">78.8%</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">127</div>
                <div className="text-sm text-gray-600">Investidores</div>
                <div className="text-xs text-gray-500 mt-1">81.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Parceiros (Últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Carlos Vendedor</p>
                    <p className="text-sm text-gray-500">15 indicações</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ 850K</p>
                  <p className="text-sm text-gray-500">R$ 42.5K comissão</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Ana Promotora</p>
                    <p className="text-sm text-gray-500">8 indicações</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ 450K</p>
                  <p className="text-sm text-gray-500">R$ 22.5K comissão</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Julia Santos</p>
                    <p className="text-sm text-gray-500">5 indicações</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ 200K</p>
                  <p className="text-sm text-gray-500">R$ 10K comissão</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
