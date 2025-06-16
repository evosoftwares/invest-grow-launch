
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-gray-600">Olá, João!</p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Saldo em Carteira - Card de Destaque */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo em Carteira</p>
                <h2 className="text-3xl font-bold">R$ 1.247,50</h2>
                <p className="text-blue-100">+R$ 150,00 hoje</p>
              </div>
              <Wallet className="h-12 w-12 text-blue-200" />
            </div>
            <Button 
              onClick={() => navigate('/mobile/wallet')}
              variant="secondary" 
              className="w-full mt-4"
            >
              Ver Carteira
            </Button>
          </CardContent>
        </Card>

        {/* Card de Status Inteligente */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-green-800">Status: Online</p>
                <p className="text-sm text-green-600">Você tem 5 oportunidades próximas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo do Dia */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">R$ 150</p>
              <p className="text-sm text-gray-600">Ganhos Hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-600">Missões</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-gray-600">Avaliação</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">6h</p>
              <p className="text-sm text-gray-600">Online</p>
            </CardContent>
          </Card>
        </div>

        {/* Atalhos Principais */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/mobile/feed-opportunities')}
            className="w-full h-14 bg-orange-600 hover:bg-orange-700 flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Feed de Oportunidades</p>
                <p className="text-sm opacity-90">5 missões disponíveis</p>
              </div>
            </div>
            <Badge className="bg-white text-orange-600">Nova</Badge>
          </Button>

          <Button
            onClick={() => navigate('/mobile/rewards-club')}
            variant="outline"
            className="w-full h-14 flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-600" />
              <div className="text-left">
                <p className="font-semibold">Clube de Vantagens</p>
                <p className="text-sm text-gray-600">Nível Bronze</p>
              </div>
            </div>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        {/* Menu de Navegação Rápida */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12"
            onClick={() => navigate('/mobile/partner-profile')}
          >
            Meu Perfil
          </Button>
          <Button 
            variant="outline" 
            className="h-12"
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
