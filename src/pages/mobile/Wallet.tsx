
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/partner-dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Carteira Digital</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Saldo Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Saldo Disponível</p>
                  <h2 className="text-3xl font-bold">R$ 1.247,50</h2>
                  <p className="text-green-100">Pronto para saque</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Saldo Pendente</p>
                  <h2 className="text-3xl font-bold">R$ 180,00</h2>
                  <p className="text-yellow-100">Em aprovação</p>
                </div>
                <Clock className="h-12 w-12 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 bg-blue-600 hover:bg-blue-700">
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Transferir (PIX)
          </Button>
          <Button variant="outline" className="h-14">
            <TrendingUp className="h-5 w-5 mr-2" />
            Extrato
          </Button>
        </div>

        {/* Clube de Vantagens Banner */}
        <Card 
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white cursor-pointer"
          onClick={() => navigate('/mobile/rewards-club')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5" />
                  <h3 className="font-semibold">Clube de Vantagens</h3>
                </div>
                <p className="text-purple-100">Nível Bronze - 85% para Prata</p>
                <p className="text-sm text-purple-200">Desbloqueie benefícios exclusivos!</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-yellow-300 mx-auto mb-1" />
                <Badge className="bg-white text-purple-600 text-xs">
                  Novo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Histórico de Transações
              <Badge variant="secondary">{transactions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDownLeft className="h-4 w-4" /> : 
                      <ArrowUpRight className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.client}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
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
