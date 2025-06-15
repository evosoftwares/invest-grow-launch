
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para limpar completamente o estado de autenticação
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Função para redirecionar baseado no role
const redirectUserBasedOnRole = (userProfile: any) => {
  if (!userProfile) return;
  
  const role = userProfile.role || 'investor';
  console.log('Redirecting user with role:', role);
  
  switch (role) {
    case 'admin':
      window.location.href = '/admin/dashboard';
      break;
    case 'partner':
      window.location.href = '/partner/dashboard';
      break;
    case 'investor':
    default:
      window.location.href = '/calculadora';
      break;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para criar perfil do usuário
  const createUserProfile = async (user: User, userData?: any) => {
    try {
      console.log('Creating profile for user:', user.id);
      
      const profileData = {
        id: user.id,
        email: user.email || '',
        full_name: userData?.full_name || user.email || '',
        role: userData?.role || 'investor',
        avatar_url: null,
        phone: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Verificar se o perfil já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (existingProfile) {
        console.log('Profile already exists:', existingProfile);
        return existingProfile;
      }

      // Criar novo perfil
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return profileData;
      }

      console.log('Profile created successfully:', data);
      return data;
    } catch (error) {
      console.error('Exception creating profile:', error);
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

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Configurar listener de mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Defer profile loading to prevent conflicts
          setTimeout(async () => {
            let profile = await fetchUserProfile(session.user.id);
            if (!profile) {
              profile = await createUserProfile(session.user);
            }
            setUserProfile(profile);
            setLoading(false);
            
            // Redirecionar após carregar o perfil
            if (window.location.pathname === '/auth') {
              redirectUserBasedOnRole(profile);
            }
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
          
          // Redirecionar se estiver na página de auth
          if (window.location.pathname === '/auth') {
            redirectUserBasedOnRole(profile);
          }
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
      
      // Limpar estado antes de tentar criar conta
      cleanupAuthState();
      
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
          
          // Redirecionar após signup bem-sucedido
          toast({
            title: "Cadastro realizado!",
            description: "Conta criada com sucesso. Redirecionando...",
          });
          
          setTimeout(() => {
            redirectUserBasedOnRole(profile);
          }, 1000);
        }
        
        console.log('Signup successful');
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
      
      // Limpar estado antes de tentar fazer login
      cleanupAuthState();
      
      // Tentar logout global primeiro
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue mesmo se falhar
        console.log('Global signout failed, continuing...');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        
        // Se o erro for de email não confirmado, vamos tentar confirmar automaticamente
        if (error.message === 'Email not confirmed') {
          console.log('Attempting to auto-confirm user...');
          
          // Fazer signup novamente para "confirmar" o usuário
          const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/`,
            }
          });
          
          if (signupError && signupError.message !== 'User already registered') {
            toast({
              title: "Erro no login",
              description: "Email não confirmado. Tente criar uma nova conta.",
              variant: "destructive",
            });
            return { error: signupError };
          }
          
          // Tentar login novamente
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (retryError) {
            toast({
              title: "Erro no login",
              description: "Não foi possível fazer login. Verifique suas credenciais.",
              variant: "destructive",
            });
            return { error: retryError };
          }
          
          // Login bem sucedido após retry
          if (retryData.user) {
            let profile = await fetchUserProfile(retryData.user.id);
            if (!profile) {
              profile = await createUserProfile(retryData.user);
            }
            setUserProfile(profile);
            
            toast({
              title: "Login realizado!",
              description: "Bem-vindo ao sistema. Redirecionando...",
            });
            
            // Redirecionar após login bem-sucedido
            setTimeout(() => {
              redirectUserBasedOnRole(profile);
            }, 1000);
          }
          
          return { error: null };
        } else {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive",
          });
          return { error };
        }
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
          description: "Bem-vindo ao sistema. Redirecionando...",
        });

        // Redirecionar após login bem-sucedido
        console.log('User signed in with role:', profile?.role);
        setTimeout(() => {
          redirectUserBasedOnRole(profile);
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
      
      // Limpar estado primeiro
      cleanupAuthState();
      
      // Tentar logout global
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global signout failed, continuing...');
      }
      
      // Limpar estados locais
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      
      // Redirecionar para página de login após logout
      window.location.href = '/auth';
      
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
