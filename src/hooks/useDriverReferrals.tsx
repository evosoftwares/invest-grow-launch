import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

type DriverReferral = Tables<"driver_referrals">;
type DriverReferralInsert = TablesInsert<"driver_referrals">;
type DriverReferralUpdate = TablesUpdate<"driver_referrals">;

export const useDriverReferrals = () => {
  const queryClient = useQueryClient();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ["driver-referrals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("driver_referrals")
        .select(`
          *,
          referrer:partners!referrer_id(
            id,
            business_name,
            profile_id,
            profiles(full_name, email)
          ),
          referred:partners!referred_id(
            id,
            business_name,
            profile_id,
            profiles(full_name, email)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createReferralMutation = useMutation({
    mutationFn: async (referral: DriverReferralInsert) => {
      const { data, error } = await supabase
        .from("driver_referrals")
        .insert(referral)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-referrals"] });
      toast.success("Indicação criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar indicação: " + error.message);
    },
  });

  const updateReferralMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: DriverReferralUpdate }) => {
      const { data, error } = await supabase
        .from("driver_referrals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-referrals"] });
      toast.success("Indicação atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar indicação: " + error.message);
    },
  });

  const approveReferralMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("driver_referrals")
        .update({ 
          status: "active",
          approved_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-referrals"] });
      toast.success("Indicação aprovada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao aprovar indicação: " + error.message);
    },
  });

  const deleteReferralMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("driver_referrals")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-referrals"] });
      toast.success("Indicação removida com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao remover indicação: " + error.message);
    },
  });

  return {
    referrals,
    isLoading,
    createReferral: createReferralMutation.mutate,
    updateReferral: updateReferralMutation.mutate,
    approveReferral: approveReferralMutation.mutate,
    deleteReferral: deleteReferralMutation.mutate,
    isCreating: createReferralMutation.isPending,
    isUpdating: updateReferralMutation.isPending,
    isApproving: approveReferralMutation.isPending,
    isDeleting: deleteReferralMutation.isPending,
  };
};