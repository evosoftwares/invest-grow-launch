
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Wallet, 
  TrendingUp, 
  MapPin, 
  Star, 
  Clock,
  DollarSign,
  Target,
  Award
} from "lucide-react";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light text-slate-700">Dashboard</h1>
            <p className="text-slate-500">Olá, João!</p>
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
        {/* Saldo em Carteira - Card de Destaque */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo em Carteira</p>
                <h2 className="text-3xl font-light">R$ 1.247,50</h2>
                <p className="text-blue-100">+R$ 150,00 hoje</p>
              </div>
              <Wallet className="h-12 w-12 text-blue-200" />
            </div>
            <Button 
              onClick={() => navigate('/mobile/wallet')}
              variant="secondary" 
              className="w-full mt-4 bg-white/90 text-blue-600 hover:bg-white"
            >
              Ver Carteira
            </Button>
          </CardContent>
        </Card>

        {/* Card de Status Inteligente */}
        <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-blue-700">Status: Online</p>
                <p className="text-sm text-blue-600">Você tem 5 oportunidades próximas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo do Dia */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-light text-slate-700">R$ 150</p>
              <p className="text-sm text-slate-500">Ganhos Hoje</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-light text-slate-700">3</p>
              <p className="text-sm text-slate-500">Missões</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-light text-slate-700">4.8</p>
              <p className="text-sm text-slate-500">Avaliação</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-light text-slate-700">6h</p>
              <p className="text-sm text-slate-500">Online</p>
            </CardContent>
          </Card>
        </div>

        {/* Atalhos Principais */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/mobile/feed-opportunities')}
            className="w-full h-14 bg-blue-500 hover:bg-blue-600 flex items-center justify-between px-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Feed de Oportunidades</p>
                <p className="text-sm opacity-90">5 missões disponíveis</p>
              </div>
            </div>
            <Badge className="bg-white text-blue-600">Nova</Badge>
          </Button>

          <Button
            onClick={() => navigate('/mobile/rewards-club')}
            variant="outline"
            className="w-full h-14 flex items-center justify-between px-6 border-slate-200 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-blue-500" />
              <div className="text-left">
                <p className="font-medium text-slate-700">Clube de Vantagens</p>
                <p className="text-sm text-slate-500">Nível Bronze</p>
              </div>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </Button>
        </div>

        {/* Menu de Navegação Rápida */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50"
            onClick={() => navigate('/mobile/partner-profile')}
          >
            Meu Perfil
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 hover:bg-slate-50"
            onClick={() => navigate('/mobile/mission-history')}
          >
            Histórico
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
