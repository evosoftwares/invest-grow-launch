
-- Corrigir dados inconsistentes
-- Atualizar status do investidor Carlos Oliveira para "invested" já que ele tem investimentos aprovados
UPDATE public.investors 
SET status = 'invested', 
    updated_at = now()
WHERE full_name = 'Carlos Oliveira' 
  AND status = 'lead'
  AND id IN (
    SELECT investor_id 
    FROM public.investments 
    WHERE status IN ('approved', 'paid')
  );

-- Corrigir datas futuras nas comissões (assumindo que são erros)
UPDATE public.commissions 
SET paid_at = calculated_at
WHERE paid_at > now();

-- Criar função para sincronizar status do investidor com investimentos
CREATE OR REPLACE FUNCTION public.sync_investor_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Se o investimento foi aprovado ou pago, atualizar o status do investidor para 'invested'
    IF NEW.status IN ('approved', 'paid') AND OLD.status NOT IN ('approved', 'paid') THEN
        UPDATE public.investors 
        SET status = 'invested', 
            updated_at = now()
        WHERE id = NEW.investor_id 
          AND status NOT IN ('invested');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para sincronização automática
DROP TRIGGER IF EXISTS sync_investor_status_trigger ON public.investments;
CREATE TRIGGER sync_investor_status_trigger
    AFTER UPDATE ON public.investments
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_investor_status();

-- Criar função para validar consistência dos dados
CREATE OR REPLACE FUNCTION public.validate_partner_data_consistency()
RETURNS TABLE (
    issue_type TEXT,
    description TEXT,
    count BIGINT
) AS $$
BEGIN
    -- Investidores com status inconsistente
    RETURN QUERY
    SELECT 
        'inconsistent_investor_status'::TEXT,
        'Investors with lead/contacted status but approved investments'::TEXT,
        COUNT(*)
    FROM public.investors i
    WHERE i.status IN ('lead', 'contacted')
      AND EXISTS (
          SELECT 1 FROM public.investments inv 
          WHERE inv.investor_id = i.id 
            AND inv.status IN ('approved', 'paid')
      );
    
    -- Comissões com datas futuras
    RETURN QUERY
    SELECT 
        'future_commission_dates'::TEXT,
        'Commissions with paid_at dates in the future'::TEXT,
        COUNT(*)
    FROM public.commissions
    WHERE paid_at > now();
    
    -- Investimentos sem partner_id mas com comissões
    RETURN QUERY
    SELECT 
        'missing_partner_id'::TEXT,
        'Investments with commissions but no partner_id'::TEXT,
        COUNT(*)
    FROM public.investments i
    WHERE i.partner_id IS NULL
      AND EXISTS (
          SELECT 1 FROM public.commissions c 
          WHERE c.investment_id = i.id
      );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
