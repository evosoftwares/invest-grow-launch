
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface PartnerCommission {
  id: string;
  partner_id: string;
  investment_id: string;
  amount: number;
  rate: number;
  calculated_at: string;
  paid_at: string | null;
  notes: string | null;
  payment_reference: string | null;
  investments?: {
    amount: number;
    investors?: {
      full_name: string;
      email: string;
    } | null;
  } | null;
}

export const usePartnerCommissions = () => {
  const { userProfile } = useAuth();

  return useQuery({
    queryKey: ['partner-commissions', userProfile?.id],
    queryFn: async () => {
      if (!userProfile) {
        throw new Error('User not authenticated');
      }

      console.log('🔍 Fetching partner commissions for user:', userProfile.id);

      // Primeiro, buscar o partner_id baseado no profile_id
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('profile_id', userProfile.id)
        .single();

      if (partnerError) {
        console.error('❌ Error fetching partner:', partnerError);
        throw partnerError;
      }

      if (!partnerData) {
        console.log('⚠️ No partner found for user');
        return [];
      }

      // Buscar as comissões do parceiro com dados relacionados
      const { data, error } = await supabase
        .from('commissions')
        .select(`
          *,
          investments!commissions_investment_id_fkey (
            amount,
            investors!investments_investor_id_fkey (
              full_name,
              email
            )
          )
        `)
        .eq('partner_id', partnerData.id)
        .order('calculated_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching partner commissions:', error);
        throw error;
      }

      console.log('💰 Partner commissions fetched:', data?.length);
      
      // CORREÇÃO: Validar e filtrar datas das comissões
      const now = new Date();
      const validCommissions = data?.filter(commission => {
        // Verificar se paid_at não é futuro (após correção no banco)
        if (commission.paid_at) {
          const paidDate = new Date(commission.paid_at);
          if (paidDate > now) {
            console.warn(`⚠️ Found commission with future paid_at (should be fixed):`, commission.id);
            return false; // Filtrar comissões com datas futuras
          }
        }
        return true;
      }) || [];
      
      console.log('✅ Valid commissions after filtering:', validCommissions.length);
      
      return validCommissions as PartnerCommission[];
    },
    enabled: !!userProfile,
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });
};
