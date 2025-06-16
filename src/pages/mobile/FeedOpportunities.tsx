
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Filter,
  Star,
  Truck,
  Package,
  Wrench
} from "lucide-react";

const FeedOpportunities = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const missions = [
    {
      id: 1,
      title: "Entrega de Documentos",
      category: "delivery",
      client: "João Silva",
      rating: 4.9,
      value: 25.00,
      distance: "2.5 km",
      time: "30 min",
      address: "Rua das Flores, 123 - Centro",
      urgent: true,
      favorite: true
    },
    {
      id: 2,
      title: "Corrida para Aeroporto",
      category: "transport",
      client: "Maria Santos",
      rating: 4.7,
      value: 45.00,
      distance: "12 km",
      time: "25 min",
      address: "Av. Principal, 456 - Bairro Alto",
      urgent: false,
      favorite: false
    },
    {
      id: 3,
      title: "Conserto de Torneira",
      category: "maintenance",
      client: "Pedro Costa",
      rating: 4.8,
      value: 80.00,
      distance: "1.2 km",
      time: "1h 30min",
      address: "Rua do Comércio, 789 - Vila Nova",
      urgent: false,
      favorite: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'delivery': return <Package className="h-5 w-5" />;
      case 'transport': return <Truck className="h-5 w-5" />;
      case 'maintenance': return <Wrench className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'delivery': return 'bg-blue-100 text-blue-800';
      case 'transport': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/partner-dashboard')}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-light text-slate-700">Oportunidades</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="border-slate-200 hover:bg-slate-50"
          >
            <Filter className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 p-4 space-y-4">
          <Input placeholder="Buscar por região..." className="border-slate-200 focus:border-blue-300" />
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-blue-500 text-white">Todas</Badge>
            <Badge variant="outline" className="border-slate-300 hover:bg-slate-50">Entrega</Badge>
            <Badge variant="outline" className="border-slate-300 hover:bg-slate-50">Transporte</Badge>
            <Badge variant="outline" className="border-slate-300 hover:bg-slate-50">Manutenção</Badge>
            <Badge variant="outline" className="border-slate-300 hover:bg-slate-50">Clientes Favoritos</Badge>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Stats Header */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-light text-blue-500">{missions.length}</p>
              <p className="text-xs text-slate-500">Disponíveis</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-light text-blue-500">2</p>
              <p className="text-xs text-slate-500">Urgentes</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-light text-blue-500">2</p>
              <p className="text-xs text-slate-500">Favoritos</p>
            </CardContent>
          </Card>
        </div>

        {/* Mission List */}
        <div className="space-y-3">
          {missions.map((mission) => (
            <Card 
              key={mission.id} 
              className={`cursor-pointer transition-all border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md ${
                mission.urgent ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
              }`}
              onClick={() => navigate(`/mobile/mission-details/${mission.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(mission.category)}>
                      {getCategoryIcon(mission.category)}
                    </Badge>
                    {mission.urgent && (
                      <Badge className="bg-blue-500 text-white">Urgente</Badge>
                    )}
                    {mission.favorite && (
                      <Star className="h-4 w-4 text-blue-400 fill-current" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-light text-blue-600">
                      R$ {mission.value.toFixed(2)}
                    </p>
                  </div>
                </div>

                <h3 className="font-medium text-lg mb-2 text-slate-700">{mission.title}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-slate-600">{mission.client}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-blue-400 fill-current" />
                    <span className="text-xs text-slate-500">{mission.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm flex-1">{mission.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mission.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mission.time}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50">
          Carregar Mais Oportunidades
        </Button>
      </div>
    </div>
  );
};

export default FeedOpportunities;
