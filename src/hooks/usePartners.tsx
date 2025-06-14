
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Partner {
  id: string;
  profile_id: string;
  business_name: string | null;
  cnpj: string | null;
  commission_rate: number;
  status: 'pending' | 'active' | 'inactive' | 'blocked';
  bank_details: any;
  address: any;
  specialty: string | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
    phone: string | null;
  } | null;
}

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select(`
          *,
          profiles (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partners:', error);
        throw error;
      }

      return data?.map(partner => ({
        ...partner,
        profiles: partner.profiles && !Array.isArray(partner.profiles) ? partner.profiles : null
      })) as Partner[];
    },
  });
};

export const usePartnerMutations = () => {
  const queryClient = useQueryClient();

  const updatePartnerStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'pending' | 'active' | 'inactive' | 'blocked' }) => {
      const { data, error } = await supabase
        .from('partners')
        .update({ 
          status,
          approved_at: status === 'active' ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast({
        title: "Status atualizado",
        description: "Status do parceiro foi atualizado com sucesso.",
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
    updatePartnerStatus,
  };
};
