export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      properties: {
        Row: {
          agent_avatar_url: string | null
          agent_email: string | null
          agent_name: string | null
          agent_phone: string | null
          agent_title: string | null
          amenities: string[] | null
          area_m2: number
          baths: number
          beds: number
          created_at: string
          description: string | null
          garage: number | null
          id: string
          image_alt: string
          image_url: string
          is_featured: boolean
          latitude: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          location: string
          longitude: number | null
          price: number
          price_period: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          slug: string | null
          tag: string | null
          title: string
        }
        Insert: {
          agent_avatar_url?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          agent_title?: string | null
          amenities?: string[] | null
          area_m2: number
          baths: number
          beds: number
          created_at?: string
          description?: string | null
          garage?: number | null
          id?: string
          image_alt: string
          image_url: string
          is_featured?: boolean
          latitude?: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          location: string
          longitude?: number | null
          price: number
          price_period?: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          slug?: string | null
          tag?: string | null
          title: string
        }
        Update: {
          agent_avatar_url?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          agent_title?: string | null
          amenities?: string[] | null
          area_m2: number
          baths: number
          beds: number
          created_at?: string
          description?: string | null
          garage?: number | null
          id?: string
          image_alt?: string
          image_url?: string
          is_featured?: boolean
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"]
          location?: string
          longitude?: number | null
          price?: number
          price_period?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          slug?: string | null
          tag?: string | null
          title?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          alt_text: string
          caption: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          property_id: string
        }
        Insert: {
          alt_text?: string
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          property_id: string
        }
        Update: {
          alt_text?: string
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      listing_type: "sale" | "rent"
      property_type: "House" | "Apartment" | "Villa" | "Penthouse"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
