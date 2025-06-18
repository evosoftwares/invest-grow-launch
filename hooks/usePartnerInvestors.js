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
export const usePartnerInvestors = (partnerId) => {
    return useQuery({
        queryKey: ['partner-investors', partnerId],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!partnerId)
                return [];
            console.log('Fetching investors for partner:', partnerId);
            const { data, error } = yield supabase
                .from('investors')
                .select('*')
                .eq('partner_id', partnerId)
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching partner investors:', error);
                throw error;
            }
            console.log('Partner investors fetched:', data === null || data === void 0 ? void 0 : data.length);
            return data;
        }),
        enabled: !!partnerId,
    });
};
export const usePartnerInvestorMutations = () => {
    const queryClient = useQueryClient();
    const createPartnerInvestor = useMutation({
        mutationFn: (investorData) => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from('investors')
                .insert([Object.assign(Object.assign({}, investorData), { full_name: investorData.full_name || '', email: investorData.email || '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() })])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
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
        onError: (error) => {
            console.error('Error creating partner investor:', error);
            toast({
                title: "Erro ao cadastrar investidor",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const updatePartnerInvestorStatus = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
            const { data, error } = yield supabase
                .from('investors')
                .update({
                status,
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
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
        onError: (error) => {
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
