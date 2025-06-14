
-- Criar enum para roles de usuário
CREATE TYPE public.user_role AS ENUM ('admin', 'partner', 'investor');

-- Criar enum para status de investidor
CREATE TYPE public.investor_status AS ENUM ('lead', 'contacted', 'proposal_sent', 'negotiation', 'analysis', 'invested', 'lost');

-- Criar enum para origem do lead
CREATE TYPE public.lead_source AS ENUM ('website', 'partner', 'referral', 'social_media', 'direct');

-- Criar enum para status de parceiro
CREATE TYPE public.partner_status AS ENUM ('pending', 'active', 'inactive', 'blocked');

-- Criar enum para status de investimento
CREATE TYPE public.investment_status AS ENUM ('pending', 'analysis', 'approved', 'rejected', 'paid');

-- Criar enum para status de comissão
CREATE TYPE public.commission_status AS ENUM ('pending', 'calculated', 'paid', 'cancelled');

-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'investor',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de investidores
CREATE TABLE public.investors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cpf TEXT,
  address JSONB,
  birth_date DATE,
  profession TEXT,
  income_range TEXT,
  investment_experience TEXT,
  status investor_status DEFAULT 'lead',
  lead_source lead_source DEFAULT 'website',
  partner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  tags TEXT[],
  last_contact_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de parceiros
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT,
  cnpj TEXT,
  commission_rate DECIMAL(4,2) DEFAULT 5.00,
  status partner_status DEFAULT 'pending',
  bank_details JSONB,
  address JSONB,
  specialty TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de investimentos
CREATE TABLE public.investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  amount DECIMAL(15,2) NOT NULL,
  status investment_status DEFAULT 'pending',
  investment_type TEXT DEFAULT 'equity',
  documents JSONB,
  contract_url TEXT,
  payment_proof_url TEXT,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de links de parceiros
CREATE TABLE public.partner_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  name TEXT,
  description TEXT,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de comissões
CREATE TABLE public.commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  investment_id UUID NOT NULL REFERENCES public.investments(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  rate DECIMAL(4,2) NOT NULL,
  status commission_status DEFAULT 'pending',
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_reference TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(investment_id) -- Uma comissão por investimento
);

-- Criar tabela de comunicações
CREATE TABLE public.communications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'email', 'phone', 'whatsapp', 'meeting'
  subject TEXT,
  content TEXT,
  sent_by UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'failed'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de configurações do sistema
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de atividades/logs
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  entity_type TEXT NOT NULL, -- 'investor', 'partner', 'investment', etc
  entity_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'created', 'updated', 'deleted', 'status_changed'
  description TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Função para verificar se o usuário tem um role específico
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

-- Função para verificar se é admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Políticas RLS básicas para profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para investors
CREATE POLICY "Admins can manage all investors"
  ON public.investors FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Partners can view their own leads"
  ON public.investors FOR SELECT
  USING (
    public.has_role(auth.uid(), 'partner') AND 
    partner_id IN (SELECT id FROM public.partners WHERE profile_id = auth.uid())
  );

-- Políticas RLS para partners
CREATE POLICY "Partners can view their own data"
  ON public.partners FOR SELECT
  USING (profile_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage all partners"
  ON public.partners FOR ALL
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para investments
CREATE POLICY "Admins can manage all investments"
  ON public.investments FOR ALL
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para partner_links
CREATE POLICY "Partners can manage their own links"
  ON public.partner_links FOR ALL
  USING (
    partner_id IN (SELECT id FROM public.partners WHERE profile_id = auth.uid()) OR
    public.is_admin(auth.uid())
  );

-- Políticas RLS para commissions
CREATE POLICY "Partners can view their own commissions"
  ON public.commissions FOR SELECT
  USING (
    partner_id IN (SELECT id FROM public.partners WHERE profile_id = auth.uid()) OR
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all commissions"
  ON public.commissions FOR ALL
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para communications
CREATE POLICY "Admins can manage all communications"
  ON public.communications FOR ALL
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para system_settings
CREATE POLICY "Admins can manage system settings"
  ON public.system_settings FOR ALL
  USING (public.is_admin(auth.uid()));

-- Políticas RLS para activities
CREATE POLICY "Admins can view all activities"
  ON public.activities FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas relevantes
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER investors_updated_at BEFORE UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER partners_updated_at BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER investments_updated_at BEFORE UPDATE ON public.investments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER partner_links_updated_at BEFORE UPDATE ON public.partner_links
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER system_settings_updated_at BEFORE UPDATE ON public.system_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger para criar perfil automaticamente quando usuário se cadastra
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir configurações padrão do sistema
INSERT INTO public.system_settings (key, value, description) VALUES
('company_name', '"Futuro PDV"', 'Nome da empresa'),
('investment_goal', '2500000', 'Meta de captação em reais'),
('default_commission_rate', '5.0', 'Taxa de comissão padrão para parceiros (%)'),
('min_investment', '25000', 'Valor mínimo de investimento'),
('max_investment', '500000', 'Valor máximo de investimento por investidor'),
('campaign_duration_days', '45', 'Duração da campanha em dias'),
('email_templates', '{"welcome": "Bem-vindo!", "investment_confirmation": "Investimento confirmado"}', 'Templates de email');
