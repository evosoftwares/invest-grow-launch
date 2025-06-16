
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const PublishMission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    value: '',
    estimatedTime: '',
    category: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const categories = [
    { id: 'delivery', name: 'Entrega' },
    { id: 'transport', name: 'Transporte' },
    { id: 'photo', name: 'Fotografia' },
    { id: 'cleaning', name: 'Limpeza' },
    { id: 'maintenance', name: 'Manutenção' },
    { id: 'shopping', name: 'Compras' },
    { id: 'consulting', name: 'Consultoria' },
    { id: 'design', name: 'Design' },
    { id: 'writing', name: 'Redação' },
    { id: 'translation', name: 'Tradução' }
  ];

  const checklistTemplates = [
    { id: 'basic', name: 'Básico', items: ['Chegada no local', 'Conclusão da tarefa', 'Foto de comprovação'] },
    { id: 'delivery', name: 'Entrega', items: ['Recebimento do item', 'Verificação do endereço', 'Entrega realizada', 'Assinatura do destinatário'] },
    { id: 'transport', name: 'Transporte', items: ['Chegada pontual', 'Verificação do passageiro', 'Destino alcançado', 'Avaliação do serviço'] }
  ];

  const handleSubmit = () => {
    // Simulate mission creation
    navigate('/mobile/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/client-dashboard')}
            className="hover:bg-slate-100 rounded-full"
          >
            <span>←</span>
          </Button>
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-6"
          />
          <h1 className="text-xl font-semibold text-slate-800">Nova Missão</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
          {/* Informações Básicas */}
          <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Informações da Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Título da Missão
                </Label>
                <Input
                  id="title"
                  placeholder="Ex: Entrega de documento urgente"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Descrição Detalhada
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o que precisa ser feito, incluindo requisitos específicos, materiais necessários, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 min-h-[120px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Localização e Valor */}
          <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Localização e Remuneração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                  Endereço Completo
                </Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro, cidade, CEP"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-sm font-medium text-slate-700">
                    Valor (R$)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
                      R$
                    </span>
                    <Input
                      id="value"
                      type="number"
                      placeholder="0,00"
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: e.target.value})}
                      className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11 pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium text-slate-700">
                    Tempo Estimado
                  </Label>
                  <Input
                    id="time"
                    placeholder="Ex: 2h, 30min"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                    className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categoria */}
          <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                  Tipo de Serviço
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger className="w-full border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white h-11">
                    <SelectValue placeholder="Escolha uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 shadow-lg z-50">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.id} 
                        value={category.id}
                        className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Templates de Checklist */}
          <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Template de Checklist
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Selecione um modelo para facilitar a verificação da missão
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklistTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{template.name}</h4>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedTemplate === template.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-slate-300'
                    }`}>
                      {selectedTemplate === template.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {template.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            Publicar Missão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishMission;
