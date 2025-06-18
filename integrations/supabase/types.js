export const Constants = {
    public: {
        Enums: {
            commission_status: ["pending", "calculated", "paid", "cancelled"],
            investment_status: [
                "pending",
                "analysis",
                "approved",
                "rejected",
                "paid",
            ],
            investor_status: [
                "lead",
                "contacted",
                "proposal_sent",
                "negotiation",
                "analysis",
                "invested",
                "lost",
            ],
            lead_source: ["website", "partner", "referral", "social_media", "direct"],
            partner_status: ["pending", "active", "inactive", "blocked"],
            user_role: ["admin", "partner", "investor"],
        },
    },
};
