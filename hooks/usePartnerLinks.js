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
import { usePartnerId } from './usePartnerId';
// Função para gerar código único
const generateUniqueCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
export const usePartnerLinks = () => {
    const { data: partnerId, error: partnerIdError } = usePartnerId();
    return useQuery({
        queryKey: ['partner-links', partnerId],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!partnerId) {
                if (partnerIdError) {
                    throw partnerIdError;
                }
                console.log('No partner ID available for fetching links');
                return [];
            }
            console.log('Fetching partner links for:', partnerId);
            const { data, error } = yield supabase
                .from('partner_links')
                .select('*')
                .eq('partner_id', partnerId)
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching partner links:', error);
                throw new Error(`Erro ao buscar links: ${error.message}`);
            }
            console.log('Partner links fetched:', data === null || data === void 0 ? void 0 : data.length);
            return data;
        }),
        enabled: !!partnerId,
        retry: (failureCount, error) => {
            // Don't retry if it's a partner ID error
            if (error.message.includes('Failed to fetch partner data')) {
                return false;
            }
            return failureCount < 3;
        },
    });
};
export const usePartnerLinkMutations = () => {
    const queryClient = useQueryClient();
    const { data: partnerId } = usePartnerId();
    const createPartnerLink = useMutation({
        mutationFn: (linkData) => __awaiter(void 0, void 0, void 0, function* () {
            if (!partnerId) {
                throw new Error('ID do parceiro não encontrado. Verifique se sua conta está configurada corretamente.');
            }
            // Gerar código único
            let code = generateUniqueCode();
            let isUnique = false;
            let attempts = 0;
            const maxAttempts = 10;
            // Verificar se o código já existe e gerar novo se necessário
            while (!isUnique && attempts < maxAttempts) {
                const { data: existingLink } = yield supabase
                    .from('partner_links')
                    .select('id')
                    .eq('code', code)
                    .maybeSingle();
                if (!existingLink) {
                    isUnique = true;
                }
                else {
                    code = generateUniqueCode();
                    attempts++;
                }
            }
            if (attempts >= maxAttempts) {
                throw new Error('Não foi possível gerar um código único. Tente novamente.');
            }
            const url = `https://futuropdv.com/ref/${code}`;
            const { data, error } = yield supabase
                .from('partner_links')
                .insert([{
                    partner_id: partnerId,
                    name: linkData.name,
                    description: linkData.description || null,
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
            if (error) {
                console.error('Error creating partner link:', error);
                throw new Error(`Erro ao criar link: ${error.message}`);
            }
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partner-links'] });
            toast({
                title: "Link criado com sucesso!",
                description: "Seu link de indicação foi criado e já está ativo.",
            });
        },
        onError: (error) => {
            console.error('Error creating partner link:', error);
            toast({
                title: "Erro ao criar link",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const updatePartnerLink = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, updates }) {
            const { data, error } = yield supabase
                .from('partner_links')
                .update(Object.assign(Object.assign({}, updates), { updated_at: new Date().toISOString() }))
                .eq('id', id)
                .select()
                .single();
            if (error) {
                console.error('Error updating partner link:', error);
                throw new Error(`Erro ao atualizar link: ${error.message}`);
            }
            return data;
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partner-links'] });
            toast({
                title: "Link atualizado!",
                description: "As alterações foram salvas com sucesso.",
            });
        },
        onError: (error) => {
            console.error('Error updating partner link:', error);
            toast({
                title: "Erro ao atualizar link",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const deletePartnerLink = useMutation({
        mutationFn: (id) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = yield supabase
                .from('partner_links')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error deleting partner link:', error);
                throw new Error(`Erro ao remover link: ${error.message}`);
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partner-links'] });
            toast({
                title: "Link removido!",
                description: "O link foi removido com sucesso.",
            });
        },
        onError: (error) => {
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
