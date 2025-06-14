
-- Verificar e recriar os tipos enum se necessário
DO $$ 
BEGIN
    -- Deletar e recriar o tipo user_role para garantir que existe
    DROP TYPE IF EXISTS public.user_role CASCADE;
    CREATE TYPE public.user_role AS ENUM ('admin', 'partner', 'investor');
    
    -- Recriar outros tipos se necessário
    DROP TYPE IF EXISTS public.investor_status CASCADE;
    CREATE TYPE public.investor_status AS ENUM ('lead', 'contacted', 'proposal_sent', 'negotiation', 'analysis', 'invested', 'lost');
    
    DROP TYPE IF EXISTS public.lead_source CASCADE;
    CREATE TYPE public.lead_source AS ENUM ('website', 'partner', 'referral', 'social_media', 'direct');
    
    DROP TYPE IF EXISTS public.partner_status CASCADE;
    CREATE TYPE public.partner_status AS ENUM ('pending', 'active', 'inactive', 'blocked');
    
    DROP TYPE IF EXISTS public.investment_status CASCADE;
    CREATE TYPE public.investment_status AS ENUM ('pending', 'analysis', 'approved', 'rejected', 'paid');
    
    DROP TYPE IF EXISTS public.commission_status CASCADE;
    CREATE TYPE public.commission_status AS ENUM ('pending', 'calculated', 'paid', 'cancelled');
END $$;

-- Recriar a tabela profiles com o tipo correto
DROP TABLE IF EXISTS public.profiles CASCADE;
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'investor'::user_role,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS na nova tabela
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Recriar a função handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role_value user_role;
BEGIN
    -- Log para debug
    RAISE LOG 'Creating profile for user: %', NEW.id;
    
    -- Determinar o role do usuário
    user_role_value := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'investor'::user_role);
    
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

-- Recriar a função de teste
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
