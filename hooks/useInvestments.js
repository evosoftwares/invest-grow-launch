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
export const useInvestments = () => {
    return useQuery({
        queryKey: ['investments'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Fetching investments...');
            const { data, error } = yield supabase
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
            console.log('Investments fetched:', data === null || data === void 0 ? void 0 : data.length);
            return data;
        }),
    });
};
export const useInvestmentMutations = () => {
    const queryClient = useQueryClient();
    const updateInvestmentStatus = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
            const updateData = {
                status,
                updated_at: new Date().toISOString()
            };
            // Set timestamps based on status
            if (status === 'approved') {
                updateData.approved_at = new Date().toISOString();
            }
            else if (status === 'paid') {
                updateData.paid_at = new Date().toISOString();
                // If setting to paid, also set approved_at if not already set
                const { data: currentData } = yield supabase
                    .from('investments')
                    .select('approved_at')
                    .eq('id', id)
                    .single();
                if (!(currentData === null || currentData === void 0 ? void 0 : currentData.approved_at)) {
                    updateData.approved_at = new Date().toISOString();
                }
            }
            const { data, error } = yield supabase
                .from('investments')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            toast({
                title: "Status atualizado",
                description: "Status do investimento foi atualizado com sucesso.",
            });
        },
        onError: (error) => {
            console.error('Error updating investment status:', error);
            toast({
                title: "Erro ao atualizar status",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const createInvestment = useMutation({
        mutationFn: (investmentData) => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from('investments')
                .insert([investmentData])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            toast({
                title: "Investimento criado",
                description: "Investimento foi criado com sucesso.",
            });
        },
        onError: (error) => {
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
