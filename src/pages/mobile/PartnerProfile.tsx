
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
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
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
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">JP</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-800">João Pedro Silva</h2>
                <p className="text-slate-600">Parceiro desde Março 2024</p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-slate-600">4.8 (127 avaliações)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Serviços Oferecidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(services).map(([service, enabled]) => (
              <div key={service} className="flex items-center justify-between">
                <span className="text-slate-700 capitalize">{service}</span>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => 
                    setServices(prev => ({ ...prev, [service]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Documentação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-slate-800">{doc.name}</p>
                    <p className="text-sm text-slate-600">{doc.message}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(doc.status)}>
                  {getStatusText(doc.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upload Document */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Documento
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerProfile;
