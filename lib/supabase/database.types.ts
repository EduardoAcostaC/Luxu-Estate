// Generated with the Supabase MCP (generate_typescript_types), trimmed to the Database type.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.18';
  };
  public: {
    Tables: {
      properties: {
        Row: {
          area_m2: number;
          baths: number;
          beds: number;
          created_at: string;
          id: string;
          image_alt: string;
          image_url: string;
          is_featured: boolean;
          listing_type: Database['public']['Enums']['listing_type'];
          location: string;
          price: number;
          price_period: string | null;
          property_type: Database['public']['Enums']['property_type'];
          tag: string | null;
          title: string;
        };
        Insert: {
          area_m2: number;
          baths: number;
          beds: number;
          created_at?: string;
          id?: string;
          image_alt: string;
          image_url: string;
          is_featured?: boolean;
          listing_type: Database['public']['Enums']['listing_type'];
          location: string;
          price: number;
          price_period?: string | null;
          property_type: Database['public']['Enums']['property_type'];
          tag?: string | null;
          title: string;
        };
        Update: {
          area_m2?: number;
          baths?: number;
          beds?: number;
          created_at?: string;
          id?: string;
          image_alt?: string;
          image_url?: string;
          is_featured?: boolean;
          listing_type?: Database['public']['Enums']['listing_type'];
          location?: string;
          price?: number;
          price_period?: string | null;
          property_type?: Database['public']['Enums']['property_type'];
          tag?: string | null;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      listing_type: 'sale' | 'rent';
      property_type: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
