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
import { useAuth } from '@/hooks/useAuth';
export const usePartnerId = () => {
    const { userProfile } = useAuth();
    return useQuery({
        queryKey: ['partner-id', userProfile === null || userProfile === void 0 ? void 0 : userProfile.id],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id)) {
                console.log('No user profile available');
                return null;
            }
            if (userProfile.role !== 'partner') {
                console.log('User is not a partner');
                return null;
            }
            console.log('Fetching partner_id for profile:', userProfile.id);
            const { data, error } = yield supabase
                .from('partners')
                .select('id')
                .eq('profile_id', userProfile.id)
                .single();
            if (error) {
                console.error('Error fetching partner_id:', error);
                throw new Error(`Failed to fetch partner data: ${error.message}`);
            }
            console.log('Partner_id found:', data === null || data === void 0 ? void 0 : data.id);
            return (data === null || data === void 0 ? void 0 : data.id) || null;
        }),
        enabled: !!(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id) && (userProfile === null || userProfile === void 0 ? void 0 : userProfile.role) === 'partner',
        retry: 3,
        retryDelay: 1000,
    });
};
