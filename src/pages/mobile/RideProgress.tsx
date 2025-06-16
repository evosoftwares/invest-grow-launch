
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const RideProgress = () => {
  const navigate = useNavigate();
  const [rideStatus, setRideStatus] = useState('searching'); // searching, found, arriving, in-progress, completed
  const [estimatedTime, setEstimatedTime] = useState(5);

  const driver = {
    name: "Carlos Silva",
    rating: 4.9,
    car: "Honda Civic Prata",
    plate: "ABC-1234",
    phone: "(11) 99999-9999"
  };

  const rideInfo = {
    pickup: "Rua das Flores, 123 - Centro",
    destination: "Aeroporto Internacional",
    price: "R$ 18,90",
    distance: "12 km",
    type: "Conforto"
  };

  useEffect(() => {
    const statusProgression = ['searching', 'found', 'arriving', 'in-progress', 'completed'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statusProgression.length) {
        setRideStatus(statusProgression[currentIndex]);
        if (statusProgression[currentIndex] === 'arriving') {
          setEstimatedTime(2);
        }
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'searching':
        return 'Procurando motorista...';
      case 'found':
        return 'Motorista encontrado!';
      case 'arriving':
        return 'Motorista a caminho';
      case 'in-progress':
        return 'Corrida em andamento';
      case 'completed':
        return 'Corrida finalizada';
      default:
        return 'Processando...';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'searching':
        return 'bg-blue-500';
      case 'found':
        return 'bg-green-500';
      case 'arriving':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-blue-600';
      case 'completed':
        return 'bg-green-600';
      default:
        return 'bg-slate-500';
    }
  };

  const handleCompleteRide = () => {
    navigate('/mobile/client-dashboard');
  };

  const handleCancelRide = () => {
    navigate('/mobile/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-6"
            />
            <h1 className="text-xl font-light text-slate-700">Corrida</h1>
          </div>
          {rideStatus !== 'completed' && rideStatus !== 'searching' && (
            <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50">
              <span>📞</span>
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card className={`${getStatusColor()} text-white shadow-sm`}>
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              {rideStatus === 'searching' && <div className="text-4xl">🔍</div>}
              {rideStatus === 'found' && <div className="text-4xl">✅</div>}
              {rideStatus === 'arriving' && <div className="text-4xl">🚗</div>}
              {rideStatus === 'in-progress' && <div className="text-4xl">🛣️</div>}
              {rideStatus === 'completed' && <div className="text-4xl">🏁</div>}
            </div>
            <h2 className="text-2xl font-light mb-2">{getStatusMessage()}</h2>
            {(rideStatus === 'searching' || rideStatus === 'arriving') && (
              <p className="opacity-90">Tempo estimado: {estimatedTime} min</p>
            )}
          </CardContent>
        </Card>

        {/* Driver Info - Show after found */}
        {rideStatus !== 'searching' && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
                <span className="text-blue-500">👤</span>
                Seu Motorista
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-700">{driver.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-400">⭐</span>
                    <span className="text-sm text-slate-500">{driver.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{driver.car}</p>
                  <p className="text-sm text-slate-500">{driver.plate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ride Details */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <span className="text-blue-500">📍</span>
              Detalhes da Corrida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-slate-500">Partida</p>
                  <p className="font-medium text-slate-700">{rideInfo.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-slate-500">Destino</p>
                  <p className="font-medium text-slate-700">{rideInfo.destination}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div>
                <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                  {rideInfo.type}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-blue-600">{rideInfo.price}</p>
                <p className="text-sm text-slate-500">{rideInfo.distance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tracking */}
        {(rideStatus === 'arriving' || rideStatus === 'in-progress') && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <span className="text-slate-400 text-2xl">🗺️</span>
                  <p className="text-sm text-slate-500 mt-2">Mapa em tempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {rideStatus === 'completed' ? (
            <Button
              onClick={handleCompleteRide}
              className="w-full h-14 bg-green-500 hover:bg-green-600 text-lg shadow-sm"
            >
              <span className="mr-2">⭐</span>
              Avaliar Corrida
            </Button>
          ) : rideStatus === 'searching' ? (
            <Button
              onClick={handleCancelRide}
              variant="outline"
              className="w-full h-14 border-red-200 text-red-600 hover:bg-red-50 text-lg shadow-sm"
            >
              Cancelar Solicitação
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50">
                <span className="mr-2">💬</span>
                Chat
              </Button>
              <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50">
                <span className="mr-2">📞</span>
                Ligar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideProgress;
