
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/partner-dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Oportunidades</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b p-4 space-y-4">
          <Input placeholder="Buscar por região..." />
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Todas</Badge>
            <Badge variant="outline">Entrega</Badge>
            <Badge variant="outline">Transporte</Badge>
            <Badge variant="outline">Manutenção</Badge>
            <Badge variant="outline">Clientes Favoritos</Badge>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Stats Header */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-blue-600">{missions.length}</p>
              <p className="text-xs text-gray-600">Disponíveis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-green-600">2</p>
              <p className="text-xs text-gray-600">Urgentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-purple-600">2</p>
              <p className="text-xs text-gray-600">Favoritos</p>
            </CardContent>
          </Card>
        </div>

        {/* Mission List */}
        <div className="space-y-3">
          {missions.map((mission) => (
            <Card 
              key={mission.id} 
              className={`cursor-pointer transition-all ${
                mission.urgent ? 'border-2 border-red-200 bg-red-50' : ''
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
                      <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                    )}
                    {mission.favorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      R$ {mission.value.toFixed(2)}
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{mission.title}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">{mission.client}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{mission.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm flex-1">{mission.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mission.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mission.time}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <Button variant="outline" className="w-full">
          Carregar Mais Oportunidades
        </Button>
      </div>
    </div>
  );
};

export default FeedOpportunities;
