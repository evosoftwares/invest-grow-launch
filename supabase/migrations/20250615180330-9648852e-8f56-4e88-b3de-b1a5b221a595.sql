
-- Desabilitar RLS na tabela commissions
ALTER TABLE public.commissions DISABLE ROW LEVEL SECURITY;

-- Remover todas as policies existentes na tabela commissions  
DROP POLICY IF EXISTS "Partners can view own commissions" ON public.commissions;
DROP POLICY IF EXISTS "Admins can view all commissions" ON public.commissions;

-- Primeiro, criar alguns investidores de exemplo
INSERT INTO public.investors (id, full_name, email, phone, status, partner_id, created_at)
VALUES 
    (gen_random_uuid(), 'João Silva', 'joao.silva@email.com', '(11) 99999-0001', 'invested', (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com')), now() - interval '15 days'),
    (gen_random_uuid(), 'Maria Santos', 'maria.santos@email.com', '(11) 99999-0002', 'invested', (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com')), now() - interval '5 days'),
    (gen_random_uuid(), 'Carlos Oliveira', 'carlos.oliveira@email.com', '(11) 99999-0003', 'invested', (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com')), now() - interval '2 days');

-- Depois, criar investimentos usando os investor_ids válidos
WITH investor_data AS (
    SELECT id as investor_id, full_name, created_at,
           CASE 
               WHEN full_name = 'João Silva' THEN 10000.00
               WHEN full_name = 'Maria Santos' THEN 3000.00
               WHEN full_name = 'Carlos Oliveira' THEN 5000.00
           END as amount
    FROM public.investors 
    WHERE partner_id = (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com'))
)
INSERT INTO public.investments (id, investor_id, partner_id, amount, status, created_at)
SELECT 
    gen_random_uuid(),
    inv.investor_id,
    (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com')),
    inv.amount,
    'approved',
    inv.created_at
FROM investor_data inv;

-- Por fim, criar comissões usando os investment_ids válidos
WITH investment_data AS (
    SELECT 
        i.id as investment_id, 
        i.amount as investment_amount, 
        i.partner_id, 
        i.created_at,
        inv.full_name
    FROM public.investments i
    JOIN public.investors inv ON i.investor_id = inv.id
    WHERE i.partner_id = (SELECT id FROM public.partners WHERE profile_id = (SELECT id FROM public.profiles WHERE email = 'evocloudapps@gmail.com'))
    ORDER BY i.created_at
)
INSERT INTO public.commissions (partner_id, investment_id, amount, rate, calculated_at, paid_at, notes)
SELECT 
    inv.partner_id,
    inv.investment_id,
    CASE 
        WHEN inv.investment_amount = 10000.00 THEN 500.00
        WHEN inv.investment_amount = 3000.00 THEN 75.00
        WHEN inv.investment_amount = 5000.00 THEN 250.00
    END as amount,
    CASE 
        WHEN inv.investment_amount = 3000.00 THEN 2.5
        ELSE 5.0
    END as rate,
    inv.created_at as calculated_at,
    CASE 
        WHEN inv.investment_amount = 3000.00 THEN NULL -- Comissão pendente
        ELSE inv.created_at + interval '3 days'
    END as paid_at,
    CASE 
        WHEN inv.full_name = 'João Silva' THEN 'Comissão inicial - João Silva'
        WHEN inv.full_name = 'Maria Santos' THEN 'Comissão recorrente - Maria Santos'
        WHEN inv.full_name = 'Carlos Oliveira' THEN 'Comissão inicial - Carlos Oliveira'
    END as notes
FROM investment_data inv;
