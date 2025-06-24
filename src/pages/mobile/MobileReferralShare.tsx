import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { Copy, Share2, MessageCircle, Mail, Users, QrCode, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const MobileReferralShare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeProgram } = useReferralPrograms();
  
  const [referralCode, setReferralCode] = useState(
    location.state?.referralCode || ''
  );
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!referralCode && activeProgram) {
      generateNewCode();
    }
  }, [activeProgram]);

  const generateNewCode = async () => {
    setIsGeneratingCode(true);
    // Simulate code generation
    setTimeout(() => {
      const newCode = `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      setReferralCode(newCode);
      setIsGeneratingCode(false);
      toast.success("Novo código gerado!");
    }, 1000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Código copiado!");
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getShareMessage = () => {
    const bonusAmount = activeProgram?.bonus_amount || 0;
    const targetRides = activeProgram?.target_rides || 0;
    
    return `🚗 Quer ganhar dinheiro como motorista?

Junte-se à nossa plataforma e ganhe ${formatCurrency(bonusAmount)} depois de completar ${targetRides} corridas!

Use meu código de indicação: ${referralCode}

💰 Programa de Indicações
🎯 Meta: ${targetRides} corridas
🏆 Bônus: ${formatCurrency(bonusAmount)}

Baixe o app e comece a ganhar hoje mesmo!`;
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(getShareMessage());
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(getShareMessage());
    window.open(`sms:?body=${message}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Convite para ser motorista - Ganhe bônus!');
    const body = encodeURIComponent(getShareMessage());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Programa de Indicações',
          text: getShareMessage(),
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(getShareMessage());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mobile/referrals')}
              className="hover:bg-slate-100"
            >
              <span>←</span>
            </Button>
            <img 
              src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
              alt="Logo" 
              className="h-6"
            />
            <h1 className="text-xl font-light text-slate-700">Compartilhar Indicação</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Program Info */}
        {activeProgram && (
          <Card className="border-slate-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-medium text-slate-800 mb-2">
                🎯 {activeProgram.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Bônus</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(activeProgram.bonus_amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Meta</p>
                  <p className="text-xl font-bold text-blue-600">
                    {activeProgram.target_rides} corridas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Referral Code */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                Seu Código de Indicação
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                  {referralCode || '••••••••'}
                </div>
                <p className="text-sm text-slate-600">
                  Compartilhe este código com novos motoristas
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(referralCode)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!referralCode}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código
                </Button>
                
                <Button
                  onClick={generateNewCode}
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50"
                  disabled={isGeneratingCode}
                >
                  <RefreshCw className={`w-4 h-4 ${isGeneratingCode ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Preview */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              📝 Prévia da Mensagem
            </h3>
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-slate-700 whitespace-pre-line">
                {getShareMessage()}
              </p>
            </div>
            <Button
              onClick={() => copyToClipboard(getShareMessage())}
              variant="outline"
              className="w-full border-slate-200 hover:bg-slate-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Mensagem Completa
            </Button>
          </CardContent>
        </Card>

        {/* Quick Share Options */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              🚀 Compartilhar Rapidamente
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={shareViaWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white p-4 h-auto flex-col gap-2"
                disabled={!referralCode}
              >
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm">WhatsApp</span>
              </Button>
              
              <Button
                onClick={shareViaSMS}
                variant="outline"
                className="border-slate-200 hover:bg-slate-50 p-4 h-auto flex-col gap-2"
                disabled={!referralCode}
              >
                <span className="text-xl">💬</span>
                <span className="text-sm">SMS</span>
              </Button>
              
              <Button
                onClick={shareViaEmail}
                variant="outline"
                className="border-slate-200 hover:bg-slate-50 p-4 h-auto flex-col gap-2"
                disabled={!referralCode}
              >
                <Mail className="w-6 h-6" />
                <span className="text-sm">Email</span>
              </Button>
              
              <Button
                onClick={shareViaWebShare}
                variant="outline"
                className="border-slate-200 hover:bg-slate-50 p-4 h-auto flex-col gap-2"
                disabled={!referralCode}
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm">Outros</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-slate-800 mb-3">
                📱 Código QR
              </h3>
              
              {!showQR ? (
                <Button
                  onClick={() => setShowQR(true)}
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50"
                  disabled={!referralCode}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-100 rounded-lg p-8 mx-auto w-fit">
                    <QrCode className="w-32 h-32 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Mostre este QR Code para novos motoristas escanearem
                  </p>
                  <Button
                    onClick={() => setShowQR(false)}
                    variant="outline"
                    size="sm"
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    Ocultar QR Code
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              💡 Dicas para Compartilhar
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <span>🎯</span>
                <span>Compartilhe com motoristas experientes que já trabalham em outras plataformas</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📱</span>
                <span>Use grupos de WhatsApp de motoristas para alcançar mais pessoas</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🤝</span>
                <span>Explique pessoalmente os benefícios do programa</span>
              </div>
              <div className="flex items-start gap-2">
                <span>⏰</span>
                <span>Acompanhe o progresso dos seus indicados regularmente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MobileReferralShare;