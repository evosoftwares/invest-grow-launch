var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
export const usePartners = () => {
    return useQuery({
        queryKey: ['partners'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from('partners')
                .select(`
          *,
          profiles!partners_profile_id_fkey (
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
            return data === null || data === void 0 ? void 0 : data.map(partner => (Object.assign(Object.assign({}, partner), { profiles: partner.profiles && !Array.isArray(partner.profiles) ? partner.profiles : null })));
        }),
    });
};
export const usePartnerMutations = () => {
    const queryClient = useQueryClient();
    const updatePartnerStatus = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
            const { data, error } = yield supabase
                .from('partners')
                .update({
                status,
                approved_at: status === 'active' ? new Date().toISOString() : null
            })
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast({
                title: "Status atualizado",
                description: "Status do parceiro foi atualizado com sucesso.",
            });
        },
        onError: (error) => {
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
