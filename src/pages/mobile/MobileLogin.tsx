
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

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
        // Redirecionamento será feito pelo useAuth baseado no role
        navigate('/mobile/partner-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo</h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold text-center">Entrar</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <button className="text-blue-600 text-sm">
                Esqueceu sua senha?
              </button>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            {/* Social Login */}
            <div className="space-y-3">
              <div className="text-center text-gray-500 text-sm">ou continue com</div>
              <Button variant="outline" className="w-full h-12">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full h-12">
                <div className="w-5 h-5 mr-2 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">🍎</span>
                </div>
                Apple
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                onClick={() => navigate('/mobile/partner-profile')}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
              >
                Quero oferecer meus serviços
              </Button>
              <Button
                onClick={() => navigate('/mobile/client-dashboard')}
                variant="outline"
                className="w-full h-12"
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
