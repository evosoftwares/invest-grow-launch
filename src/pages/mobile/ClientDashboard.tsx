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
  DollarSign
} from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-8 flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-light text-slate-700 truncate">Dashboard Cliente</h1>
              <p className="text-slate-500 text-sm truncate">Olá, Maria!</p>
            </div>
          </div>
          <div className="relative flex-shrink-0">
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
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-100 text-sm">Saldo em Garantia</p>
                <h2 className="text-2xl sm:text-3xl font-light truncate">R$ 850,00</h2>
                <p className="text-blue-100 text-xs sm:text-sm">Disponível para missões</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 text-blue-200" />
              </div>
            </div>
            <Button 
              onClick={() => navigate('/mobile/client-finance')}
              variant="secondary" 
              className="w-full mt-4 bg-white/90 text-blue-600 hover:bg-white text-sm sm:text-base"
            >
              Gerenciar Fundos
            </Button>
          </CardContent>
        </Card>

        {/* Status das Operações */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="mb-2">
                <Clock className="h-6 w-6 text-blue-500 mx-auto" />
              </div>
              <p className="text-xl sm:text-2xl font-light text-slate-700">3</p>
              <p className="text-xs sm:text-sm text-slate-500 truncate">Pendentes</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="mb-2">
                <CheckCircle className="h-6 w-6 text-blue-500 mx-auto" />
              </div>
              <p className="text-xl sm:text-2xl font-light text-slate-700">12</p>
              <p className="text-xs sm:text-sm text-slate-500 truncate">Concluídas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="mb-2">
                <BarChart3 className="h-6 w-6 text-blue-400 mx-auto" />
              </div>
              <p className="text-xl sm:text-2xl font-light text-slate-700">4.9</p>
              <p className="text-xs sm:text-sm text-slate-500 truncate">Satisfação</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="mb-2">
                <TrendingUp className="h-6 w-6 text-blue-500 mx-auto" />
              </div>
              <p className="text-xl sm:text-2xl font-light text-slate-700">85%</p>
              <p className="text-xs sm:text-sm text-slate-500 truncate">Taxa Sucesso</p>
            </CardContent>
          </Card>
        </div>

        {/* Aprovações Pendentes */}
        <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-blue-700 text-sm sm:text-base truncate">2 Aprovações Pendentes</p>
                  <p className="text-xs sm:text-sm text-blue-600 truncate">Revisar trabalhos concluídos</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/mobile/task-approval')}
                size="sm" 
                className="bg-blue-500 hover:bg-blue-600 flex-shrink-0 text-xs sm:text-sm"
              >
                Revisar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botão Principal */}
        <Button
          onClick={() => navigate('/mobile/publish-mission')}
          className="w-full h-14 sm:h-16 bg-blue-500 hover:bg-blue-600 text-base sm:text-lg shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span className="truncate">Publicar Nova Missão</span>
        </Button>

        {/* Atalhos */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
            onClick={() => navigate('/mobile/ride-request')}
          >
            <Car className="h-4 w-4 mr-2" />
            <span className="truncate">Solicitar Corrida</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
            onClick={() => navigate('/mobile/client-finance')}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="truncate">Financeiro</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;