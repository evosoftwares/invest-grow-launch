
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const RideRequest = () => {
  const navigate = useNavigate();
  const [rideData, setRideData] = useState({
    pickup: '',
    destination: '',
    rideType: '',
    passengers: '1',
    notes: ''
  });

  const rideTypes = [
    { id: 'economy', name: 'Econômica', price: 'R$ 12,50', time: '5 min' },
    { id: 'comfort', name: 'Conforto', price: 'R$ 18,90', time: '3 min' },
    { id: 'premium', name: 'Premium', price: 'R$ 25,40', time: '2 min' }
  ];

  const handleRequestRide = () => {
    // Simulate ride request
    navigate('/mobile/ride-progress');
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
            <span>←</span>
          </Button>
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-6"
          />
          <h1 className="text-xl font-light text-slate-700">Solicitar Corrida</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Location Card */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <span className="text-blue-500">📍</span>
              Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-sm font-medium text-slate-700">
                Ponto de Partida
              </Label>
              <Input
                id="pickup"
                placeholder="Digite o endereço de partida"
                value={rideData.pickup}
                onChange={(e) => setRideData({...rideData, pickup: e.target.value})}
                className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium text-slate-700">
                Destino
              </Label>
              <Input
                id="destination"
                placeholder="Para onde você quer ir?"
                value={rideData.destination}
                onChange={(e) => setRideData({...rideData, destination: e.target.value})}
                className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ride Type Selection */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <span className="text-blue-500">🚗</span>
              Tipo de Corrida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rideTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  rideData.rideType === type.id
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setRideData({...rideData, rideType: type.id})}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">{type.name}</h4>
                    <p className="text-sm text-slate-500">Chegada em ~{type.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-blue-600">{type.price}</p>
                    {rideData.rideType === type.id && (
                      <Badge className="bg-blue-500 text-white">Selecionado</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <span className="text-blue-500">⚙️</span>
              Opções Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-sm font-medium text-slate-700">
                Número de Passageiros
              </Label>
              <Select
                value={rideData.passengers}
                onValueChange={(value) => setRideData({...rideData, passengers: value})}
              >
                <SelectTrigger className="w-full border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white h-11">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 shadow-lg">
                  <SelectItem value="1">1 passageiro</SelectItem>
                  <SelectItem value="2">2 passageiros</SelectItem>
                  <SelectItem value="3">3 passageiros</SelectItem>
                  <SelectItem value="4">4 passageiros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                Observações (opcional)
              </Label>
              <Input
                id="notes"
                placeholder="Ex: Preciso de ajuda com bagagem"
                value={rideData.notes}
                onChange={(e) => setRideData({...rideData, notes: e.target.value})}
                className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <div>
                  <p className="font-medium text-slate-700">Método de Pagamento</p>
                  <p className="text-sm text-slate-500">Saldo em carteira</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Request Button */}
        <Button
          onClick={handleRequestRide}
          disabled={!rideData.pickup || !rideData.destination || !rideData.rideType}
          className={`w-full h-14 text-lg shadow-sm ${
            rideData.pickup && rideData.destination && rideData.rideType
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          <span className="mr-2">🚗</span>
          Solicitar Corrida
        </Button>
      </div>
    </div>
  );
};

export default RideRequest;
