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
      blog_posts: {
        Row: {
          author: string
          content_en: string
          content_fr: string
          cover_image: string | null
          created_at: string
          excerpt_en: string
          excerpt_fr: string
          id: string
          published: boolean
          published_at: string | null
          reading_time: number
          seo_description_en: string | null
          seo_description_fr: string | null
          seo_title_en: string | null
          seo_title_fr: string | null
          slug: string
          tags: string[]
          title_en: string
          title_fr: string
          updated_at: string
        }
        Insert: {
          author?: string
          content_en?: string
          content_fr?: string
          cover_image?: string | null
          created_at?: string
          excerpt_en?: string
          excerpt_fr?: string
          id?: string
          published?: boolean
          published_at?: string | null
          reading_time?: number
          seo_description_en?: string | null
          seo_description_fr?: string | null
          seo_title_en?: string | null
          seo_title_fr?: string | null
          slug: string
          tags?: string[]
          title_en: string
          title_fr: string
          updated_at?: string
        }
        Update: {
          author?: string
          content_en?: string
          content_fr?: string
          cover_image?: string | null
          created_at?: string
          excerpt_en?: string
          excerpt_fr?: string
          id?: string
          published?: boolean
          published_at?: string | null
          reading_time?: number
          seo_description_en?: string | null
          seo_description_fr?: string | null
          seo_title_en?: string | null
          seo_title_fr?: string | null
          slug?: string
          tags?: string[]
          title_en?: string
          title_fr?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description_en: string
          description_fr: string
          featured: boolean
          id: string
          image: string
          link: string | null
          published: boolean
          slug: string
          sort_order: number
          subtitle_en: string
          subtitle_fr: string
          tags: string[]
          title_en: string
          title_fr: string
          updated_at: string
          workflow_file: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description_en?: string
          description_fr?: string
          featured?: boolean
          id?: string
          image?: string
          link?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          subtitle_en?: string
          subtitle_fr?: string
          tags?: string[]
          title_en: string
          title_fr: string
          updated_at?: string
          workflow_file?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description_en?: string
          description_fr?: string
          featured?: boolean
          id?: string
          image?: string
          link?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          subtitle_en?: string
          subtitle_fr?: string
          tags?: string[]
          title_en?: string
          title_fr?: string
          updated_at?: string
          workflow_file?: string | null
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
