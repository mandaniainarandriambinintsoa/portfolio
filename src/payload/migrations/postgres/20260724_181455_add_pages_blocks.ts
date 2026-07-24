import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.execute(sql`
   CREATE TYPE "payload"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_published_locale" AS ENUM('fr', 'en');
  CREATE TABLE "payload"."pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_command_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_collaboration_guides" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_visitor_tracking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_home_c_t_a_final" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."pages_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_command_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_collaboration_guides" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_visitor_tracking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_home_c_t_a_final" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"admin_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_published" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_pages_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "pages_id" uuid;
  ALTER TABLE "payload"."pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_client_logos" ADD CONSTRAINT "pages_blocks_home_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_command_center" ADD CONSTRAINT "pages_blocks_home_command_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_services" ADD CONSTRAINT "pages_blocks_home_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_process" ADD CONSTRAINT "pages_blocks_home_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_approach" ADD CONSTRAINT "pages_blocks_home_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_testimonials" ADD CONSTRAINT "pages_blocks_home_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_stats" ADD CONSTRAINT "pages_blocks_home_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_collaboration_guides" ADD CONSTRAINT "pages_blocks_home_collaboration_guides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_pricing" ADD CONSTRAINT "pages_blocks_home_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_tech_stack" ADD CONSTRAINT "pages_blocks_home_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_projects" ADD CONSTRAINT "pages_blocks_home_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_visitor_tracking" ADD CONSTRAINT "pages_blocks_home_visitor_tracking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_f_a_q" ADD CONSTRAINT "pages_blocks_home_f_a_q_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_home_c_t_a_final" ADD CONSTRAINT "pages_blocks_home_c_t_a_final_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_client_logos" ADD CONSTRAINT "_pages_v_blocks_home_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_command_center" ADD CONSTRAINT "_pages_v_blocks_home_command_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_services" ADD CONSTRAINT "_pages_v_blocks_home_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_process" ADD CONSTRAINT "_pages_v_blocks_home_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_approach" ADD CONSTRAINT "_pages_v_blocks_home_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_testimonials" ADD CONSTRAINT "_pages_v_blocks_home_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_stats" ADD CONSTRAINT "_pages_v_blocks_home_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_collaboration_guides" ADD CONSTRAINT "_pages_v_blocks_home_collaboration_guides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_pricing" ADD CONSTRAINT "_pages_v_blocks_home_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_tech_stack" ADD CONSTRAINT "_pages_v_blocks_home_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_projects" ADD CONSTRAINT "_pages_v_blocks_home_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_visitor_tracking" ADD CONSTRAINT "_pages_v_blocks_home_visitor_tracking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_f_a_q" ADD CONSTRAINT "_pages_v_blocks_home_f_a_q_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_home_c_t_a_final" ADD CONSTRAINT "_pages_v_blocks_home_c_t_a_final_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "payload"."pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "payload"."pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "payload"."pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_locale_idx" ON "payload"."pages_blocks_home_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_client_logos_order_idx" ON "payload"."pages_blocks_home_client_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_client_logos_parent_id_idx" ON "payload"."pages_blocks_home_client_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_client_logos_path_idx" ON "payload"."pages_blocks_home_client_logos" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_client_logos_locale_idx" ON "payload"."pages_blocks_home_client_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_command_center_order_idx" ON "payload"."pages_blocks_home_command_center" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_command_center_parent_id_idx" ON "payload"."pages_blocks_home_command_center" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_command_center_path_idx" ON "payload"."pages_blocks_home_command_center" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_command_center_locale_idx" ON "payload"."pages_blocks_home_command_center" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_services_order_idx" ON "payload"."pages_blocks_home_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_services_parent_id_idx" ON "payload"."pages_blocks_home_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_services_path_idx" ON "payload"."pages_blocks_home_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_services_locale_idx" ON "payload"."pages_blocks_home_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_process_order_idx" ON "payload"."pages_blocks_home_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_process_parent_id_idx" ON "payload"."pages_blocks_home_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_process_path_idx" ON "payload"."pages_blocks_home_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_process_locale_idx" ON "payload"."pages_blocks_home_process" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_approach_order_idx" ON "payload"."pages_blocks_home_approach" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_approach_parent_id_idx" ON "payload"."pages_blocks_home_approach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_approach_path_idx" ON "payload"."pages_blocks_home_approach" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_approach_locale_idx" ON "payload"."pages_blocks_home_approach" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_testimonials_order_idx" ON "payload"."pages_blocks_home_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_testimonials_parent_id_idx" ON "payload"."pages_blocks_home_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_testimonials_path_idx" ON "payload"."pages_blocks_home_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_testimonials_locale_idx" ON "payload"."pages_blocks_home_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_stats_order_idx" ON "payload"."pages_blocks_home_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_stats_parent_id_idx" ON "payload"."pages_blocks_home_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_stats_path_idx" ON "payload"."pages_blocks_home_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_stats_locale_idx" ON "payload"."pages_blocks_home_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_collaboration_guides_order_idx" ON "payload"."pages_blocks_home_collaboration_guides" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_collaboration_guides_parent_id_idx" ON "payload"."pages_blocks_home_collaboration_guides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_collaboration_guides_path_idx" ON "payload"."pages_blocks_home_collaboration_guides" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_collaboration_guides_locale_idx" ON "payload"."pages_blocks_home_collaboration_guides" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_pricing_order_idx" ON "payload"."pages_blocks_home_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_pricing_parent_id_idx" ON "payload"."pages_blocks_home_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_pricing_path_idx" ON "payload"."pages_blocks_home_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_pricing_locale_idx" ON "payload"."pages_blocks_home_pricing" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_tech_stack_order_idx" ON "payload"."pages_blocks_home_tech_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_tech_stack_parent_id_idx" ON "payload"."pages_blocks_home_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_tech_stack_path_idx" ON "payload"."pages_blocks_home_tech_stack" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_tech_stack_locale_idx" ON "payload"."pages_blocks_home_tech_stack" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_projects_order_idx" ON "payload"."pages_blocks_home_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_projects_parent_id_idx" ON "payload"."pages_blocks_home_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_projects_path_idx" ON "payload"."pages_blocks_home_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_projects_locale_idx" ON "payload"."pages_blocks_home_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_visitor_tracking_order_idx" ON "payload"."pages_blocks_home_visitor_tracking" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_visitor_tracking_parent_id_idx" ON "payload"."pages_blocks_home_visitor_tracking" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_visitor_tracking_path_idx" ON "payload"."pages_blocks_home_visitor_tracking" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_visitor_tracking_locale_idx" ON "payload"."pages_blocks_home_visitor_tracking" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_f_a_q_order_idx" ON "payload"."pages_blocks_home_f_a_q" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_f_a_q_parent_id_idx" ON "payload"."pages_blocks_home_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_f_a_q_path_idx" ON "payload"."pages_blocks_home_f_a_q" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_f_a_q_locale_idx" ON "payload"."pages_blocks_home_f_a_q" USING btree ("_locale");
  CREATE INDEX "pages_blocks_home_c_t_a_final_order_idx" ON "payload"."pages_blocks_home_c_t_a_final" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_c_t_a_final_parent_id_idx" ON "payload"."pages_blocks_home_c_t_a_final" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_c_t_a_final_path_idx" ON "payload"."pages_blocks_home_c_t_a_final" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_c_t_a_final_locale_idx" ON "payload"."pages_blocks_home_c_t_a_final" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "payload"."pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "payload"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "payload"."pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "payload"."pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "payload"."_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "payload"."_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "payload"."_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_locale_idx" ON "payload"."_pages_v_blocks_home_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_client_logos_order_idx" ON "payload"."_pages_v_blocks_home_client_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_client_logos_parent_id_idx" ON "payload"."_pages_v_blocks_home_client_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_client_logos_path_idx" ON "payload"."_pages_v_blocks_home_client_logos" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_client_logos_locale_idx" ON "payload"."_pages_v_blocks_home_client_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_command_center_order_idx" ON "payload"."_pages_v_blocks_home_command_center" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_command_center_parent_id_idx" ON "payload"."_pages_v_blocks_home_command_center" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_command_center_path_idx" ON "payload"."_pages_v_blocks_home_command_center" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_command_center_locale_idx" ON "payload"."_pages_v_blocks_home_command_center" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_services_order_idx" ON "payload"."_pages_v_blocks_home_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_services_parent_id_idx" ON "payload"."_pages_v_blocks_home_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_services_path_idx" ON "payload"."_pages_v_blocks_home_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_services_locale_idx" ON "payload"."_pages_v_blocks_home_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_process_order_idx" ON "payload"."_pages_v_blocks_home_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_process_parent_id_idx" ON "payload"."_pages_v_blocks_home_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_process_path_idx" ON "payload"."_pages_v_blocks_home_process" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_process_locale_idx" ON "payload"."_pages_v_blocks_home_process" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_approach_order_idx" ON "payload"."_pages_v_blocks_home_approach" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_approach_parent_id_idx" ON "payload"."_pages_v_blocks_home_approach" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_approach_path_idx" ON "payload"."_pages_v_blocks_home_approach" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_approach_locale_idx" ON "payload"."_pages_v_blocks_home_approach" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_testimonials_order_idx" ON "payload"."_pages_v_blocks_home_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_testimonials_parent_id_idx" ON "payload"."_pages_v_blocks_home_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_testimonials_path_idx" ON "payload"."_pages_v_blocks_home_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_testimonials_locale_idx" ON "payload"."_pages_v_blocks_home_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_stats_order_idx" ON "payload"."_pages_v_blocks_home_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_stats_parent_id_idx" ON "payload"."_pages_v_blocks_home_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_stats_path_idx" ON "payload"."_pages_v_blocks_home_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_stats_locale_idx" ON "payload"."_pages_v_blocks_home_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_collaboration_guides_order_idx" ON "payload"."_pages_v_blocks_home_collaboration_guides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_collaboration_guides_parent_id_idx" ON "payload"."_pages_v_blocks_home_collaboration_guides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_collaboration_guides_path_idx" ON "payload"."_pages_v_blocks_home_collaboration_guides" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_collaboration_guides_locale_idx" ON "payload"."_pages_v_blocks_home_collaboration_guides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_pricing_order_idx" ON "payload"."_pages_v_blocks_home_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_pricing_parent_id_idx" ON "payload"."_pages_v_blocks_home_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_pricing_path_idx" ON "payload"."_pages_v_blocks_home_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_pricing_locale_idx" ON "payload"."_pages_v_blocks_home_pricing" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_tech_stack_order_idx" ON "payload"."_pages_v_blocks_home_tech_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_tech_stack_parent_id_idx" ON "payload"."_pages_v_blocks_home_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_tech_stack_path_idx" ON "payload"."_pages_v_blocks_home_tech_stack" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_tech_stack_locale_idx" ON "payload"."_pages_v_blocks_home_tech_stack" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_projects_order_idx" ON "payload"."_pages_v_blocks_home_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_projects_parent_id_idx" ON "payload"."_pages_v_blocks_home_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_projects_path_idx" ON "payload"."_pages_v_blocks_home_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_projects_locale_idx" ON "payload"."_pages_v_blocks_home_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_visitor_tracking_order_idx" ON "payload"."_pages_v_blocks_home_visitor_tracking" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_visitor_tracking_parent_id_idx" ON "payload"."_pages_v_blocks_home_visitor_tracking" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_visitor_tracking_path_idx" ON "payload"."_pages_v_blocks_home_visitor_tracking" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_visitor_tracking_locale_idx" ON "payload"."_pages_v_blocks_home_visitor_tracking" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_f_a_q_order_idx" ON "payload"."_pages_v_blocks_home_f_a_q" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_f_a_q_parent_id_idx" ON "payload"."_pages_v_blocks_home_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_f_a_q_path_idx" ON "payload"."_pages_v_blocks_home_f_a_q" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_f_a_q_locale_idx" ON "payload"."_pages_v_blocks_home_f_a_q" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_home_c_t_a_final_order_idx" ON "payload"."_pages_v_blocks_home_c_t_a_final" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_c_t_a_final_parent_id_idx" ON "payload"."_pages_v_blocks_home_c_t_a_final" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_c_t_a_final_path_idx" ON "payload"."_pages_v_blocks_home_c_t_a_final" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_c_t_a_final_locale_idx" ON "payload"."_pages_v_blocks_home_c_t_a_final" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "payload"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "payload"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "payload"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "payload"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "payload"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "payload"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "payload"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "payload"."_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "payload"."_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "payload"."_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "payload"."_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "payload"."_pages_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("pages_id");`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.includes('already exists')) {
      throw error
    }
  }

  await db.execute(sql`
    WITH home_page AS (
      INSERT INTO "payload"."pages" ("slug", "published", "_status")
      VALUES ('home', true, 'published')
      ON CONFLICT ("slug") DO UPDATE SET "published" = EXCLUDED."published", "_status" = EXCLUDED."_status"
      RETURNING "id"
    )
    INSERT INTO "payload"."pages_locales" ("title", "_locale", "_parent_id")
    SELECT 'Accueil', 'fr'::"payload"."_locales", "id" FROM home_page
    UNION ALL
    SELECT 'Home', 'en'::"payload"."_locales", "id" FROM home_page
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title";

    INSERT INTO "payload"."pages_blocks_home_hero" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 0, "id", 'layout', 'fr'::"payload"."_locales", 'home-hero-fr', 'Hero' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 0, "id", 'layout', 'en'::"payload"."_locales", 'home-hero-en', 'Hero' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_client_logos" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 1, "id", 'layout', 'fr'::"payload"."_locales", 'home-client-logos-fr', 'Client logos' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 1, "id", 'layout', 'en'::"payload"."_locales", 'home-client-logos-en', 'Client logos' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_command_center" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 2, "id", 'layout', 'fr'::"payload"."_locales", 'home-command-center-fr', 'Command center' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 2, "id", 'layout', 'en'::"payload"."_locales", 'home-command-center-en', 'Command center' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_services" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 3, "id", 'layout', 'fr'::"payload"."_locales", 'home-services-fr', 'Services' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 3, "id", 'layout', 'en'::"payload"."_locales", 'home-services-en', 'Services' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_process" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 4, "id", 'layout', 'fr'::"payload"."_locales", 'home-process-fr', 'Process' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 4, "id", 'layout', 'en'::"payload"."_locales", 'home-process-en', 'Process' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_approach" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 5, "id", 'layout', 'fr'::"payload"."_locales", 'home-approach-fr', 'Approach' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 5, "id", 'layout', 'en'::"payload"."_locales", 'home-approach-en', 'Approach' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_testimonials" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 6, "id", 'layout', 'fr'::"payload"."_locales", 'home-testimonials-fr', 'Testimonials' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 6, "id", 'layout', 'en'::"payload"."_locales", 'home-testimonials-en', 'Testimonials' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_stats" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 7, "id", 'layout', 'fr'::"payload"."_locales", 'home-stats-fr', 'Stats' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 7, "id", 'layout', 'en'::"payload"."_locales", 'home-stats-en', 'Stats' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_collaboration_guides" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 8, "id", 'layout', 'fr'::"payload"."_locales", 'home-collaboration-guides-fr', 'Collaboration guides' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 8, "id", 'layout', 'en'::"payload"."_locales", 'home-collaboration-guides-en', 'Collaboration guides' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_pricing" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 9, "id", 'layout', 'fr'::"payload"."_locales", 'home-pricing-fr', 'Pricing' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 9, "id", 'layout', 'en'::"payload"."_locales", 'home-pricing-en', 'Pricing' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_tech_stack" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 10, "id", 'layout', 'fr'::"payload"."_locales", 'home-tech-stack-fr', 'Tech stack' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 10, "id", 'layout', 'en'::"payload"."_locales", 'home-tech-stack-en', 'Tech stack' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_projects" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 11, "id", 'layout', 'fr'::"payload"."_locales", 'home-projects-fr', 'Projects' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 11, "id", 'layout', 'en'::"payload"."_locales", 'home-projects-en', 'Projects' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_visitor_tracking" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 12, "id", 'layout', 'fr'::"payload"."_locales", 'home-visitor-tracking-fr', 'Visitor tracking' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 12, "id", 'layout', 'en'::"payload"."_locales", 'home-visitor-tracking-en', 'Visitor tracking' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_f_a_q" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 13, "id", 'layout', 'fr'::"payload"."_locales", 'home-faq-fr', 'FAQ' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 13, "id", 'layout', 'en'::"payload"."_locales", 'home-faq-en', 'FAQ' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";

    INSERT INTO "payload"."pages_blocks_home_c_t_a_final" ("_order", "_parent_id", "_path", "_locale", "id", "admin_label")
    SELECT 14, "id", 'layout', 'fr'::"payload"."_locales", 'home-cta-final-fr', 'Final CTA' FROM "payload"."pages" WHERE "slug" = 'home'
    UNION ALL SELECT 14, "id", 'layout', 'en'::"payload"."_locales", 'home-cta-final-en', 'Final CTA' FROM "payload"."pages" WHERE "slug" = 'home'
    ON CONFLICT ("id") DO UPDATE SET "_order" = EXCLUDED."_order", "_parent_id" = EXCLUDED."_parent_id", "_path" = EXCLUDED."_path", "_locale" = EXCLUDED."_locale", "admin_label" = EXCLUDED."admin_label";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."pages_blocks_home_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_client_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_command_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_approach" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_collaboration_guides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_visitor_tracking" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_f_a_q" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_blocks_home_c_t_a_final" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_client_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_command_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_approach" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_collaboration_guides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_visitor_tracking" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_f_a_q" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_blocks_home_c_t_a_final" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."pages_blocks_home_hero" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_client_logos" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_command_center" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_services" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_process" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_approach" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_testimonials" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_stats" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_collaboration_guides" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_pricing" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_tech_stack" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_projects" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_visitor_tracking" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_f_a_q" CASCADE;
  DROP TABLE "payload"."pages_blocks_home_c_t_a_final" CASCADE;
  DROP TABLE "payload"."pages" CASCADE;
  DROP TABLE "payload"."pages_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_client_logos" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_command_center" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_services" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_process" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_approach" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_testimonials" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_stats" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_collaboration_guides" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_pricing" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_tech_stack" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_projects" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_visitor_tracking" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_f_a_q" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_home_c_t_a_final" CASCADE;
  DROP TABLE "payload"."_pages_v" CASCADE;
  DROP TABLE "payload"."_pages_v_locales" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "payload"."enum_pages_status";
  DROP TYPE "payload"."enum__pages_v_version_status";
  DROP TYPE "payload"."enum__pages_v_published_locale";`)
}
