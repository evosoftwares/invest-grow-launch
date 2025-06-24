import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { Gift, X, TrendingUp } from "lucide-react";

export const MobileReferralNotification = () => {
  const navigate = useNavigate();
  const { activeProgram } = useReferralPrograms();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification if there's an active program and user hasn't dismissed it
    const hasSeenNotification = localStorage.getItem('referral-notification-seen');
    if (activeProgram && !hasSeenNotification) {
      setIsVisible(true);
    }
  }, [activeProgram]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('referral-notification-seen', 'true');
  };

  const handleViewProgram = () => {
    navigate('/mobile/referrals');
    handleDismiss();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isVisible || !activeProgram) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-600" />
              <Badge className="bg-green-100 text-green-800">Novo!</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-white/20"
              onClick={handleDismiss}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <h3 className="font-medium text-slate-800">
              🎯 Programa de Indicações Ativo!
            </h3>
            <p className="text-sm text-slate-600">
              Ganhe <strong className="text-green-600">{formatCurrency(activeProgram.bonus_amount)}</strong> por cada motorista que você indicar e completar <strong>{activeProgram.target_rides} corridas</strong>!
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleViewProgram}
              size="sm"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Começar Agora
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              className="border-slate-200 hover:bg-white/50"
            >
              Depois
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};