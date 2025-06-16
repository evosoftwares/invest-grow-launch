import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Briefcase,
  Clock,
  CheckCircle,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Plus,
  Car,
  CreditCard,
  ArrowUpRight,  // Ícone para pagamentos (saídas)
  ArrowDownLeft, // Ícone para recargas/reembolsos (entradas)
} from "lucide-react";

// --- Dados de Exemplo para o Extrato ---
const transactions = [
  {
    type: 'payment',
    description: 'Pagamento - Entrega de Documentos',
    actor: 'João Silva',
    date: '2024-01-15',
    amount: '25.00',
    status: 'paid'
  },
  {
    type: 'credit',
    description: 'Recarga de Saldo',
    actor: 'PIX',
    date: '2024-01-15',
    amount: '200.00',
    status: 'paid'
  },
  {
    type: 'payment',
    description: 'Pagamento - Corrida Aeroporto',
    actor: 'Maria Santos',
    date: '2024-01-14',
    amount: '45.00',
    status: 'pending'
  },
  {
    type: 'credit',
    description: 'Reembolso Missão Cancelada',
    actor: 'Sistema',
    date: '2024-01-13',
    amount: '30.00',
    status: 'paid'
  }
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png"
              alt="Logo"
              className="h-8"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-slate-700 truncate">Dashboard Cliente</h1>
              <p className="text-sm text-slate-500">Olá, Maria!</p>
            </div>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-500">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Saldo em Garantia (Escrow) */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100">Saldo em Garantia</p>
                <h2 className="text-3xl sm:text-4xl font-light whitespace-nowrap">R$ 850,00</h2>
                <p className="text-blue-100 text-sm">Disponível para missões</p>
              </div>
              <Briefcase className="h-10 w-10 text-blue-200" />
            </div>
            <Button
              onClick={() => navigate('/mobile/client-finance')}
              variant="secondary"
              className="w-full mt-4 bg-white/90 text-blue-600 hover:bg-white"
            >
              Gerenciar Fundos
            </Button>
          </CardContent>
        </Card>

        {/* --- NOVO: Seção de Extrato Detalhado --- */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-light text-slate-700">Extrato Detalhado</CardTitle>
              <Badge variant="secondary">{transactions.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((item, index) => (
                <div key={index} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  {/* Ícone e Descrição */}
                  <div className="flex items-start gap-3 flex-grow min-w-0">
                    <div className="flex-shrink-0 mt-1">
                      {item.type === 'credit' ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-slate-800 truncate">{item.description}</p>
                      <p className="text-sm text-slate-500">{item.actor}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  </div>

                  {/* Valor e Status */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-lg ${item.type === 'credit' ? 'text-green-600' : 'text-slate-800'} whitespace-nowrap`}>
                      {item.type === 'credit' ? `+R$ ${item.amount}` : `R$ ${item.amount}`}
                    </p>
                    {item.status === 'paid' ? (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Pago</Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">Pendente</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Aprovações Pendentes */}
        <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-700">2 Aprovações Pendentes</p>
                  <p className="text-sm text-blue-600">Revisar trabalhos concluídos</p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/mobile/task-approval')}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 flex-shrink-0"
              >
                Revisar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botão Principal */}
        <Button
          onClick={() => navigate('/mobile/publish-mission')}
          className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-base sm:text-lg shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Publicar Nova Missão
        </Button>

        {/* Atalhos */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
            onClick={() => navigate('/mobile/ride-request')}
          >
            <Car className="h-4 w-4 mr-2" />
            <span className="text-sm">Solicitar Corrida</span>
          </Button>
          <Button
            variant="outline"
            className="h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
            onClick={() => navigate('/mobile/client-finance')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
             <span className="text-sm">Financeiro</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;