
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  Gift, 
  Trophy,
  Zap,
  Crown,
  Sparkles
} from "lucide-react";

const RewardsClub = () => {
  const navigate = useNavigate();
  const [currentLevel] = useState('bronze');
  const [currentXP] = useState(850);
  const [nextLevelXP] = useState(1000);

  const levels = [
    {
      name: 'Bronze',
      icon: Trophy,
      color: 'bg-orange-600',
      xpRequired: 0,
      benefits: ['5% cashback em combustível', 'Suporte prioritário']
    },
    {
      name: 'Prata',
      icon: Star,
      color: 'bg-gray-400',
      xpRequired: 1000,
      benefits: ['10% cashback em combustível', 'Bônus de +R$5 por missão', 'Acesso a missões exclusivas']
    },
    {
      name: 'Ouro',
      icon: Crown,
      color: 'bg-yellow-500',
      xpRequired: 2500,
      benefits: ['15% cashback em combustível', 'Bônus de +R$10 por missão', 'Prioridade em missões premium', 'Seguro gratuito']
    }
  ];

  const currentBenefits = [
    { name: 'Cashback Combustível', value: '5%', active: true },
    { name: 'Suporte Prioritário', value: '24/7', active: true },
    { name: 'Bônus por Missão', value: '+R$5', active: false, comingSoon: true },
    { name: 'Missões Exclusivas', value: 'VIP', active: false, comingSoon: true }
  ];

  const progressPercentage = ((currentXP - levels[0].xpRequired) / (nextLevelXP - levels[0].xpRequired)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/wallet')}
            className="text-white hover:bg-purple-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Clube de Vantagens</h1>
        </div>
        
        {/* Current Level Display */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-3">
            <Trophy className="h-6 w-6 text-orange-300" />
            <span className="font-semibold">Nível {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}</span>
          </div>
          <p className="text-purple-100">Você está indo muito bem!</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress to Next Level */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">Progresso para Prata</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {currentXP} / {nextLevelXP} XP
              </div>
              <p className="text-sm text-gray-600">Faltam {nextLevelXP - currentXP} pontos</p>
            </div>
            
            <Progress value={progressPercentage} className="h-3 mb-4" />
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Bronze</span>
              <span>85%</span>
              <span>Prata</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Seus Benefícios Atuais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    benefit.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {benefit.active ? <Zap className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
                  </div>
                  <span className={benefit.active ? 'font-medium' : 'text-gray-600'}>
                    {benefit.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${benefit.active ? 'text-green-600' : 'text-gray-400'}`}>
                    {benefit.value}
                  </span>
                  {benefit.comingSoon && (
                    <Badge className="bg-purple-100 text-purple-600 text-xs">
                      Em breve
                    </Badge>
                  )}
                  {benefit.active && (
                    <Badge className="bg-green-100 text-green-600 text-xs">
                      Ativo
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* All Levels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Todos os Níveis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {levels.map((level, index) => {
              const isCurrentLevel = level.name.toLowerCase() === currentLevel;
              const isUnlocked = currentXP >= level.xpRequired;
              
              return (
                <div key={index} className={`p-4 rounded-lg border-2 ${
                  isCurrentLevel 
                    ? 'border-purple-300 bg-purple-50' 
                    : isUnlocked 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <level.icon className={`h-6 w-6 ${
                        isCurrentLevel ? 'text-purple-600' :
                        isUnlocked ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold">{level.name}</h4>
                        <p className="text-sm text-gray-600">{level.xpRequired} XP</p>
                      </div>
                    </div>
                    {isCurrentLevel && (
                      <Badge className="bg-purple-600 text-white">Atual</Badge>
                    )}
                    {isUnlocked && !isCurrentLevel && (
                      <Badge className="bg-green-600 text-white">Desbloqueado</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {level.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className={isUnlocked ? 'text-gray-700' : 'text-gray-500'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Como Ganhar XP */}
        <Card>
          <CardHeader>
            <CardTitle>Como Ganhar XP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Completar uma missão</span>
              <Badge variant="secondary">+50 XP</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Avaliação 5 estrelas</span>
              <Badge variant="secondary">+25 XP</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Missão sem problemas</span>
              <Badge variant="secondary">+15 XP</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Bônus diário (5 missões)</span>
              <Badge variant="secondary">+100 XP</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsClub;
