
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
      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      };

      // Set timestamps based on status
      if (status === 'approved') {
        updateData.approved_at = new Date().toISOString();
      } else if (status === 'paid') {
        updateData.paid_at = new Date().toISOString();
        // If setting to paid, also set approved_at if not already set
        const { data: currentData } = await supabase
          .from('investments')
          .select('approved_at')
          .eq('id', id)
          .single();
        
        if (!currentData?.approved_at) {
          updateData.approved_at = new Date().toISOString();
        }
      }

      const { data, error } = await supabase
        .from('investments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      toast({
        title: "Status atualizado",
        description: "Status do investimento foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating investment status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createInvestment = useMutation({
    mutationFn: async (investmentData: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([investmentData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      toast({
        title: "Investimento criado",
        description: "Investimento foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating investment:', error);
      toast({
        title: "Erro ao criar investimento",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateInvestmentStatus,
    createInvestment,
  };
};
