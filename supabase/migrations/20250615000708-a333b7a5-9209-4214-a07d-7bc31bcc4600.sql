
-- Adicionar colunas que estão faltando
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE public.investments ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';  
ALTER TABLE public.investors ADD COLUMN IF NOT EXISTS status text DEFAULT 'lead';
ALTER TABLE public.investors ADD COLUMN IF NOT EXISTS lead_source text DEFAULT 'website';

-- Corrigir foreign key para profiles (verificar se já existe antes)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'partners_profile_id_fkey' 
        AND table_name = 'partners'
    ) THEN
        ALTER TABLE public.partners 
        ADD CONSTRAINT partners_profile_id_fkey 
        FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Remover trigger existente (seguindo as regras)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Remover functions existentes (seguindo as regras)
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.test_profile_creation();

-- Desabilitar RLS em todas as tabelas (seguindo as regras)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings DISABLE ROW LEVEL SECURITY;
