
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const PublishMission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    value: '',
    estimatedTime: '',
    category: 'delivery'
  });

  const categories = [
    { id: 'delivery', name: 'Entrega' },
    { id: 'transport', name: 'Transporte' },
    { id: 'photo', name: 'Fotografia' },
    { id: 'cleaning', name: 'Limpeza' }
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
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/client-dashboard')}
            className="hover:bg-slate-100"
          >
            ←
          </Button>
          <h1 className="text-xl font-light text-slate-700">Nova Missão</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Informações Básicas */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">
              Informações da Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-600">Título</Label>
              <Input
                id="title"
                placeholder="Ex: Entrega de documento urgente"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="border-slate-200 focus:border-blue-300"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-slate-600">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva detalhadamente o que precisa ser feito..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="border-slate-200 focus:border-blue-300 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Localização e Valor */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="address" className="text-slate-600">
                Endereço
              </Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="border-slate-200 focus:border-blue-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value" className="text-slate-600">
                  Valor (R$)
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0,00"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="border-slate-200 focus:border-blue-300"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-slate-600">
                  Tempo Est.
                </Label>
                <Input
                  id="time"
                  placeholder="Ex: 2h"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                  className="border-slate-200 focus:border-blue-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categoria */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={formData.category === category.id ? "default" : "outline"}
                  className={`h-16 flex-col gap-2 ${
                    formData.category === category.id 
                      ? "bg-blue-500 hover:bg-blue-600" 
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setFormData({...formData, category: category.id})}
                >
                  <span className="text-sm">{category.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates de Checklist */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">
              Template de Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklistTemplates.map((template) => (
              <div key={template.id} className="p-3 border border-slate-200 rounded-lg">
                <h4 className="font-medium text-slate-700">{template.name}</h4>
                <ul className="text-sm text-slate-500 mt-1">
                  {template.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Botão de Publicar */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-lg shadow-sm"
        >
          Publicar Missão
        </Button>
      </div>
    </div>
  );
};

export default PublishMission;
