
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useSystemSettings = () => {
  return useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      console.log('Fetching system settings...');
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');

      if (error) {
        console.error('Error fetching system settings:', error);
        throw error;
      }

      console.log('System settings fetched:', data?.length);
      return data as SystemSetting[];
    },
  });
};

export const useSystemSettingsMutations = () => {
  const queryClient = useQueryClient();

  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase
        .from('system_settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast({
        title: "Configuração atualizada",
        description: "A configuração foi atualizada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar configuração",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    updateSetting,
  };
};
