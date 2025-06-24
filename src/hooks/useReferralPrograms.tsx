import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

type ReferralProgram = Tables<"referral_programs">;
type ReferralProgramInsert = TablesInsert<"referral_programs">;
type ReferralProgramUpdate = TablesUpdate<"referral_programs">;

export const useReferralPrograms = () => {
  const queryClient = useQueryClient();

  const { data: programs, isLoading } = useQuery({
    queryKey: ["referral-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referral_programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: activeProgram } = useQuery({
    queryKey: ["active-referral-program"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referral_programs")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const createProgramMutation = useMutation({
    mutationFn: async (program: ReferralProgramInsert) => {
      const { data, error } = await supabase
        .from("referral_programs")
        .insert(program)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral-programs"] });
      queryClient.invalidateQueries({ queryKey: ["active-referral-program"] });
      toast.success("Programa de indicação criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar programa: " + error.message);
    },
  });

  const updateProgramMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ReferralProgramUpdate }) => {
      const { data, error } = await supabase
        .from("referral_programs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral-programs"] });
      queryClient.invalidateQueries({ queryKey: ["active-referral-program"] });
      toast.success("Programa atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar programa: " + error.message);
    },
  });

  const activateProgramMutation = useMutation({
    mutationFn: async (id: string) => {
      // First, deactivate all other programs
      await supabase
        .from("referral_programs")
        .update({ is_active: false })
        .neq("id", id);

      // Then activate the selected program
      const { data, error } = await supabase
        .from("referral_programs")
        .update({ is_active: true })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral-programs"] });
      queryClient.invalidateQueries({ queryKey: ["active-referral-program"] });
      toast.success("Programa ativado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao ativar programa: " + error.message);
    },
  });

  const deleteProgramMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("referral_programs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral-programs"] });
      queryClient.invalidateQueries({ queryKey: ["active-referral-program"] });
      toast.success("Programa removido com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao remover programa: " + error.message);
    },
  });

  return {
    programs,
    activeProgram,
    isLoading,
    createProgram: createProgramMutation.mutate,
    updateProgram: updateProgramMutation.mutate,
    activateProgram: activateProgramMutation.mutate,
    deleteProgram: deleteProgramMutation.mutate,
    isCreating: createProgramMutation.isPending,
    isUpdating: updateProgramMutation.isPending,
    isActivating: activateProgramMutation.isPending,
    isDeleting: deleteProgramMutation.isPending,
  };
};