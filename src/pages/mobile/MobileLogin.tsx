
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const MobileLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (!error) {
        navigate('/mobile/partner-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-light text-slate-700">Bem-vindo</h1>
          <p className="text-slate-500">Faça login para continuar</p>
        </div>

        <Card className="shadow-sm border-slate-200 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-light text-center text-slate-700">Entrar</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <button className="text-blue-500 text-sm hover:text-blue-600 transition-colors">
                Esqueceu sua senha?
              </button>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            {/* Social Login */}
            <div className="space-y-3">
              <div className="text-center text-slate-500 text-sm">ou continue com</div>
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                <div className="w-5 h-5 mr-2 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">🖱️</span>
                </div>
                Apple
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <Button
                onClick={() => navigate('/mobile/partner-profile')}
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
              >
                Quero oferecer meus serviços
              </Button>
              <Button
                onClick={() => navigate('/mobile/client-dashboard')}
                variant="outline"
                className="w-full h-12 border-slate-200 hover:bg-slate-50"
              >
                Quero Contratar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileLogin;
