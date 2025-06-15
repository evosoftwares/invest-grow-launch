
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface PartnerLink {
  id: string;
  partner_id: string;
  name: string;
  description?: string;
  code: string;
  url: string;
  clicks: number;
  conversions: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// Função para gerar código único
const generateUniqueCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const usePartnerLinks = (partnerId?: string) => {
  return useQuery({
    queryKey: ['partner-links', partnerId],
    queryFn: async () => {
      if (!partnerId) return [];
      
      console.log('Fetching partner links for:', partnerId);
      const { data, error } = await supabase
        .from('partner_links')
        .select('*')
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partner links:', error);
        throw error;
      }

      console.log('Partner links fetched:', data?.length);
      return data as PartnerLink[];
    },
    enabled: !!partnerId,
  });
};

export const usePartnerLinkMutations = () => {
  const queryClient = useQueryClient();

  const createPartnerLink = useMutation({
    mutationFn: async (linkData: {
      partner_id: string;
      name: string;
      description?: string;
    }) => {
      // Gerar código único
      let code = generateUniqueCode();
      let isUnique = false;
      
      // Verificar se o código já existe e gerar novo se necessário
      while (!isUnique) {
        const { data: existingLink } = await supabase
          .from('partner_links')
          .select('id')
          .eq('code', code)
          .single();
          
        if (!existingLink) {
          isUnique = true;
        } else {
          code = generateUniqueCode();
        }
      }

      const url = `https://futuropdv.com/ref/${code}`;

      const { data, error } = await supabase
        .from('partner_links')
        .insert([{
          partner_id: linkData.partner_id,
          name: linkData.name,
          description: linkData.description,
          code: code,
          url: url,
          clicks: 0,
          conversions: 0,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-links'] });
      toast({
        title: "Link criado com sucesso!",
        description: "Seu link de indicação foi criado e já está ativo.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating partner link:', error);
      toast({
        title: "Erro ao criar link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePartnerLink = useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<Pick<PartnerLink, 'name' | 'description' | 'is_active'>>
    }) => {
      const { data, error } = await supabase
        .from('partner_links')
        .update({ 
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-links'] });
      toast({
        title: "Link atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating partner link:', error);
      toast({
        title: "Erro ao atualizar link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePartnerLink = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('partner_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-links'] });
      toast({
        title: "Link removido!",
        description: "O link foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting partner link:', error);
      toast({
        title: "Erro ao remover link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createPartnerLink,
    updatePartnerLink,
    deletePartnerLink,
  };
};
