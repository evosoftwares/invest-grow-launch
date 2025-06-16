
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Navigation,
  Clock,
  DollarSign,
  Car,
  Users
} from "lucide-react";

const RideRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    vehicleType: 'economy'
  });

  const vehicleTypes = [
    {
      id: 'economy',
      name: 'Econômico',
      description: 'Carros compactos',
      price: 15.50,
      time: '5 min',
      icon: Car,
      passengers: 4
    },
    {
      id: 'comfort',
      name: 'Conforto',
      description: 'Carros sedãs',
      price: 22.00,
      time: '8 min',
      icon: Car,
      passengers: 4
    },
    {
      id: 'premium', 
      name: 'Premium',
      description: 'Carros de luxo',
      price: 35.00,
      time: '12 min',
      icon: Car,
      passengers: 4
    }
  ];

  const handleConfirmRide = () => {
    navigate('/mobile/ride-progress', { 
      state: { 
        pickup: formData.pickup, 
        destination: formData.destination,
        vehicleType: vehicleTypes.find(v => v.id === formData.vehicleType)
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/client-dashboard')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <h1 className="text-xl font-light text-slate-700">Solicitar Corrida</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Mapa Placeholder */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-t-lg">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-600">Mapa Interativo</p>
                <p className="text-sm text-slate-500">Sua localização atual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereços */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Trajeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pickup" className="text-slate-600 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Partida
              </Label>
              <Input
                id="pickup"
                placeholder="De onde você está saindo?"
                value={formData.pickup}
                onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                className="border-slate-200 focus:border-blue-300 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Destino
              </Label>
              <Input
                id="destination"
                placeholder="Para onde você vai?"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="border-slate-200 focus:border-blue-300 mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Opções de Veículo */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Escolha seu Veículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vehicleTypes.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.vehicleType === vehicle.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                onClick={() => setFormData({...formData, vehicleType: vehicle.id})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <vehicle.icon className="h-8 w-8 text-blue-500" />
                    <div>
                      <h4 className="font-medium text-slate-700">{vehicle.name}</h4>
                      <p className="text-sm text-slate-500">{vehicle.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{vehicle.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{vehicle.passengers}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-700">R$ {vehicle.price.toFixed(2)}</p>
                    <p className="text-sm text-slate-500">Estimativa</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resumo e Estimativas */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-medium text-slate-700">
                  R$ {vehicleTypes.find(v => v.id === formData.vehicleType)?.price.toFixed(2)}
                </p>
                <p className="text-sm text-slate-500">Preço estimado</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-medium text-slate-700">
                  {vehicleTypes.find(v => v.id === formData.vehicleType)?.time}
                </p>
                <p className="text-sm text-slate-500">Tempo de chegada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão Confirmar */}
        <Button
          onClick={handleConfirmRide}
          disabled={!formData.pickup || !formData.destination}
          className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-lg shadow-sm"
        >
          <Navigation className="h-5 w-5 mr-2" />
          Confirmar Corrida
        </Button>
      </div>
    </div>
  );
};

export default RideRequest;
