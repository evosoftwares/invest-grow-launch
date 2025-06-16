
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-8"
            />
            <div>
              <h1 className="text-xl font-light text-slate-700">Dashboard Cliente</h1>
              <p className="text-slate-500">Olá, Maria!</p>
            </div>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <span className="text-slate-600">🔔</span>
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
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo em Garantia</p>
                <h2 className="text-3xl font-light">R$ 850,00</h2>
                <p className="text-blue-100">Disponível para missões</p>
              </div>
              <div className="text-blue-200 text-4xl">💼</div>
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

        {/* Status das Operações */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-blue-500 text-2xl mb-2">⏳</div>
              <p className="text-2xl font-light text-slate-700">3</p>
              <p className="text-sm text-slate-500">Pendentes</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-blue-500 text-2xl mb-2">✅</div>
              <p className="text-2xl font-light text-slate-700">12</p>
              <p className="text-sm text-slate-500">Concluídas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-blue-400 text-2xl mb-2">📊</div>
              <p className="text-2xl font-light text-slate-700">4.9</p>
              <p className="text-sm text-slate-500">Satisfação</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-blue-500 text-2xl mb-2">📈</div>
              <p className="text-2xl font-light text-slate-700">85%</p>
              <p className="text-sm text-slate-500">Taxa Sucesso</p>
            </CardContent>
          </Card>
        </div>

        {/* Aprovações Pendentes */}
        <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-blue-500 text-xl">⚠️</div>
                <div>
                  <p className="font-medium text-blue-700">2 Aprovações Pendentes</p>
                  <p className="text-sm text-blue-600">Revisar trabalhos concluídos</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/mobile/task-approval')}
                size="sm" 
                className="bg-blue-500 hover:bg-blue-600"
              >
                Revisar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botão Principal */}
        <Button
          onClick={() => navigate('/mobile/publish-mission')}
          className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-lg shadow-sm"
        >
          <span className="mr-2">➕</span>
          Publicar Nova Missão
        </Button>

        {/* Atalhos */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50"
            onClick={() => navigate('/mobile/ride-request')}
          >
            Solicitar Corrida
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50"
            onClick={() => navigate('/mobile/client-finance')}
          >
            Financeiro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
