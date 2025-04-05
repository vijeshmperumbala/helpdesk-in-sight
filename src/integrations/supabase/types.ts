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
      chat_support_configs: {
        Row: {
          agent_display_name: string
          created_at: string | null
          id: string
          offline_message: string
          operating_hours_enabled: boolean
          operating_hours_end_time: string
          operating_hours_start_time: string
          primary_color: string
          settings_id: string | null
          updated_at: string | null
          welcome_message: string
          widget_position: string
          widget_title: string
        }
        Insert: {
          agent_display_name?: string
          created_at?: string | null
          id?: string
          offline_message?: string
          operating_hours_enabled?: boolean
          operating_hours_end_time?: string
          operating_hours_start_time?: string
          primary_color?: string
          settings_id?: string | null
          updated_at?: string | null
          welcome_message?: string
          widget_position?: string
          widget_title?: string
        }
        Update: {
          agent_display_name?: string
          created_at?: string | null
          id?: string
          offline_message?: string
          operating_hours_enabled?: boolean
          operating_hours_end_time?: string
          operating_hours_start_time?: string
          primary_color?: string
          settings_id?: string | null
          updated_at?: string | null
          welcome_message?: string
          widget_position?: string
          widget_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_support_configs_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      email_support_configs: {
        Row: {
          auto_responder_enabled: boolean
          auto_responder_message: string
          created_at: string | null
          email_signature: string
          id: string
          incoming_email_address: string
          outgoing_email_address: string
          settings_id: string | null
          updated_at: string | null
        }
        Insert: {
          auto_responder_enabled?: boolean
          auto_responder_message?: string
          created_at?: string | null
          email_signature?: string
          id?: string
          incoming_email_address?: string
          outgoing_email_address?: string
          settings_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_responder_enabled?: boolean
          auto_responder_message?: string
          created_at?: string | null
          email_signature?: string
          id?: string
          incoming_email_address?: string
          outgoing_email_address?: string
          settings_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_support_configs_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_support_configs: {
        Row: {
          api_key: string
          call_routing_enabled: boolean
          call_routing_options: string[]
          call_routing_welcome_message: string
          created_at: string | null
          id: string
          operating_hours_enabled: boolean
          operating_hours_end_time: string
          operating_hours_start_time: string
          operating_hours_timezone: string
          phone_number: string
          phone_system: string
          record_calls: boolean
          settings_id: string | null
          updated_at: string | null
          voicemail_enabled: boolean
          voicemail_greeting: string
        }
        Insert: {
          api_key?: string
          call_routing_enabled?: boolean
          call_routing_options?: string[]
          call_routing_welcome_message?: string
          created_at?: string | null
          id?: string
          operating_hours_enabled?: boolean
          operating_hours_end_time?: string
          operating_hours_start_time?: string
          operating_hours_timezone?: string
          phone_number?: string
          phone_system?: string
          record_calls?: boolean
          settings_id?: string | null
          updated_at?: string | null
          voicemail_enabled?: boolean
          voicemail_greeting?: string
        }
        Update: {
          api_key?: string
          call_routing_enabled?: boolean
          call_routing_options?: string[]
          call_routing_welcome_message?: string
          created_at?: string | null
          id?: string
          operating_hours_enabled?: boolean
          operating_hours_end_time?: string
          operating_hours_start_time?: string
          operating_hours_timezone?: string
          phone_number?: string
          phone_system?: string
          record_calls?: boolean
          settings_id?: string | null
          updated_at?: string | null
          voicemail_enabled?: boolean
          voicemail_greeting?: string
        }
        Relationships: [
          {
            foreignKeyName: "phone_support_configs_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media_configs: {
        Row: {
          convert_private_messages: boolean
          convert_public_mentions: boolean
          created_at: string | null
          facebook_api_key: string
          facebook_auto_create: boolean
          facebook_enabled: boolean
          facebook_username: string
          id: string
          instagram_api_key: string
          instagram_auto_create: boolean
          instagram_enabled: boolean
          instagram_username: string
          response_template: string
          settings_id: string | null
          twitter_api_key: string
          twitter_auto_create: boolean
          twitter_enabled: boolean
          twitter_username: string
          updated_at: string | null
        }
        Insert: {
          convert_private_messages?: boolean
          convert_public_mentions?: boolean
          created_at?: string | null
          facebook_api_key?: string
          facebook_auto_create?: boolean
          facebook_enabled?: boolean
          facebook_username?: string
          id?: string
          instagram_api_key?: string
          instagram_auto_create?: boolean
          instagram_enabled?: boolean
          instagram_username?: string
          response_template?: string
          settings_id?: string | null
          twitter_api_key?: string
          twitter_auto_create?: boolean
          twitter_enabled?: boolean
          twitter_username?: string
          updated_at?: string | null
        }
        Update: {
          convert_private_messages?: boolean
          convert_public_mentions?: boolean
          created_at?: string | null
          facebook_api_key?: string
          facebook_auto_create?: boolean
          facebook_enabled?: boolean
          facebook_username?: string
          id?: string
          instagram_api_key?: string
          instagram_auto_create?: boolean
          instagram_enabled?: boolean
          instagram_username?: string
          response_template?: string
          settings_id?: string | null
          twitter_api_key?: string
          twitter_auto_create?: boolean
          twitter_enabled?: boolean
          twitter_username?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_media_configs_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          auto_assignment: boolean
          chat_support: boolean
          created_at: string | null
          crm_integration: boolean
          default_priority: string
          email_client_integration: boolean
          email_notifications: boolean
          email_support: boolean
          force_password_change: boolean
          id: string
          phone_support: boolean
          project_management_integration: boolean
          site_name: string
          social_media_support: boolean
          two_factor_auth: boolean
          updated_at: string | null
        }
        Insert: {
          auto_assignment?: boolean
          chat_support?: boolean
          created_at?: string | null
          crm_integration?: boolean
          default_priority?: string
          email_client_integration?: boolean
          email_notifications?: boolean
          email_support?: boolean
          force_password_change?: boolean
          id?: string
          phone_support?: boolean
          project_management_integration?: boolean
          site_name?: string
          social_media_support?: boolean
          two_factor_auth?: boolean
          updated_at?: string | null
        }
        Update: {
          auto_assignment?: boolean
          chat_support?: boolean
          created_at?: string | null
          crm_integration?: boolean
          default_priority?: string
          email_client_integration?: boolean
          email_notifications?: boolean
          email_support?: boolean
          force_password_change?: boolean
          id?: string
          phone_support?: boolean
          project_management_integration?: boolean
          site_name?: string
          social_media_support?: boolean
          two_factor_auth?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
