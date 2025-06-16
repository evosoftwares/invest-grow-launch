import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Plus, Minus, Shield, Clock } from "lucide-react";
const ClientFinance = () => {
  const navigate = useNavigate();
  const transactions = [{
    id: 1,
    type: 'debit',
    description: 'Pagamento - Entrega de Documentos',
    amount: -25.00,
    date: '2024-01-15',
    status: 'completed',
    partner: 'João Silva'
  }, {
    id: 2,
    type: 'credit',
    description: 'Recarga de Saldo',
    amount: 200.00,
    date: '2024-01-15',
    status: 'completed',
    partner: 'PIX'
  }, {
    id: 3,
    type: 'debit',
    description: 'Pagamento - Corrida Aeroporto',
    amount: -45.00,
    date: '2024-01-14',
    status: 'pending',
    partner: 'Maria Santos'
  }, {
    id: 4,
    type: 'credit',
    description: 'Reembolso Missão Cancelada',
    amount: 30.00,
    date: '2024-01-13',
    status: 'completed',
    partner: 'Sistema'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/mobile/client-dashboard')} className="hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <h1 className="text-xl font-light text-slate-700">Gestão Financeira</h1>
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
                  <h2 className="text-3xl font-light">R$ 850,00</h2>
                  <p className="text-blue-100">Para novas missões</p>
                </div>
                <Wallet className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Em Garantia (Escrow)</p>
                  <h2 className="text-3xl font-light">R$ 120,00</h2>
                  <p className="text-blue-100">Aguardando aprovação</p>
                </div>
                <Shield className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 bg-blue-500 hover:bg-blue-600 shadow-sm">
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Fundos
          </Button>
          <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50">
            <Minus className="h-5 w-5 mr-2 text-slate-600" />
            Retirar Fundos
          </Button>
        </div>

        {/* Resumo Mensal */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Resumo do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="font-light text-slate-700 text-base">R$ 450,00</p>
                <p className="text-sm text-slate-500">Total Gasto</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-light text-slate-700">18</p>
                <p className="text-sm text-slate-500">Transações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extrato Detalhado */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-medium text-slate-700">
              Extrato Detalhado
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
                {transactions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map(transaction => <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-500'}`}>
                    {transaction.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{transaction.description}</p>
                    <p className="text-sm text-slate-500">{transaction.partner}</p>
                    <p className="text-xs text-slate-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === 'credit' ? 'text-blue-600' : 'text-slate-600'}`}>
                    {transaction.type === 'credit' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className={transaction.status === 'completed' ? 'bg-blue-500' : 'bg-slate-200 text-slate-600'}>
                    {transaction.status === 'completed' ? 'Pago' : 'Pendente'}
                  </Badge>
                </div>
              </div>)}
          </CardContent>
        </Card>

        {/* Métodos de Pagamento */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Métodos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PIX</span>
                </div>
                <div>
                  <p className="font-medium text-slate-700">PIX</p>
                  <p className="text-sm text-slate-500">Instantâneo</p>
                </div>
              </div>
              <Badge className="bg-blue-50 text-blue-600 border-blue-200">Principal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-300 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">••••</span>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Cartão •••• 1234</p>
                  <p className="text-sm text-slate-500">Visa</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default ClientFinance;