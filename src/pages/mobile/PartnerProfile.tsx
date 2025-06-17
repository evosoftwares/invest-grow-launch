import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Upload, 
  Star 
} from "lucide-react";

const PartnerProfile = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState({
    delivery: true,
    transport: false,
    maintenance: true,
    cleaning: false,
    security: false
  });

  const documents = [
    { name: 'CNH', status: 'verified', message: 'Documento verificado' },
    { name: 'CPF', status: 'pending', message: 'Foto da CNH está ilegível...' },
    { name: 'Comprovante de Residência', status: 'inactive', message: 'Documento não enviado' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Ativo';
      case 'pending': return 'Verificação Pendente';
      default: return 'Inativo';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/login')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-6"
          />
          <h1 className="text-xl font-light text-slate-700">Perfil e Serviços</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Summary */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-light text-blue-600">JD</span>
              </div>
              <div>
                <h2 className="font-medium text-slate-700">João da Silva</h2>
                <p className="text-slate-500">Parceiro desde 2024</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-blue-400 fill-current" />
                  <span className="text-sm text-slate-600">4.8 (234 avaliações)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meus Serviços */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-medium text-slate-700">
              Meus Serviços
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">5 categorias</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries({
              delivery: 'Entrega/Delivery',
              transport: 'Transporte/Corridas',
              maintenance: 'Manutenção',
              cleaning: 'Limpeza',
              security: 'Segurança'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-medium text-slate-700">{label}</span>
                <Switch
                  checked={services[key as keyof typeof services]}
                  onCheckedChange={(checked) => 
                    setServices(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status dos Documentos */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="font-medium text-slate-700">Documentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <div className="font-medium text-slate-700">{doc.name}</div>
                    <div className="text-sm text-slate-500">{doc.message}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(doc.status)}>
                  {getStatusText(doc.status)}
                </Badge>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4 border-slate-200 hover:bg-slate-50">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Documentos
            </Button>
          </CardContent>
        </Card>

        {/* Reputação Segmentada */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="font-medium text-slate-700">Reputação por Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Entrega/Delivery</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-blue-400 fill-current" />
                <span className="font-medium text-slate-700">4.9</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Manutenção</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-blue-400 fill-current" />
                <span className="font-medium text-slate-700">4.7</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <Button
          onClick={() => navigate('/mobile/partner-dashboard')}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
        >
          Ir para Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PartnerProfile;