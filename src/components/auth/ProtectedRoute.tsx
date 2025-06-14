
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
    user: user?.email, 
    loading, 
    userProfile: userProfile?.role,
    requiredRole 
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && userProfile) {
    const userRole = userProfile.role || 'investor';
    console.log('Role check:', { userRole, requiredRole });
    
    if (userRole !== requiredRole && userRole !== 'admin') {
      console.log('Insufficient permissions, redirecting to home');
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
