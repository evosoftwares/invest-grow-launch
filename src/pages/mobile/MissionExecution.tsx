
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Camera, 
  MessageCircle, 
  CheckCircle,
  Upload,
  Send,
  Phone
} from "lucide-react";

const MissionExecution = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checklist, setChecklist] = useState({
    arrived: false,
    documented: false,
    collected: false,
    delivered: false,
    confirmed: false
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const checklistItems = [
    { key: 'arrived', label: 'Cheguei no local de coleta', required: true },
    { key: 'documented', label: 'Fotografei os documentos', required: true },
    { key: 'collected', label: 'Coletei os documentos', required: true },
    { key: 'delivered', label: 'Entreguei no destino', required: true },
    { key: 'confirmed', label: 'Confirmei a entrega', required: true }
  ];

  const handleChecklistChange = (key: string, checked: boolean) => {
    setChecklist(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleFinish = () => {
    const allCompleted = Object.values(checklist).every(Boolean);
    if (allCompleted) {
      navigate('/mobile/partner-dashboard');
      // Show success message
    }
  };

  const isAllCompleted = Object.values(checklist).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/feed-opportunities')}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-xl font-light text-slate-700">Executando Missão</h1>
              <p className="text-sm text-slate-500">Entrega de Documentos</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50">
              <Phone className="h-5 w-5 text-slate-600" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowChat(!showChat)}
              className="border-slate-200 hover:bg-slate-50"
            >
              <MessageCircle className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress Indicator */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Progresso</span>
              <span className="text-sm text-slate-500">
                {Object.values(checklist).filter(Boolean).length}/{checklistItems.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(checklist).filter(Boolean).length / checklistItems.length) * 100}%` 
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Checklist Detalhado */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="font-medium text-slate-700">Checklist da Missão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {checklistItems.map((item, index) => (
              <div key={item.key} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Checkbox
                  id={item.key}
                  checked={checklist[item.key as keyof typeof checklist]}
                  onCheckedChange={(checked) => 
                    handleChecklistChange(item.key, checked as boolean)
                  }
                />
                <label 
                  htmlFor={item.key}
                  className="text-sm font-medium flex-1 cursor-pointer text-slate-700"
                >
                  {item.label}
                  {item.required && <span className="text-blue-500 ml-1">*</span>}
                </label>
                {checklist[item.key as keyof typeof checklist] && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Camera Section */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <Camera className="h-5 w-5 text-blue-500" />
              Evidências Fotográficas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
              <Camera className="h-5 w-5 mr-2 text-slate-600" />
              Tirar Foto dos Documentos
            </Button>
            <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
              <Camera className="h-5 w-5 mr-2 text-slate-600" />
              Foto da Entrega
            </Button>
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                    <Camera className="h-8 w-8 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Section */}
        {showChat && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Canal de Comunicação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32 bg-slate-50 rounded-lg p-3 overflow-y-auto border border-slate-200">
                <div className="text-sm text-slate-500 text-center">
                  Inicie uma conversa com o cliente
                </div>
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border-slate-200 focus:border-blue-300"
                  rows={2}
                />
                <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Finish Button */}
        <Button
          onClick={handleFinish}
          disabled={!isAllCompleted}
          className={`w-full h-14 text-lg shadow-sm ${
            isAllCompleted 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="h-6 w-6 mr-2" />
          Finalizar e Enviar para Aprovação
        </Button>

        {!isAllCompleted && (
          <p className="text-center text-sm text-slate-500">
            Complete todos os itens do checklist para finalizar
          </p>
        )}
      </div>
    </div>
  );
};

export default MissionExecution;
