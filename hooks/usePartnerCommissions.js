var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
export const usePartnerCommissions = () => {
    const { userProfile } = useAuth();
    return useQuery({
        queryKey: ['partner-commissions', userProfile === null || userProfile === void 0 ? void 0 : userProfile.id],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!userProfile) {
                throw new Error('User not authenticated');
            }
            console.log('🔍 Fetching partner commissions for user:', userProfile.id);
            // Primeiro, buscar o partner_id baseado no profile_id
            const { data: partnerData, error: partnerError } = yield supabase
                .from('partners')
                .select('id')
                .eq('profile_id', userProfile.id)
                .single();
            if (partnerError) {
                console.error('❌ Error fetching partner:', partnerError);
                throw partnerError;
            }
            if (!partnerData) {
                console.log('⚠️ No partner found for user');
                return [];
            }
            // Buscar as comissões do parceiro com dados relacionados
            const { data, error } = yield supabase
                .from('commissions')
                .select(`
          *,
          investments!commissions_investment_id_fkey (
            amount,
            investors!investments_investor_id_fkey (
              full_name,
              email
            )
          )
        `)
                .eq('partner_id', partnerData.id)
                .order('calculated_at', { ascending: false });
            if (error) {
                console.error('❌ Error fetching partner commissions:', error);
                throw error;
            }
            console.log('💰 Partner commissions fetched:', data === null || data === void 0 ? void 0 : data.length);
            // CORREÇÃO: Validar e filtrar datas das comissões
            const now = new Date();
            const validCommissions = (data === null || data === void 0 ? void 0 : data.filter(commission => {
                // Verificar se paid_at não é futuro (após correção no banco)
                if (commission.paid_at) {
                    const paidDate = new Date(commission.paid_at);
                    if (paidDate > now) {
                        console.warn(`⚠️ Found commission with future paid_at (should be fixed):`, commission.id);
                        return false; // Filtrar comissões com datas futuras
                    }
                }
                return true;
            })) || [];
            console.log('✅ Valid commissions after filtering:', validCommissions.length);
            return validCommissions;
        }),
        enabled: !!userProfile,
        refetchInterval: 30000, // Atualizar a cada 30 segundos
    });
};
