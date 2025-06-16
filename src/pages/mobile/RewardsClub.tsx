
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Trophy, 
  Gift, 
  Star,
  Zap,
  Crown,
  Award,
  Target
} from "lucide-react";

const RewardsClub = () => {
  const navigate = useNavigate();
  const [currentLevel] = useState('bronze');
  const [currentPoints] = useState(850);
  const [nextLevelPoints] = useState(1000);
  const progressPercentage = (currentPoints / nextLevelPoints) * 100;

  const levels = [
    { name: 'Bronze', icon: Award, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    { name: 'Prata', icon: Trophy, color: 'text-slate-500', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
    { name: 'Ouro', icon: Crown, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { name: 'Diamante', icon: Star, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  const currentBenefits = [
    { name: 'Taxa reduzida', description: '3% por transação' },
    { name: 'Suporte prioritário', description: 'Atendimento em até 2h' },
    { name: 'Missões exclusivas', description: '2x por semana' }
  ];

  const nextBenefits = [
    { name: 'Taxa ainda menor', description: '2% por transação' },
    { name: 'Suporte VIP', description: 'Atendimento em até 30min' },
    { name: 'Mais missões exclusivas', description: '4x por semana' },
    { name: 'Bônus de pontuação', description: '+20% em todas as missões' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/wallet')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <h1 className="text-xl font-light text-slate-700">Clube de Vantagens</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Level Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="h-12 w-12 text-blue-200" />
                <div>
                  <h2 className="text-2xl font-light">Nível Bronze</h2>
                  <p className="text-blue-100">Membro desde Janeiro 2024</p>
                </div>
              </div>
              <Badge className="bg-white text-blue-600 px-3 py-1">
                Ativo
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-100">Progresso para Prata</span>
                <span className="text-white font-medium">{currentPoints}/{nextLevelPoints} pontos</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-blue-400">
                <div className="h-full bg-white rounded-full transition-all duration-500" 
                     style={{ width: `${progressPercentage}%` }} />
              </Progress>
              <p className="text-blue-100 text-sm">
                Faltam apenas {nextLevelPoints - currentPoints} pontos para o próximo nível!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Levels Overview */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="font-medium text-slate-700">Níveis Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {levels.map((level, index) => {
                const IconComponent = level.icon;
                const isCurrentLevel = level.name.toLowerCase() === currentLevel;
                return (
                  <div
                    key={level.name}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      isCurrentLevel 
                        ? `${level.bgColor} ${level.borderColor} border-2` 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <IconComponent className={`h-8 w-8 mx-auto mb-2 ${
                      isCurrentLevel ? level.color : 'text-slate-400'
                    }`} />
                    <p className={`font-medium ${
                      isCurrentLevel ? 'text-slate-700' : 'text-slate-500'
                    }`}>
                      {level.name}
                    </p>
                    {isCurrentLevel && (
                      <Badge className="mt-1 bg-blue-500 text-white text-xs">
                        Atual
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Benefits */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <Gift className="h-5 w-5 text-blue-500" />
              Seus Benefícios Atuais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-slate-700">{benefit.name}</p>
                  <p className="text-sm text-slate-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Level Benefits */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium text-slate-700">
              <Target className="h-5 w-5 text-blue-500" />
              Desbloqueie no Próximo Nível
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-slate-600">{benefit.name}</p>
                  <p className="text-sm text-slate-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/mobile/feed-opportunities')}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 shadow-sm"
          >
            <Zap className="h-5 w-5 mr-2" />
            Ganhar Mais Pontos
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 border-slate-200 hover:bg-slate-50"
          >
            Ver Histórico de Pontos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardsClub;
