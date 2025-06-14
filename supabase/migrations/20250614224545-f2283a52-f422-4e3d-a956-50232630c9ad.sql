
-- Primeiro, vamos verificar e corrigir as políticas RLS da tabela profiles
-- e melhorar o trigger para capturar erros

-- Desabilitar RLS temporariamente na tabela profiles para permitir inserções pelo trigger
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Recriar a função handle_new_user com melhor tratamento de erro e logging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role_value user_role;
BEGIN
    -- Log para debug
    RAISE LOG 'Creating profile for user: %', NEW.id;
    
    -- Determinar o role do usuário
    user_role_value := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'investor');
    
    -- Log do role determinado
    RAISE LOG 'User role determined as: %', user_role_value;
    
    -- Inserir o perfil
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        user_role_value
    );
    
    -- Log de sucesso
    RAISE LOG 'Profile created successfully for user: %', NEW.id;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log do erro
        RAISE LOG 'Error creating profile for user %: % %', NEW.id, SQLSTATE, SQLERRM;
        -- Re-raise o erro para falhar a transação se necessário
        RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar o trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar políticas RLS mais permissivas para a tabela profiles
-- Permitir que usuários vejam e atualizem seus próprios perfis
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles  
    FOR UPDATE USING (auth.uid() = id);

-- Permitir inserção de novos perfis (necessário para o trigger)
CREATE POLICY "Allow profile creation" ON public.profiles
    FOR INSERT WITH CHECK (true);

-- Reabilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar uma função de teste para verificar se o trigger está funcionando
CREATE OR REPLACE FUNCTION public.test_profile_creation()
RETURNS TABLE(
    profiles_count bigint,
    latest_profile_id uuid,
    latest_profile_email text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        count(*)::bigint as profiles_count,
        p.id as latest_profile_id,
        p.email as latest_profile_email
    FROM public.profiles p
    ORDER BY p.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
