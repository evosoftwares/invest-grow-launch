
-- Verificar se os enums existem e criar se necessário
DO $$ 
BEGIN
    -- Criar enum para roles de usuário se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('admin', 'partner', 'investor');
    END IF;

    -- Criar enum para status de investidor se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'investor_status') THEN
        CREATE TYPE public.investor_status AS ENUM ('lead', 'contacted', 'proposal_sent', 'negotiation', 'analysis', 'invested', 'lost');
    END IF;

    -- Criar enum para origem do lead se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_source') THEN
        CREATE TYPE public.lead_source AS ENUM ('website', 'partner', 'referral', 'social_media', 'direct');
    END IF;

    -- Criar enum para status de parceiro se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'partner_status') THEN
        CREATE TYPE public.partner_status AS ENUM ('pending', 'active', 'inactive', 'blocked');
    END IF;

    -- Criar enum para status de investimento se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'investment_status') THEN
        CREATE TYPE public.investment_status AS ENUM ('pending', 'analysis', 'approved', 'rejected', 'paid');
    END IF;

    -- Criar enum para status de comissão se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'commission_status') THEN
        CREATE TYPE public.commission_status AS ENUM ('pending', 'calculated', 'paid', 'cancelled');
    END IF;
END $$;

-- Verificar e recriar as funções se necessário
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'investor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verificar se o trigger existe e criar se necessário
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar e aplicar triggers de updated_at em todas as tabelas
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Verificar e inserir configurações padrão do sistema se não existirem
INSERT INTO public.system_settings (key, value, description) 
SELECT 'company_name', '"Futuro PDV"', 'Nome da empresa'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'company_name');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'investment_goal', '2500000', 'Meta de captação em reais'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'investment_goal');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'default_commission_rate', '5.0', 'Taxa de comissão padrão para parceiros (%)'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'default_commission_rate');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'min_investment', '25000', 'Valor mínimo de investimento'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'min_investment');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'max_investment', '500000', 'Valor máximo de investimento por investidor'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'max_investment');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'campaign_duration_days', '45', 'Duração da campanha em dias'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'campaign_duration_days');
