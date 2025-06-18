var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
export const useInvestmentApprovals = () => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const approveInvestment = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ investmentId, notes }) {
            console.log('Approving investment:', investmentId);
            const { data, error } = yield supabase
                .from('investments')
                .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                approved_by: user === null || user === void 0 ? void 0 : user.id,
                notes: notes || null
            })
                .eq('id', investmentId)
                .select('*')
                .single();
            if (error) {
                console.error('Error approving investment:', error);
                throw error;
            }
            return data;
        }),
        onSuccess: () => {
            toast({
                title: "Investimento aprovado",
                description: "O investimento foi aprovado com sucesso.",
            });
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
        },
        onError: (error) => {
            console.error('Error in approveInvestment:', error);
            toast({
                title: "Erro ao aprovar",
                description: error.message || "Erro ao aprovar investimento.",
                variant: "destructive",
            });
        },
    });
    const rejectInvestment = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ investmentId, notes }) {
            console.log('Rejecting investment:', investmentId);
            const { data, error } = yield supabase
                .from('investments')
                .update({
                status: 'rejected',
                approved_by: user === null || user === void 0 ? void 0 : user.id,
                notes: notes
            })
                .eq('id', investmentId)
                .select('*')
                .single();
            if (error) {
                console.error('Error rejecting investment:', error);
                throw error;
            }
            return data;
        }),
        onSuccess: () => {
            toast({
                title: "Investimento rejeitado",
                description: "O investimento foi rejeitado.",
            });
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
        },
        onError: (error) => {
            console.error('Error in rejectInvestment:', error);
            toast({
                title: "Erro ao rejeitar",
                description: error.message || "Erro ao rejeitar investimento.",
                variant: "destructive",
            });
        },
    });
    return {
        approveInvestment: approveInvestment.mutate,
        rejectInvestment: rejectInvestment.mutate,
        isApproving: approveInvestment.isPending,
        isRejecting: rejectInvestment.isPending,
        loading
    };
};
