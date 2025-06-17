import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Eye, EyeOff, Chrome, Apple } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Rotas centralizadas
const ROUTES = {
  forgotPassword: '/mobile/forgot-password',
  partnerDashboard: '/mobile/partner-dashboard',
  partnerProfile: '/mobile/partner-profile',
  clientDashboard: '/mobile/client-dashboard',
};

// Classes de botão reutilizáveis
const btnBase = 'w-full h-12 rounded-xl font-medium shadow';
const btnPrimary = `${btnBase} bg-blue-500 hover:bg-blue-600 text-white`;
const btnOutline = `${btnBase} variant-outline border-slate-200 hover:bg-slate-50`;

export default function MobileLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleLogin() {
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg('Credenciais inválidas.');
      } else {
        navigate(ROUTES.partnerDashboard);
      }
    } catch (err) {
      setErrorMsg('Erro de conexão. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
        <CardHeader className="text-center py-6">
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-8 mx-auto mb-4"
          />
          <h1 className="text-2xl font-light text-slate-800">Bem-vindo</h1>
          <p className="text-sm text-slate-500 mt-1">Faça login para continuar</p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 rounded-xl border border-slate-200 focus:ring-blue-200 focus:border-blue-300"
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-4 pr-10 h-12 rounded-xl border border-slate-200 focus:ring-blue-200 focus:border-blue-300"
            />
            <button
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={() => navigate(ROUTES.forgotPassword)}
              className="text-sm text-blue-500 hover:underline"
              type="button"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <Button onClick={handleLogin} disabled={loading} className={btnPrimary}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="flex items-center justify-center text-sm text-slate-400">
            <span className="mx-2">ou continue com</span>
          </div>

          <div className="flex gap-3">
            <Button className={btnOutline}>
              <Chrome size={20} />
              <span>Google</span>
            </Button>
            <Button className={btnOutline}>
              <Apple size={20} />
              <span>Apple</span>
            </Button>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <Button onClick={() => navigate(ROUTES.partnerProfile)} className={btnPrimary}>
              Quero oferecer meus serviços
            </Button>
            <Button onClick={() => navigate(ROUTES.clientDashboard)} className={btnOutline}>
              Quero Contratar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
