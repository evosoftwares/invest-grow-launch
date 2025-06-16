
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Clock, Star } from "lucide-react";

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
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
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
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/login')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Perfil e Serviços</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">JD</span>
              </div>
              <div>
                <h2 className="font-semibold">João da Silva</h2>
                <p className="text-gray-600">Parceiro desde 2024</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">4.8 (234 avaliações)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meus Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Meus Serviços
              <Badge variant="secondary">5 categorias</Badge>
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
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{label}</span>
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
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-600">{doc.message}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(doc.status)}>
                  {getStatusText(doc.status)}
                </Badge>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Enviar Documentos
            </Button>
          </CardContent>
        </Card>

        {/* Reputação Segmentada */}
        <Card>
          <CardHeader>
            <CardTitle>Reputação por Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Entrega/Delivery</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Manutenção</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">4.7</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <Button
          onClick={() => navigate('/mobile/partner-dashboard')}
          className="w-full h-12"
        >
          Ir para Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PartnerProfile;
