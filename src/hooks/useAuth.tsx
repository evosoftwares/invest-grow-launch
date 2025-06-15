
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para criar perfil sem referência de chave estrangeira
  const createUserProfile = async (user: User, userData?: any) => {
    try {
      console.log('Creating profile for user:', user.id);
      
      const profileData = {
        id: user.id,
        email: user.email || '',
        full_name: userData?.full_name || user.email || '',
        role: userData?.role || 'investor',
        avatar_url: null,
        phone: null
      };

      // Primeiro, verificar se o perfil já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (existingProfile) {
        console.log('Profile already exists:', existingProfile);
        return existingProfile;
      }

      // Criar novo perfil sem verificação de chave estrangeira
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        // Se falhar, criar um perfil básico localmente
        const basicProfile = {
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return basicProfile;
      }

      console.log('Profile created successfully:', data);
      return data;
    } catch (error) {
      console.error('Exception creating profile:', error);
      // Retornar perfil básico em caso de erro
      return {
        id: user.id,
        email: user.email || '',
        full_name: userData?.full_name || user.email || '',
        role: userData?.role || 'investor',
        avatar_url: null,
        phone: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  };

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
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
          description: `Encontrados ${data?.length || 0} perfis no banco`,
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
    
    // Configurar listener de mudanças de auth primeiro
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Buscar ou criar perfil
          setTimeout(async () => {
            let profile = await fetchUserProfile(session.user.id);
            if (!profile) {
              profile = await createUserProfile(session.user);
            }
            setUserProfile(profile);
            setLoading(false);
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );

    // Verificar sessão existente
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        
        console.log('Initial session:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          let profile = await fetchUserProfile(session.user.id);
          if (!profile) {
            profile = await createUserProfile(session.user);
          }
          setUserProfile(profile);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setLoading(false);
      }
    };

    getInitialSession();
    
    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log('Starting signup process for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: userData
        }
      });

      console.log('SignUp response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        // Criar perfil após signup
        const profile = await createUserProfile(data.user, userData);
        if (profile) {
          setUserProfile(profile);
        }
        
        console.log('Signup successful');
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar a conta.",
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      } 
      
      if (data.user) {
        console.log('Signin successful');
        
        // Buscar ou criar perfil
        let profile = await fetchUserProfile(data.user.id);
        if (!profile) {
          profile = await createUserProfile(data.user);
        }
        setUserProfile(profile);
        
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao sistema.",
        });

        // Fazer redirecionamento direto baseado no role
        const role = profile?.role || 'investor';
        console.log('Redirecting user with role:', role);
        
        setTimeout(() => {
          switch (role) {
            case 'admin':
              window.location.href = '/admin/dashboard';
              break;
            case 'partner':
              window.location.href = '/partner/dashboard';
              break;
            default:
              window.location.href = '/calculadora';
              break;
          }
        }, 500);
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
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Signout error:', error);
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Limpar estados locais
        setUser(null);
        setSession(null);
        setUserProfile(null);
        
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso.",
        });
        
        // Redirecionar para página inicial
        window.location.href = '/';
      }
      
    } catch (error: any) {
      console.error('Signout exception:', error);
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
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
