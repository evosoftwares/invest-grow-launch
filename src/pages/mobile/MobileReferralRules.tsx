import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useReferralPrograms } from "@/hooks/useReferralPrograms";
import { Gift, Target, Clock, DollarSign, CheckCircle, AlertCircle, Users, Smartphone } from "lucide-react";

const MobileReferralRules = () => {
  const navigate = useNavigate();
  const { activeProgram } = useReferralPrograms();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
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
          <h1 className="text-xl font-light text-slate-700">Como Funciona</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Program Overview */}
        {activeProgram && (
          <Card className="border-slate-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 text-center">
              <Gift className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h2 className="text-xl font-medium text-slate-800 mb-2">
                {activeProgram.name}
              </h2>
              <p className="text-slate-600 mb-4">
                {activeProgram.description || 'Ganhe dinheiro indicando novos motoristas para nossa plataforma!'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(activeProgram.bonus_amount)}
                  </div>
                  <div className="text-sm text-slate-600">Bônus por indicação</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {activeProgram.target_rides}
                  </div>
                  <div className="text-sm text-slate-600">Corridas necessárias</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Como Funciona o Programa
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Gere seu código de indicação</h4>
                  <p className="text-sm text-slate-600">
                    Crie um código único para compartilhar com motoristas interessados em se cadastrar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Compartilhe com motoristas</h4>
                  <p className="text-sm text-slate-600">
                    Use WhatsApp, SMS, redes sociais ou mostre o QR Code pessoalmente para indicar novos motoristas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Motorista se cadastra</h4>
                  <p className="text-sm text-slate-600">
                    O motorista usa seu código durante o cadastro e passa pela aprovação da plataforma.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Acompanhe o progresso</h4>
                  <p className="text-sm text-slate-600">
                    Monitore quantas corridas o motorista indicado já completou através do app.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Receba seu bônus</h4>
                  <p className="text-sm text-slate-600">
                    Quando o motorista completar a meta, você recebe o bônus automaticamente via PIX.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Requisitos para Ganhar o Bônus
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-800">
                    O motorista indicado deve usar seu código durante o cadastro
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-800">
                    O motorista deve ser aprovado pela equipe da plataforma
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-800">
                    Completar {activeProgram?.target_rides || 400} corridas em até {activeProgram?.expires_at ? '90 dias' : 'tempo ilimitado'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-800">
                    Manter conta ativa e em boa situação durante todo o período
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-800">
                    O motorista indicado não pode ter conta anterior na plataforma
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Informações de Pagamento
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Valor do bônus:</span>
                <span className="font-bold text-green-600">
                  {activeProgram ? formatCurrency(activeProgram.bonus_amount) : 'Conforme programa ativo'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Forma de pagamento:</span>
                <span className="font-medium">PIX ou Transferência</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Prazo de pagamento:</span>
                <span className="font-medium">Até 7 dias úteis</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Dia de processamento:</span>
                <span className="font-medium">Toda sexta-feira</span>
              </div>

              <div className="bg-green-50 rounded-lg p-3 mt-4">
                <p className="text-sm text-green-700">
                  💡 <strong>Dica:</strong> Você receberá uma notificação assim que o pagamento for processado.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Dicas para Maximizar seus Ganhos
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-500">🎯</span>
                <p className="text-sm text-slate-700">
                  <strong>Foque em motoristas experientes:</strong> Quem já trabalha em outras plataformas tem mais chance de atingir a meta rapidamente.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-500">💬</span>
                <p className="text-sm text-slate-700">
                  <strong>Use grupos de WhatsApp:</strong> Participe de grupos de motoristas para divulgar seu código.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-500">🤝</span>
                <p className="text-sm text-slate-700">
                  <strong>Explique os benefícios:</strong> Conte sobre as vantagens da plataforma e como ela pode ajudar.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-500">📱</span>
                <p className="text-sm text-slate-700">
                  <strong>Acompanhe o progresso:</strong> Mantenha contato e ajude seus indicados a atingir a meta.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-500">⭐</span>
                <p className="text-sm text-slate-700">
                  <strong>Seja persistente:</strong> Quanto mais pessoas você indicar, maiores serão seus ganhos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-slate-200 bg-yellow-50/50 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Informações Importantes
            </h3>
            
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <span>⚠️</span>
                <span>Os valores e condições do programa podem ser alterados a qualquer momento.</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span>📋</span>
                <span>Fraudes ou tentativas de burlar o sistema resultarão no cancelamento do bônus.</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span>🚫</span>
                <span>Não é permitido criar contas falsas ou usar códigos próprios.</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span>📞</span>
                <span>Em caso de dúvidas, entre em contato com o suporte através do app.</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span>📊</span>
                <span>O progresso das corridas é atualizado em tempo real no aplicativo.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-slate-200 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Pronto para começar?
            </h3>
            <p className="text-slate-600 mb-4">
              Gere seu código de indicação e comece a ganhar dinheiro hoje mesmo!
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/mobile/referrals/share')}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Gerar Código
              </Button>
              <Button 
                onClick={() => navigate('/mobile/referrals')}
                variant="outline"
                className="flex-1 border-slate-200 hover:bg-slate-50"
              >
                Ver Indicações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MobileReferralRules;