
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any | null;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  testProfileCreation: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para limpeza completa do estado de autenticação
const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Remove todas as chaves relacionadas ao Supabase
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove do sessionStorage também se existir
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      console.log('User profile fetched:', data);
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Função para testar a criação de perfis
  const testProfileCreation = async () => {
    try {
      console.log('Testing profile creation...');
      const { data, error } = await supabase.rpc('test_profile_creation');
      
      if (error) {
        console.error('Error testing profile creation:', error);
        toast({
          title: "Erro no teste",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Profile creation test result:', data);
        toast({
          title: "Teste de perfis",
          description: `Encontrados ${data?.[0]?.profiles_count || 0} perfis no banco`,
        });
      }
    } catch (error: any) {
      console.error('Exception in testProfileCreation:', error);
      toast({
        title: "Erro no teste",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Configurar listener de mudanças de auth PRIMEIRO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Atualizar estado síncrono primeiro
        setSession(session);
        setUser(session?.user ?? null);
        
        // Buscar perfil do usuário se autenticado
        if (session?.user) {
          // Usar setTimeout para evitar deadlocks
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            setUserProfile(profile);
            
            // Se o perfil não foi encontrado, pode ser que o trigger falhou
            if (!profile) {
              console.warn('Profile not found for user, trigger may have failed');
              toast({
                title: "Aviso",
                description: "Perfil do usuário não foi criado automaticamente. Entre em contato com o suporte.",
                variant: "destructive",
              });
            }
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // DEPOIS verificar sessão existente
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setUserProfile);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log('Starting signup process for:', email);
      setLoading(true);
      
      // Limpar estado antes do signup
      cleanupAuthState();
      
      // Tentar logout global primeiro
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global signout failed (expected):', err);
      }

      const redirectUrl = `${window.location.origin}/`;
      
      console.log('Calling supabase.auth.signUp with:', { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });

      console.log('SignUp response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Erro no cadastro",
          description: `${error.message} (Código: ${error.status})`,
          variant: "destructive",
        });
      } else {
        console.log('Signup successful:', data);
        
        // Verificar se o usuário foi criado
        if (data?.user) {
          console.log('User created with ID:', data.user.id);
          
          // Aguardar um pouco e verificar se o perfil foi criado
          setTimeout(async () => {
            const profile = await fetchUserProfile(data.user.id);
            if (profile) {
              console.log('Profile created successfully:', profile);
              toast({
                title: "Cadastro realizado!",
                description: "Conta criada com sucesso. Verifique seu email se necessário.",
              });
            } else {
              console.warn('Profile not created automatically');
              toast({
                title: "Cadastro parcialmente realizado",
                description: "Usuário criado, mas perfil não foi configurado automaticamente.",
                variant: "destructive",
              });
            }
          }, 2000);
        }
        
        toast({
          title: "Cadastro iniciado!",
          description: "Verifique seu email para confirmar a conta ou faça login se já confirmou.",
        });
      }

      return { error };
    } catch (error: any) {
      console.error('Signup exception:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin process for:', email);
      setLoading(true);
      
      // Limpar estado antes do login
      cleanupAuthState();
      
      // Tentar logout global primeiro
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global signout failed (expected):', err);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Erro no login",
          description: `${error.message} (Código: ${error.status})`,
          variant: "destructive",
        });
      } else {
        console.log('Signin successful:', data);
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao sistema.",
        });
        
        // Forçar refresh da página para estado limpo
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }

      return { error };
    } catch (error: any) {
      console.error('Signin exception:', error);
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting signout process');
      setLoading(true);
      
      // Limpar estado primeiro
      cleanupAuthState();
      
      // Tentar logout global
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.error('Signout error:', error);
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso.",
        });
      }
      
      // Forçar refresh para estado limpo
      setTimeout(() => {
        window.location.href = '/auth';
      }, 500);
      
    } catch (error: any) {
      console.error('Signout exception:', error);
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    signUp,
    signIn,
    signOut,
    testProfileCreation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
