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
export const useInvestors = () => {
    return useQuery({
        queryKey: ['investors'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Fetching investors...');
            const { data, error } = yield supabase
                .from('investors')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching investors:', error);
                throw error;
            }
            console.log('Investors fetched:', data === null || data === void 0 ? void 0 : data.length);
            return data;
        }),
    });
};
export const useInvestorMutations = () => {
    const queryClient = useQueryClient();
    const createInvestor = useMutation({
        mutationFn: (investorData) => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from('investors')
                .insert([Object.assign(Object.assign({}, investorData), { full_name: investorData.full_name || '', email: investorData.email || '' })])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investors'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            toast({
                title: "Investidor criado",
                description: "Investidor foi criado com sucesso.",
            });
        },
        onError: (error) => {
            console.error('Error creating investor:', error);
            toast({
                title: "Erro ao criar investidor",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const updateInvestorStatus = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
            const { data, error } = yield supabase
                .from('investors')
                .update({
                status,
                last_contact_date: new Date().toISOString()
            })
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investors'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            toast({
                title: "Status atualizado",
                description: "Status do investidor foi atualizado com sucesso.",
            });
        },
        onError: (error) => {
            console.error('Error updating investor status:', error);
            toast({
                title: "Erro ao atualizar status",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const deleteInvestor = useMutation({
        mutationFn: (id) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = yield supabase
                .from('investors')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investors'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            toast({
                title: "Investidor removido",
                description: "Investidor foi removido com sucesso.",
            });
        },
        onError: (error) => {
            console.error('Error deleting investor:', error);
            toast({
                title: "Erro ao remover investidor",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    return {
        createInvestor,
        updateInvestorStatus,
        deleteInvestor,
    };
};
