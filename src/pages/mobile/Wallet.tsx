
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Star
} from "lucide-react";

const Wallet = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Entrega de Documentos',
      amount: 25.00,
      date: '2024-01-15',
      status: 'completed',
      client: 'João Silva'
    },
    {
      id: 2,
      type: 'credit',
      description: 'Corrida para Aeroporto',
      amount: 45.00,
      date: '2024-01-15',
      status: 'pending',
      client: 'Maria Santos'
    },
    {
      id: 3,
      type: 'debit',
      description: 'Transferência PIX',
      amount: -50.00,
      date: '2024-01-14',
      status: 'completed',
      client: 'Você'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/partner-dashboard')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <h1 className="text-xl font-light text-slate-700">Carteira Digital</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Saldo Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Saldo Disponível</p>
                  <h2 className="text-3xl font-light">R$ 1.247,50</h2>
                  <p className="text-blue-100">Pronto para saque</p>
                </div>
                <DollarSign className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Saldo Pendente</p>
                  <h2 className="text-3xl font-light">R$ 180,00</h2>
                  <p className="text-blue-100">Em aprovação</p>
                </div>
                <Clock className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 bg-blue-500 hover:bg-blue-600 shadow-sm">
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Transferir (PIX)
          </Button>
          <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50">
            <TrendingUp className="h-5 w-5 mr-2 text-slate-600" />
            Extrato
          </Button>
        </div>

        {/* Clube de Vantagens Banner */}
        <Card 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer shadow-sm"
          onClick={() => navigate('/mobile/rewards-club')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5" />
                  <h3 className="font-medium">Clube de Vantagens</h3>
                </div>
                <p className="text-blue-100">Nível Bronze - 85% para Prata</p>
                <p className="text-sm text-blue-200">Desbloqueie benefícios exclusivos!</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-blue-200 mx-auto mb-1" />
                <Badge className="bg-white text-blue-600 text-xs">
                  Novo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-medium text-slate-700">
              Histórico de Transações
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">{transactions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-blue-50 text-blue-500' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDownLeft className="h-4 w-4" /> : 
                      <ArrowUpRight className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{transaction.description}</p>
                    <p className="text-sm text-slate-500">{transaction.client}</p>
                    <p className="text-xs text-slate-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'credit' ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className={transaction.status === 'completed' ? 'bg-blue-500' : 'bg-slate-200 text-slate-600'}
                  >
                    {transaction.status === 'completed' ? 'Pago' : 'Pendente'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
