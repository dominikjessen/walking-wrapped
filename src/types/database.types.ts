////////////
// Custom //
////////////

export type StepsRow = Database['public']['Tables']['steps']['Row'];
export type ProfilesRow = Database['public']['Tables']['profiles']['Row'];
export type WalkingBuddyRow = Database['public']['Tables']['walking_buddies']['Row'];

///////////////
// Generated //
///////////////

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      closest_steps: {
        Row: {
          closest_partner_id: string;
          id: number;
          match_date: string;
          partner_steps: number;
          step_difference: number;
          user_id: string;
          user_steps: number;
        };
        Insert: {
          closest_partner_id: string;
          id?: number;
          match_date: string;
          partner_steps: number;
          step_difference: number;
          user_id: string;
          user_steps: number;
        };
        Update: {
          closest_partner_id?: string;
          id?: number;
          match_date?: string;
          partner_steps?: number;
          step_difference?: number;
          user_id?: string;
          user_steps?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'closest_steps_closest_partner_id_fkey';
            columns: ['closest_partner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'closest_steps_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      leaderboards: {
        Row: {
          created_at: string;
          end_date: string | null;
          id: number;
          rank: number | null;
          start_date: string | null;
          total_steps: number | null;
          type: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id?: number;
          rank?: number | null;
          start_date?: string | null;
          total_steps?: number | null;
          type?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: number;
          rank?: number | null;
          start_date?: string | null;
          total_steps?: number | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'leaderboards_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'leaderboards_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      steps: {
        Row: {
          created_at: string;
          date: string;
          id: number;
          steps: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          date?: string;
          id?: number;
          steps?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: number;
          steps?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'steps_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'steps_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      walking_buddies: {
        Row: {
          id: number;
          number_of_buddy_days: number;
          partner_id: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          number_of_buddy_days: number;
          partner_id: string;
          user_id: string;
        };
        Update: {
          id?: number;
          number_of_buddy_days?: number;
          partner_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'closest_day_count_closest_partner_id_fkey';
            columns: ['partner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'closest_day_count_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
