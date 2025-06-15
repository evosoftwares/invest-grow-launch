
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface PartnerErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface PartnerErrorState {
  hasError: boolean;
  error?: Error;
}

class PartnerErrorBoundary extends React.Component<PartnerErrorBoundaryProps, PartnerErrorState> {
  constructor(props: PartnerErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): PartnerErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Partner Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900">
                Erro no Sistema de Parceiros
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Ocorreu um erro inesperado no sistema de parceiros. 
                Tente recarregar a página ou entre em contato com o suporte.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recarregar Página
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  Voltar
                </Button>
              </div>
              {this.state.error && (
                <details className="text-xs text-gray-500 mt-4">
                  <summary className="cursor-pointer">Detalhes do erro</summary>
                  <pre className="mt-2 text-left bg-gray-100 p-2 rounded">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PartnerErrorBoundary;
