
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Investor {
  id: string;
  profile_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  address: any;
  birth_date: string | null;
  profession: string | null;
  income_range: string | null;
  investment_experience: string | null;
  status: 'lead' | 'contacted' | 'proposal_sent' | 'negotiation' | 'analysis' | 'invested' | 'lost';
  lead_source: 'website' | 'partner' | 'referral' | 'social_media' | 'direct';
  partner_id: string | null;
  notes: string | null;
  tags: string[] | null;
  last_contact_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useInvestors = () => {
  return useQuery({
    queryKey: ['investors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investors:', error);
        throw error;
      }

      return data as Investor[];
    },
  });
};

export const useInvestorMutations = () => {
  const queryClient = useQueryClient();

  const createInvestor = useMutation({
    mutationFn: async (investorData: Partial<Investor>) => {
      const { data, error } = await supabase
        .from('investors')
        .insert([investorData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      toast({
        title: "Investidor criado",
        description: "Novo investidor foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar investidor",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateInvestorStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('investors')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investors'] });
      toast({
        title: "Status atualizado",
        description: "Status do investidor foi atualizado com sucesso.",
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
    createInvestor,
    updateInvestorStatus,
  };
};
