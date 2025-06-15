
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'partner' | 'investor';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, userProfile } = useAuth();

  console.log('ProtectedRoute check:', { 
    user: !!user, 
    loading, 
    userProfile: userProfile?.role,
    requiredRole 
  });

  // Mostrar loading enquanto está carregando
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não tem usuário, redirecionar para login
  if (!user) {
    console.log('No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // Se não tem perfil ainda, aguardar um pouco mais
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Verificar role se necessário
  if (requiredRole && userProfile) {
    const userRole = userProfile.role || 'investor';
    console.log('Role check:', { userRole, requiredRole });
    
    // Admin tem acesso a tudo
    if (userRole === 'admin') {
      return <>{children}</>;
    }
    
    // Verificar se o role específico é necessário
    if (userRole !== requiredRole) {
      console.log('Insufficient permissions, redirecting based on role');
      
      // Redirecionar para a página apropriada baseada no role do usuário
      switch (userRole) {
        case 'partner':
          return <Navigate to="/partner/dashboard" replace />;
        case 'investor':
          return <Navigate to="/calculadora" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
