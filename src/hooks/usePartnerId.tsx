
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const usePartnerId = () => {
  const { userProfile } = useAuth();

  return useQuery({
    queryKey: ['partner-id', userProfile?.id],
    queryFn: async () => {
      if (!userProfile?.id) {
        console.log('No user profile available');
        return null;
      }
      
      if (userProfile.role !== 'partner') {
        console.log('User is not a partner');
        return null;
      }
      
      console.log('Fetching partner_id for profile:', userProfile.id);
      const { data, error } = await supabase
        .from('partners')
        .select('id')
        .eq('profile_id', userProfile.id)
        .single();

      if (error) {
        console.error('Error fetching partner_id:', error);
        throw new Error(`Failed to fetch partner data: ${error.message}`);
      }

      console.log('Partner_id found:', data?.id);
      return data?.id || null;
    },
    enabled: !!userProfile?.id && userProfile?.role === 'partner',
    retry: 3,
    retryDelay: 1000,
  });
};
