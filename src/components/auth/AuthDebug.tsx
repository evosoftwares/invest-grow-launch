
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export const AuthDebug = () => {
  const { user, userProfile } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsVisible(true)}
        >
          Debug Auth
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex justify-between items-center">
            Debug de Autenticação
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              ✕
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Informações de debug para autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs space-y-1">
            <div>
              <strong>User ID:</strong> {user?.id || 'Não logado'}
            </div>
            <div>
              <strong>Email:</strong> {user?.email || 'N/A'}
            </div>
            <div>
              <strong>Profile:</strong> {userProfile ? 'Encontrado' : 'Não encontrado'}
            </div>
            {userProfile && (
              <div>
                <strong>Role:</strong> {userProfile.role || 'N/A'}
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Informações de debug para verificar o estado da autenticação.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
