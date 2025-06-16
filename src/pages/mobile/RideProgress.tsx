
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Phone, 
  MessageSquare, 
  Share2,
  AlertTriangle,
  Navigation,
  Star,
  Clock,
  MapPin
} from "lucide-react";

const RideProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('searching'); // searching, found, pickup, progress, completed
  const [estimatedTime, setEstimatedTime] = useState(12);

  const rideData = location.state || {
    pickup: 'Rua das Flores, 123',
    destination: 'Shopping Center Norte',
    vehicleType: { name: 'Econômico', price: 15.50 }
  };

  const partner = {
    name: 'Carlos Silva',
    rating: 4.9,
    vehicle: 'Honda Civic Prata',
    plate: 'ABC-1234',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  };

  const steps = [
    { id: 'searching', label: 'Procurando motorista...', color: 'bg-blue-500' },
    { id: 'found', label: 'Motorista encontrado!', color: 'bg-blue-500' },
    { id: 'pickup', label: 'Indo até você', color: 'bg-blue-500' }, 
    { id: 'progress', label: 'Em rota para destino', color: 'bg-blue-500' },
    { id: 'completed', label: 'Corrida finalizada', color: 'bg-green-500' }
  ];

  useEffect(() => {
    // Simulate ride progress
    const progressTimer = setTimeout(() => {
      if (currentStep === 'searching') setCurrentStep('found');
      else if (currentStep === 'found') setCurrentStep('pickup');
      else if (currentStep === 'pickup') setCurrentStep('progress');
    }, 3000);

    return () => clearTimeout(progressTimer);
  }, [currentStep]);

  useEffect(() => {
    // Simulate time countdown
    if (estimatedTime > 0 && currentStep !== 'completed') {
      const timeTimer = setTimeout(() => {
        setEstimatedTime(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute

      return () => clearTimeout(timeTimer);
    }
  }, [estimatedTime, currentStep]);

  const handleEmergency = () => {
    alert('Contatos de emergência foram notificados e sua localização foi compartilhada.');
  };

  const handleShareRoute = () => {
    alert('Rota compartilhada com seus contatos de confiança.');
  };

  const getCurrentStepInfo = () => {
    const step = steps.find(s => s.id === currentStep);
    return step || steps[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Status Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="text-center">
          <div className={`w-4 h-4 ${getCurrentStepInfo().color} rounded-full mx-auto mb-2 animate-pulse`}></div>
          <h1 className="text-lg font-medium text-slate-700">{getCurrentStepInfo().label}</h1>
          {estimatedTime > 0 && (
            <p className="text-slate-500">Chegada em {estimatedTime} min</p>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Mapa em Tempo Real */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-lg relative">
              <div className="text-center">
                <Navigation className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-600 font-medium">Trajeto em Tempo Real</p>
                <p className="text-sm text-slate-500 mt-1">
                  {rideData.pickup} → {rideData.destination}
                </p>
              </div>
              
              {/* Simulation of moving elements */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Você</span>
                </div>
              </div>
              
              {currentStep !== 'searching' && (
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-600">{partner.name}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info do Parceiro */}
        {currentStep !== 'searching' && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={partner.photo} 
                  alt={partner.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-slate-700">{partner.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-slate-600">{partner.rating}</span>
                    <span className="text-xs text-slate-500">• Motorista</span>
                  </div>
                  <p className="text-sm text-slate-500">{partner.vehicle}</p>
                  <Badge variant="outline" className="text-xs mt-1">{partner.plate}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-10 w-10 border-slate-200">
                    <Phone className="h-4 w-4 text-slate-600" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 border-slate-200">
                    <MessageSquare className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detalhes da Corrida */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Detalhes da Corrida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-slate-700">Partida</p>
                <p className="text-sm text-slate-500">{rideData.pickup}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-500 mt-1" />
              <div>
                <p className="font-medium text-slate-700">Destino</p>
                <p className="text-sm text-slate-500">{rideData.destination}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-slate-600">Valor estimado:</span>
              <span className="font-medium text-slate-700">R$ {rideData.vehicleType.price.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Painel de Segurança */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
              Painel de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleShareRoute}
              variant="outline"
              className="w-full h-12 border-slate-200 hover:bg-slate-50"
            >
              <Share2 className="h-4 w-4 mr-2 text-slate-600" />
              Compartilhar Rota
            </Button>
            <Button
              onClick={handleEmergency}
              variant="outline"
              className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Botão de Emergência
            </Button>
          </CardContent>
        </Card>

        {/* Botão de Ação */}
        {currentStep === 'completed' ? (
          <Button
            onClick={() => navigate('/mobile/client-dashboard')}
            className="w-full h-14 bg-green-500 hover:bg-green-600 text-lg shadow-sm"
          >
            Avaliar Corrida
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/mobile/client-dashboard')}
            variant="outline"
            className="w-full h-14 border-slate-200 hover:bg-slate-50"
          >
            Cancelar Corrida
          </Button>
        )}
      </div>
    </div>
  );
};

export default RideProgress;
