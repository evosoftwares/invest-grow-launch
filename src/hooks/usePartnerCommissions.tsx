
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { usePartnerId } from '@/hooks/usePartnerId';

export const usePartnerCommissions = () => {
  const { data: partnerId } = usePartnerId();

  return useQuery({
    queryKey: ['partner-commissions', partnerId],
    queryFn: async () => {
      if (!partnerId) {
        console.log('No partner ID available');
        return [];
      }

      console.log('Fetching commissions for partner:', partnerId);
      
      const { data, error } = await supabase
        .from('commissions')
        .select(`
          *,
          investments (
            amount,
            investor_id,
            created_at,
            investors (
              full_name
            )
          )
        `)
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partner commissions:', error);
        throw new Error(`Failed to fetch commissions: ${error.message}`);
      }

      console.log('Partner commissions fetched:', data);
      
      // Transform data to match the expected format
      return data?.map(commission => ({
        id: commission.id,
        investor_name: commission.investments?.investors?.full_name || 'Investidor não identificado',
        type: 'inicial', // Por enquanto sempre inicial, pode ser expandido depois
        amount: Number(commission.amount),
        investment_amount: Number(commission.investments?.amount || 0),
        rate: Number(commission.rate),
        date: commission.created_at,
        status: commission.paid_at ? 'pago' : 'pendente'
      })) || [];
    },
    enabled: !!partnerId,
    retry: 3,
    retryDelay: 1000,
  });
};
