import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReferralStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["referral-stats"],
    queryFn: async () => {
      // Get total referrals count
      const { count: totalReferrals } = await supabase
        .from("driver_referrals")
        .select("*", { count: "exact", head: true });

      // Get active referrals count
      const { count: activeReferrals } = await supabase
        .from("driver_referrals")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Get completed referrals count
      const { count: completedReferrals } = await supabase
        .from("driver_referrals")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed");

      // Get pending referrals count
      const { count: pendingReferrals } = await supabase
        .from("driver_referrals")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Get total bonus amount paid
      const { data: bonusData } = await supabase
        .from("referral_bonuses")
        .select("amount")
        .not("paid_at", "is", null);

      const totalBonusPaid = bonusData?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0;

      // Get pending bonus amount
      const { data: pendingBonusData } = await supabase
        .from("referral_bonuses")
        .select("amount")
        .is("paid_at", null);

      const pendingBonusAmount = pendingBonusData?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0;

      // Get top referrers
      const { data: topReferrers } = await supabase
        .from("driver_referrals")
        .select(`
          referrer_id,
          referrer:partners!referrer_id(
            business_name,
            profiles(full_name, email)
          )
        `)
        .eq("status", "completed");

      // Count referrals by referrer
      const referrerCounts = topReferrers?.reduce((acc, referral) => {
        const referrerId = referral.referrer_id;
        acc[referrerId] = (acc[referrerId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const topReferrersList = Object.entries(referrerCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([referrerId, count]) => {
          const referrer = topReferrers?.find(r => r.referrer_id === referrerId)?.referrer;
          return {
            id: referrerId,
            name: referrer?.business_name || referrer?.profiles?.full_name || "N/A",
            email: referrer?.profiles?.email || "N/A",
            referralCount: count
          };
        });

      return {
        totalReferrals: totalReferrals || 0,
        activeReferrals: activeReferrals || 0,
        completedReferrals: completedReferrals || 0,
        pendingReferrals: pendingReferrals || 0,
        totalBonusPaid,
        pendingBonusAmount,
        topReferrers: topReferrersList,
        conversionRate: totalReferrals ? Math.round((completedReferrals || 0) / totalReferrals * 100) : 0
      };
    },
  });

  return {
    stats,
    isLoading,
  };
};