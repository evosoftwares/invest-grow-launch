
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/feed-opportunities')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <h1 className="text-xl font-light text-slate-700">Detalhes da Missão</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Mission Header */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-2">
                  <Package className="h-4 w-4 mr-1" />
                  Entrega
                </Badge>
                <h2 className="text-xl font-medium text-slate-700">{mission.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light text-blue-600">
                  R$ {mission.value.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-500">{mission.estimatedTime}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 mb-4">{mission.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-slate-700">{mission.client}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-blue-400 fill-current" />
                <span className="text-sm text-slate-500">{mission.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span className="text-slate-600">{mission.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Required */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <Package className="h-5 w-5 text-blue-500" />
              Equipamento Necessário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mission.equipment.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <Phone className="h-5 w-5 text-blue-500" />
              Contato no Local
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{mission.contact.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{mission.contact.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
              Requisitos Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mission.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-600">{req}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accept Button */}
        <Button
          onClick={handleAcceptMission}
          className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 shadow-sm"
        >
          <CheckCircle className="h-6 w-6 mr-2" />
          ACEITAR MISSÃO
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-center font-medium text-slate-700">Confirmar Aceitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-slate-600">
                Você está prestes a aceitar a missão "{mission.title}". 
                Ao confirmar, você se compromete a executá-la conforme descrito.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 hover:bg-slate-50"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
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
