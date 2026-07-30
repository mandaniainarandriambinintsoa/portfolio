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
      quiz_leads: {
        Row: {
          id: string
          email: string
          answers: Json
          result_type: string
          locale: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          answers?: Json
          result_type: string
          locale?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          answers?: Json
          result_type?: string
          locale?: string
          created_at?: string
        }
        Relationships: []
      }
      visitor_logs: {
        Row: {
          id: string
          city: string
          country: string
          country_code: string
          created_at: string
        }
        Insert: {
          id?: string
          city: string
          country: string
          country_code?: string
          created_at?: string
        }
        Update: {
          id?: string
          city?: string
          country?: string
          country_code?: string
          created_at?: string
        }
        Relationships: []
      }
      crm_leads: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          company: string
          website: string
          linkedin_url: string
          country: string
          source: string
          locale: string
          message: string
          segment: string
          status: string
          lead_score: number
          pain_detected: string
          offer_angle: string
          last_contacted_at: string | null
          next_followup_at: string | null
          reply_status: string
          utm_campaign: string
          do_not_contact: boolean
          notes: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string
          last_name?: string
          company?: string
          website?: string
          linkedin_url?: string
          country?: string
          source?: string
          locale?: string
          message?: string
          segment?: string
          status?: string
          lead_score?: number
          pain_detected?: string
          offer_angle?: string
          last_contacted_at?: string | null
          next_followup_at?: string | null
          reply_status?: string
          utm_campaign?: string
          do_not_contact?: boolean
          notes?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          company?: string
          website?: string
          linkedin_url?: string
          country?: string
          source?: string
          locale?: string
          message?: string
          segment?: string
          status?: string
          lead_score?: number
          pain_detected?: string
          offer_angle?: string
          last_contacted_at?: string | null
          next_followup_at?: string | null
          reply_status?: string
          utm_campaign?: string
          do_not_contact?: boolean
          notes?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          id: string
          lead_id: string
          email: string
          activity_type: string
          channel: string
          direction: string
          subject: string
          content: string
          metadata: Json
          occurred_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          email: string
          activity_type: string
          channel: string
          direction: string
          subject?: string
          content?: string
          metadata?: Json
          occurred_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          email?: string
          activity_type?: string
          channel?: string
          direction?: string
          subject?: string
          content?: string
          metadata?: Json
          occurred_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
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
