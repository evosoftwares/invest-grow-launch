
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  User,
  Phone,
  Star,
  Package,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const MissionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const mission = {
    id: 1,
    title: "Entrega de Documentos",
    description: "Preciso de alguém para buscar documentos no cartório e entregar no escritório de advocacia. É urgente e precisa ser feito hoje antes das 17h.",
    client: "João Silva",
    rating: 4.9,
    value: 25.00,
    distance: "2.5 km",
    estimatedTime: "30 min",
    address: "Rua das Flores, 123 - Centro",
    contact: {
      name: "Recepcionista Ana",
      phone: "(11) 99999-9999"
    },
    equipment: [
      "Veículo próprio",
      "Celular para fotos",
      "Documento de identificação"
    ],
    requirements: [
      "Ser pontual",
      "Cuidado com os documentos",
      "Confirmar entrega por foto"
    ]
  };

  const handleAcceptMission = () => {
    setShowConfirmation(true);
  };

  const confirmAcceptance = () => {
    setShowConfirmation(false);
    navigate('/mobile/mission-execution/1');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/feed-opportunities')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Detalhes da Missão</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Mission Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-blue-100 text-blue-800 mb-2">
                  <Package className="h-4 w-4 mr-1" />
                  Entrega
                </Badge>
                <h2 className="text-xl font-semibold">{mission.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  R$ {mission.value.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{mission.estimatedTime}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{mission.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{mission.client}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm">{mission.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{mission.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Required */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Equipamento Necessário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mission.equipment.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contato no Local
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{mission.contact.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{mission.contact.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Requisitos Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mission.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{req}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accept Button */}
        <Button
          onClick={handleAcceptMission}
          className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-6 w-6 mr-2" />
          ACEITAR MISSÃO
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center">Confirmar Aceitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-gray-600">
                Você está prestes a aceitar a missão "{mission.title}". 
                Ao confirmar, você se compromete a executá-la conforme descrito.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={confirmAcceptance}
                >
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MissionDetails;
