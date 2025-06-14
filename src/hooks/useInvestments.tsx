
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Investment {
  id: string;
  investor_id: string;
  partner_id: string | null;
  amount: number;
  status: 'pending' | 'analysis' | 'approved' | 'rejected' | 'paid';
  investment_type: string | null;
  documents: any;
  contract_url: string | null;
  payment_proof_url: string | null;
  approved_by: string | null;
  approved_at: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  investors?: {
    full_name: string;
    email: string;
    phone: string | null;
  } | null;
  partners?: {
    business_name: string | null;
    profiles?: {
      full_name: string | null;
    } | null;
  } | null;
}

export const useInvestments = () => {
  return useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      console.log('Fetching investments...');
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          investors!investments_investor_id_fkey (
            full_name,
            email,
            phone
          ),
          partners!investments_partner_id_fkey (
            business_name,
            profiles!partners_profile_id_fkey (
              full_name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investments:', error);
        throw error;
      }

      console.log('Investments fetched:', data?.length);
      return data as Investment[];
    },
  });
};

export const useInvestmentMutations = () => {
  const queryClient = useQueryClient();

  const updateInvestmentStatus = useMutation({
    mutationFn: async ({ 
      id, 
      status 
    }: { 
      id: string; 
      status: 'pending' | 'analysis' | 'approved' | 'rejected' | 'paid' 
    }) => {
      const { data, error } = await supabase
        .from('investments')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          paid_at: status === 'paid' ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast({
        title: "Status atualizado",
        description: "Status do investimento foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateInvestmentStatus,
  };
};
