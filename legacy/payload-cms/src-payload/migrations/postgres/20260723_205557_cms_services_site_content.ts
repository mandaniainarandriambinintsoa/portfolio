import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "payload"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "payload"."enum_services_color" AS ENUM('indigo', 'emerald', 'blue', 'purple', 'sky', 'amber');
  CREATE TYPE "payload"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__services_v_version_color" AS ENUM('indigo', 'emerald', 'blue', 'purple', 'sky', 'amber');
  CREATE TYPE "payload"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__services_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "payload"."enum_projects_category" AS ENUM('webapp', 'workflow', 'site-metier');
  CREATE TYPE "payload"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__projects_v_version_category" AS ENUM('webapp', 'workflow', 'site-metier');
  CREATE TYPE "payload"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__projects_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "payload"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__posts_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "payload"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__site_settings_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "payload"."enum_site_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__site_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__site_content_v_published_locale" AS ENUM('fr', 'en');
  CREATE TABLE "payload"."users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "payload"."enum_users_roles",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload"."media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."services" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"is_landing" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 100,
  	"published" boolean DEFAULT true,
  	"icon" varchar,
  	"color" "payload"."enum_services_color" DEFAULT 'indigo',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."services_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"description" varchar,
  	"card_title" varchar,
  	"card_description" varchar,
  	"landing" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_services_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_key" varchar,
  	"version_is_landing" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 100,
  	"version_published" boolean DEFAULT true,
  	"version_icon" varchar,
  	"version_color" "payload"."enum__services_v_version_color" DEFAULT 'indigo',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__services_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_services_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_card_title" varchar,
  	"version_card_description" varchar,
  	"version_landing" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."projects_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."projects_results_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."projects" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"category" "payload"."enum_projects_category" DEFAULT 'webapp',
  	"media_id" uuid,
  	"image" varchar,
  	"link" varchar,
  	"workflow_file" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 100,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."projects_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_alt" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_projects_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_projects_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_projects_v_version_results_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_projects_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_category" "payload"."enum__projects_v_version_category" DEFAULT 'webapp',
  	"version_media_id" uuid,
  	"version_image" varchar,
  	"version_link" varchar,
  	"version_workflow_file" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 100,
  	"version_published" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_projects_v_locales" (
  	"version_title" varchar,
  	"version_subtitle" varchar,
  	"version_description" varchar,
  	"version_image_alt" varchar,
  	"version_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."posts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"cover_media_id" uuid,
  	"cover_image" varchar,
  	"author" varchar DEFAULT 'Mandaniaina Randriambinintsoa',
  	"reading_time" numeric DEFAULT 5,
  	"published_at" timestamp(3) with time zone,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_posts_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_cover_media_id" uuid,
  	"version_cover_image" varchar,
  	"version_author" varchar DEFAULT 'Mandaniaina Randriambinintsoa',
  	"version_reading_time" numeric DEFAULT 5,
  	"version_published_at" timestamp(3) with time zone,
  	"version_published" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"media_id" uuid,
  	"services_id" uuid,
  	"projects_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "payload"."site_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"seo_og_image_id" uuid,
  	"_status" "payload"."enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."site_settings_locales" (
  	"identity_name" varchar,
  	"identity_headline" varchar,
  	"identity_bio" varchar,
  	"contact_location" varchar,
  	"contact_availability" varchar,
  	"seo_default_title" varchar,
  	"seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_seo_og_image_id" uuid,
  	"version__status" "payload"."enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__site_settings_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_site_settings_v_locales" (
  	"version_identity_name" varchar,
  	"version_identity_headline" varchar,
  	"version_identity_bio" varchar,
  	"version_contact_location" varchar,
  	"version_contact_availability" varchar,
  	"version_seo_default_title" varchar,
  	"version_seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."site_content" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_status" "payload"."enum_site_content_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."site_content_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_site_content_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version__status" "payload"."enum__site_content_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__site_content_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_site_content_v_locales" (
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload"."users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."projects_tags" ADD CONSTRAINT "projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."projects_results" ADD CONSTRAINT "projects_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."projects_results_locales" ADD CONSTRAINT "projects_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."projects_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."projects" ADD CONSTRAINT "projects_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v_version_tags" ADD CONSTRAINT "_projects_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v_version_results" ADD CONSTRAINT "_projects_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v_version_results_locales" ADD CONSTRAINT "_projects_v_version_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_projects_v_version_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v" ADD CONSTRAINT "_projects_v_version_media_id_media_id_fk" FOREIGN KEY ("version_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_cover_media_id_media_id_fk" FOREIGN KEY ("version_cover_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "payload"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "payload"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_socials" ADD CONSTRAINT "_site_settings_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_content_locales" ADD CONSTRAINT "site_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_content_v_locales" ADD CONSTRAINT "_site_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_content_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "payload"."users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "payload"."users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "payload"."media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_key_idx" ON "payload"."services" USING btree ("key");
  CREATE INDEX "services_updated_at_idx" ON "payload"."services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "payload"."services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "payload"."services" USING btree ("_status");
  CREATE INDEX "services_slug_idx" ON "payload"."services_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "payload"."services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "payload"."_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_key_idx" ON "payload"."_services_v" USING btree ("version_key");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "payload"."_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "payload"."_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "payload"."_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "payload"."_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "payload"."_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "payload"."_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "payload"."_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "payload"."_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "payload"."_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "payload"."_services_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "payload"."_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_tags_order_idx" ON "payload"."projects_tags" USING btree ("_order");
  CREATE INDEX "projects_tags_parent_id_idx" ON "payload"."projects_tags" USING btree ("_parent_id");
  CREATE INDEX "projects_results_order_idx" ON "payload"."projects_results" USING btree ("_order");
  CREATE INDEX "projects_results_parent_id_idx" ON "payload"."projects_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_results_locales_locale_parent_id_unique" ON "payload"."projects_results_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "payload"."projects" USING btree ("slug");
  CREATE INDEX "projects_media_idx" ON "payload"."projects" USING btree ("media_id");
  CREATE INDEX "projects_updated_at_idx" ON "payload"."projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "payload"."projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "payload"."projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "payload"."projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_tags_order_idx" ON "payload"."_projects_v_version_tags" USING btree ("_order");
  CREATE INDEX "_projects_v_version_tags_parent_id_idx" ON "payload"."_projects_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_results_order_idx" ON "payload"."_projects_v_version_results" USING btree ("_order");
  CREATE INDEX "_projects_v_version_results_parent_id_idx" ON "payload"."_projects_v_version_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_results_locales_locale_parent_id_unique" ON "payload"."_projects_v_version_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "payload"."_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "payload"."_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_media_idx" ON "payload"."_projects_v" USING btree ("version_media_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "payload"."_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "payload"."_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "payload"."_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "payload"."_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "payload"."_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "payload"."_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "payload"."_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "payload"."_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "payload"."_projects_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "payload"."_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_tags_order_idx" ON "payload"."posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "payload"."posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "payload"."posts" USING btree ("slug");
  CREATE INDEX "posts_cover_media_idx" ON "payload"."posts" USING btree ("cover_media_id");
  CREATE INDEX "posts_updated_at_idx" ON "payload"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "payload"."posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "payload"."posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "payload"."posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "payload"."_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "payload"."_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "payload"."_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "payload"."_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_media_idx" ON "payload"."_posts_v" USING btree ("version_cover_media_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "payload"."_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "payload"."_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "payload"."_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "payload"."_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "payload"."_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "payload"."_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "payload"."_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "payload"."_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "payload"."_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "payload"."_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "payload"."site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "payload"."site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "payload"."site_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "site_settings__status_idx" ON "payload"."site_settings" USING btree ("_status");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "payload"."site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_socials_order_idx" ON "payload"."_site_settings_v_version_socials" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_socials_parent_id_idx" ON "payload"."_site_settings_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_seo_version_seo_og_image_idx" ON "payload"."_site_settings_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "payload"."_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "payload"."_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "payload"."_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "payload"."_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "payload"."_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "payload"."_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "payload"."_site_settings_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "payload"."_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_content__status_idx" ON "payload"."site_content" USING btree ("_status");
  CREATE UNIQUE INDEX "site_content_locales_locale_parent_id_unique" ON "payload"."site_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_content_v_version_version__status_idx" ON "payload"."_site_content_v" USING btree ("version__status");
  CREATE INDEX "_site_content_v_created_at_idx" ON "payload"."_site_content_v" USING btree ("created_at");
  CREATE INDEX "_site_content_v_updated_at_idx" ON "payload"."_site_content_v" USING btree ("updated_at");
  CREATE INDEX "_site_content_v_snapshot_idx" ON "payload"."_site_content_v" USING btree ("snapshot");
  CREATE INDEX "_site_content_v_published_locale_idx" ON "payload"."_site_content_v" USING btree ("published_locale");
  CREATE INDEX "_site_content_v_latest_idx" ON "payload"."_site_content_v" USING btree ("latest");
  CREATE INDEX "_site_content_v_autosave_idx" ON "payload"."_site_content_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_content_v_locales_locale_parent_id_unique" ON "payload"."_site_content_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."users_roles" CASCADE;
  DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."media_locales" CASCADE;
  DROP TABLE "payload"."services" CASCADE;
  DROP TABLE "payload"."services_locales" CASCADE;
  DROP TABLE "payload"."_services_v" CASCADE;
  DROP TABLE "payload"."_services_v_locales" CASCADE;
  DROP TABLE "payload"."projects_tags" CASCADE;
  DROP TABLE "payload"."projects_results" CASCADE;
  DROP TABLE "payload"."projects_results_locales" CASCADE;
  DROP TABLE "payload"."projects" CASCADE;
  DROP TABLE "payload"."projects_locales" CASCADE;
  DROP TABLE "payload"."_projects_v_version_tags" CASCADE;
  DROP TABLE "payload"."_projects_v_version_results" CASCADE;
  DROP TABLE "payload"."_projects_v_version_results_locales" CASCADE;
  DROP TABLE "payload"."_projects_v" CASCADE;
  DROP TABLE "payload"."_projects_v_locales" CASCADE;
  DROP TABLE "payload"."posts_tags" CASCADE;
  DROP TABLE "payload"."posts" CASCADE;
  DROP TABLE "payload"."posts_locales" CASCADE;
  DROP TABLE "payload"."_posts_v_version_tags" CASCADE;
  DROP TABLE "payload"."_posts_v" CASCADE;
  DROP TABLE "payload"."_posts_v_locales" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."site_settings_socials" CASCADE;
  DROP TABLE "payload"."site_settings" CASCADE;
  DROP TABLE "payload"."site_settings_locales" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_socials" CASCADE;
  DROP TABLE "payload"."_site_settings_v" CASCADE;
  DROP TABLE "payload"."_site_settings_v_locales" CASCADE;
  DROP TABLE "payload"."site_content" CASCADE;
  DROP TABLE "payload"."site_content_locales" CASCADE;
  DROP TABLE "payload"."_site_content_v" CASCADE;
  DROP TABLE "payload"."_site_content_v_locales" CASCADE;
  DROP TYPE "payload"."_locales";
  DROP TYPE "payload"."enum_users_roles";
  DROP TYPE "payload"."enum_services_color";
  DROP TYPE "payload"."enum_services_status";
  DROP TYPE "payload"."enum__services_v_version_color";
  DROP TYPE "payload"."enum__services_v_version_status";
  DROP TYPE "payload"."enum__services_v_published_locale";
  DROP TYPE "payload"."enum_projects_category";
  DROP TYPE "payload"."enum_projects_status";
  DROP TYPE "payload"."enum__projects_v_version_category";
  DROP TYPE "payload"."enum__projects_v_version_status";
  DROP TYPE "payload"."enum__projects_v_published_locale";
  DROP TYPE "payload"."enum_posts_status";
  DROP TYPE "payload"."enum__posts_v_version_status";
  DROP TYPE "payload"."enum__posts_v_published_locale";
  DROP TYPE "payload"."enum_site_settings_status";
  DROP TYPE "payload"."enum__site_settings_v_version_status";
  DROP TYPE "payload"."enum__site_settings_v_published_locale";
  DROP TYPE "payload"."enum_site_content_status";
  DROP TYPE "payload"."enum__site_content_v_version_status";
  DROP TYPE "payload"."enum__site_content_v_published_locale";`)
}
