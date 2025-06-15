
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Investor } from './useInvestors';

export const usePartnerInvestors = (partnerId?: string) => {
  return useQuery({
    queryKey: ['partner-investors', partnerId],
    queryFn: async () => {
      if (!partnerId) return [];
      
      console.log('Fetching investors for partner:', partnerId);
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partner investors:', error);
        throw error;
      }

      console.log('Partner investors fetched:', data?.length);
      return data as Investor[];
    },
    enabled: !!partnerId,
  });
};

export const usePartnerInvestorMutations = () => {
  const queryClient = useQueryClient();

  const createPartnerInvestor = useMutation({
    mutationFn: async (investorData: Omit<Investor, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investors')
        .insert([{
          ...investorData,
          full_name: investorData.full_name || '',
          email: investorData.email || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['partner-investors'] });
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      queryClient.invalidateQueries({ queryKey: ['partner-stats'] });
      toast({
        title: "Investidor cadastrado",
        description: "Investidor foi cadastrado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating partner investor:', error);
      toast({
        title: "Erro ao cadastrar investidor",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePartnerInvestorStatus = useMutation({
    mutationFn: async ({ 
      id, 
      status 
    }: { 
      id: string; 
      status: 'lead' | 'contacted' | 'proposal_sent' | 'negotiation' | 'analysis' | 'invested' | 'lost' 
    }) => {
      const { data, error } = await supabase
        .from('investors')
        .update({ 
          status,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-investors'] });
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      queryClient.invalidateQueries({ queryKey: ['partner-stats'] });
      toast({
        title: "Status atualizado",
        description: "Status do investidor foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating investor status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createPartnerInvestor,
    updatePartnerInvestorStatus,
  };
};
