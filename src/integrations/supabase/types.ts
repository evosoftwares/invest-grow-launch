export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount: number
          calculated_at: string | null
          created_at: string | null
          id: string
          investment_id: string
          notes: string | null
          paid_at: string | null
          partner_id: string
          payment_reference: string | null
          rate: number
          status: Database["public"]["Enums"]["commission_status"] | null
        }
        Insert: {
          amount: number
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          investment_id: string
          notes?: string | null
          paid_at?: string | null
          partner_id: string
          payment_reference?: string | null
          rate: number
          status?: Database["public"]["Enums"]["commission_status"] | null
        }
        Update: {
          amount?: number
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          investment_id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id?: string
          payment_reference?: string | null
          rate?: number
          status?: Database["public"]["Enums"]["commission_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: true
            referencedRelation: "investments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          investor_id: string
          metadata: Json | null
          scheduled_for: string | null
          sent_at: string | null
          sent_by: string | null
          status: string | null
          subject: string | null
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          investor_id: string
          metadata?: Json | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string | null
          subject?: string | null
          type: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          investor_id?: string
          metadata?: Json | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          contract_url: string | null
          created_at: string | null
          documents: Json | null
          id: string
          investment_type: string | null
          investor_id: string
          notes: string | null
          paid_at: string | null
          partner_id: string | null
          payment_proof_url: string | null
          status: Database["public"]["Enums"]["investment_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          contract_url?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          investment_type?: string | null
          investor_id: string
          notes?: string | null
          paid_at?: string | null
          partner_id?: string | null
          payment_proof_url?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          contract_url?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          investment_type?: string | null
          investor_id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id?: string | null
          payment_proof_url?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      investors: {
        Row: {
          address: Json | null
          birth_date: string | null
          cpf: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          income_range: string | null
          investment_experience: string | null
          last_contact_date: string | null
          lead_source: Database["public"]["Enums"]["lead_source"] | null
          notes: string | null
          partner_id: string | null
          phone: string | null
          profession: string | null
          profile_id: string | null
          status: Database["public"]["Enums"]["investor_status"] | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          birth_date?: string | null
          cpf?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          income_range?: string | null
          investment_experience?: string | null
          last_contact_date?: string | null
          lead_source?: Database["public"]["Enums"]["lead_source"] | null
          notes?: string | null
          partner_id?: string | null
          phone?: string | null
          profession?: string | null
          profile_id?: string | null
          status?: Database["public"]["Enums"]["investor_status"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          birth_date?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          income_range?: string | null
          investment_experience?: string | null
          last_contact_date?: string | null
          lead_source?: Database["public"]["Enums"]["lead_source"] | null
          notes?: string | null
          partner_id?: string | null
          phone?: string | null
          profession?: string | null
          profile_id?: string | null
          status?: Database["public"]["Enums"]["investor_status"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investors_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_links: {
        Row: {
          clicks: number | null
          code: string
          conversions: number | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          name: string | null
          partner_id: string
          updated_at: string | null
          url: string
        }
        Insert: {
          clicks?: number | null
          code: string
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          partner_id: string
          updated_at?: string | null
          url: string
        }
        Update: {
          clicks?: number | null
          code?: string
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          partner_id?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_links_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: Json | null
          approved_at: string | null
          approved_by: string | null
          bank_details: Json | null
          business_name: string | null
          cnpj: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          profile_id: string
          specialty: string | null
          status: Database["public"]["Enums"]["partner_status"] | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          bank_details?: Json | null
          business_name?: string | null
          cnpj?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          profile_id: string
          specialty?: string | null
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          bank_details?: Json | null
          business_name?: string | null
          cnpj?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          profile_id?: string
          specialty?: string | null
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      commission_status: "pending" | "calculated" | "paid" | "cancelled"
      investment_status:
        | "pending"
        | "analysis"
        | "approved"
        | "rejected"
        | "paid"
      investor_status:
        | "lead"
        | "contacted"
        | "proposal_sent"
        | "negotiation"
        | "analysis"
        | "invested"
        | "lost"
      lead_source:
        | "website"
        | "partner"
        | "referral"
        | "social_media"
        | "direct"
      partner_status: "pending" | "active" | "inactive" | "blocked"
      user_role: "admin" | "partner" | "investor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

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
} as const
