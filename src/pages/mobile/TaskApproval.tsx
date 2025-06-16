
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  Check,
  X,
  Camera,
  MessageSquare,
  Heart
} from "lucide-react";

const TaskApproval = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);

  const mission = {
    id: '1',
    title: 'Entrega de Documentos',
    partner: 'João Silva',
    partnerRating: 4.8,
    completedAt: '2024-01-15 14:30',
    value: 25.00,
    photos: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop'
    ],
    checklist: [
      { item: 'Chegada no local', completed: true },
      { item: 'Recebimento dos documentos', completed: true },
      { item: 'Entrega no destino', completed: true },
      { item: 'Assinatura de confirmação', completed: true }
    ],
    notes: 'Entrega realizada com sucesso. Cliente muito educado e pontual.'
  };

  const handleApprove = () => {
    if (selectedRating === 5) {
      setShowFavoritePrompt(true);
    } else {
      navigate('/mobile/client-dashboard');
    }
  };

  const handleAddToFavorites = (addToFavorites: boolean) => {
    // Logic to add partner to favorites
    console.log('Add to favorites:', addToFavorites);
    navigate('/mobile/client-dashboard');
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
          <h1 className="text-xl font-light text-slate-700">Aprovação da Tarefa</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info da Missão */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-slate-700">{mission.title}</h3>
                <p className="text-sm text-slate-500">Por: {mission.partner}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-600">{mission.partnerRating}</span>
                </div>
              </div>
              <Badge className="bg-blue-500">R$ {mission.value.toFixed(2)}</Badge>
            </div>
            <p className="text-sm text-slate-500">Concluído em: {mission.completedAt}</p>
          </CardContent>
        </Card>

        {/* Fotos/Evidências */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-500" />
              Evidências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {mission.photos.map((photo, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden border border-slate-200">
                  <img 
                    src={photo} 
                    alt={`Evidência ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mission.checklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.completed ? 'bg-blue-500' : 'bg-slate-200'
                }`}>
                  {item.completed && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className={`text-sm ${
                  item.completed ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {item.item}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notas do Parceiro */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">{mission.notes}</p>
          </CardContent>
        </Card>

        {/* Avaliação */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Avalie o Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setSelectedRating(star)}
                >
                  <Star 
                    className={`h-8 w-8 ${
                      star <= selectedRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-slate-300'
                    }`}
                  />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-14 border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => navigate('/mobile/client-dashboard')}
          >
            <X className="h-5 w-5 mr-2" />
            Rejeitar
          </Button>
          <Button
            className="h-14 bg-blue-500 hover:bg-blue-600"
            onClick={handleApprove}
            disabled={selectedRating === 0}
          >
            <Check className="h-5 w-5 mr-2" />
            Aprovar
          </Button>
        </div>

        {/* Modal de Favoritos */}
        {showFavoritePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm bg-white">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  Adicionar aos Favoritos?
                </h3>
                <p className="text-slate-500 mb-6">
                  Deseja adicionar {mission.partner} à sua lista de parceiros favoritos?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleAddToFavorites(false)}
                    className="border-slate-200"
                  >
                    Não
                  </Button>
                  <Button
                    onClick={() => handleAddToFavorites(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Sim
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskApproval;
