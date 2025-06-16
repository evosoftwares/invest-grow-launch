import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  Search, 
  CheckCircle2, 
  Car, 
  Route, 
  Flag, 
  User, 
  Star, 
  MapPin, 
  Map,
  MessageSquare,
  CircleDot,
  LocateFixed,
  X
} from 'lucide-react';

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

  // Simulação da progressão do status da corrida
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
    }, 4000); // Aumentado para 4s para melhor visualização

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = () => {
    switch (rideStatus) {
      case 'searching':
        return { message: 'Procurando motorista...', Icon: Search, color: 'bg-blue-500' };
      case 'found':
        return { message: 'Motorista encontrado!', Icon: CheckCircle2, color: 'bg-green-500' };
      case 'arriving':
        return { message: 'Motorista a caminho', Icon: Car, color: 'bg-blue-500' };
      case 'in-progress':
        return { message: 'Corrida em andamento', Icon: Route, color: 'bg-blue-600' };
      case 'completed':
        return { message: 'Corrida finalizada', Icon: Flag, color: 'bg-green-600' };
      default:
        return { message: 'Processando...', Icon: Search, color: 'bg-slate-500' };
    }
  };

  const { message: statusMessage, Icon: StatusIcon, color: statusColor } = getStatusInfo();

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
            <h1 className="text-xl font-light text-slate-700">Andamento da Corrida</h1>
          </div>
          {rideStatus !== 'completed' && rideStatus !== 'searching' && (
            <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50">
              <Phone className="h-5 w-5 text-slate-600" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 pb-6">
        {/* Status Card */}
        <Card className={`${statusColor} text-white shadow-lg`}>
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <StatusIcon className="h-10 w-10" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-light mb-2">{statusMessage}</h2>
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
                <User className="h-5 w-5 text-blue-500" />
                Seu Motorista
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-medium">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800">{driver.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium">{driver.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{driver.car}</p>
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
              <MapPin className="h-5 w-5 text-blue-500" />
              Detalhes da Corrida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CircleDot className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Partida</p>
                  <p className="font-medium text-slate-700">{rideInfo.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LocateFixed className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Destino</p>
                  <p className="font-medium text-slate-700">{rideInfo.destination}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700">
                {rideInfo.type}
              </Badge>
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
                <div className="text-center text-slate-500">
                  <Map className="h-8 w-8 mx-auto" />
                  <p className="text-sm mt-2">Mapa em tempo real (simulado)</p>
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
              className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-lg font-semibold text-white shadow-sm flex items-center gap-2"
            >
              <Star className="h-6 w-6" />
              Avaliar Corrida
            </Button>
          ) : rideStatus === 'searching' ? (
            <Button
              onClick={handleCancelRide}
              variant="outline"
              className="w-full h-14 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 text-base font-semibold shadow-sm flex items-center gap-2"
            >
              <X className="h-5 w-5" />
              Cancelar Solicitação
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat
              </Button>
              <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50 flex items-center gap-2">
                <Phone className="h-5 w-5" />
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