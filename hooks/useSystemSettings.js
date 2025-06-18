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
export const useSystemSettings = () => {
    return useQuery({
        queryKey: ['system-settings'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Fetching system settings...');
            const { data, error } = yield supabase
                .from('system_settings')
                .select('*')
                .order('key');
            if (error) {
                console.error('Error fetching system settings:', error);
                throw error;
            }
            console.log('System settings fetched:', data === null || data === void 0 ? void 0 : data.length);
            return data;
        }),
    });
};
export const useSystemSettingsMutations = () => {
    const queryClient = useQueryClient();
    const updateSetting = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ key, value }) {
            const { data, error } = yield supabase
                .from('system_settings')
                .update({ value })
                .eq('key', key)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system-settings'] });
            toast({
                title: "Configuração atualizada",
                description: "A configuração foi atualizada com sucesso.",
            });
        },
        onError: (error) => {
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
