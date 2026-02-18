"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidateContent } from "./revalidate";
import type { Database } from "@/lib/supabase/types";

type BlogInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

// ---------- Blog ----------

export async function createBlogPost(data: BlogInsert) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("blog_posts").insert(data);
  if (error) throw new Error(error.message);
  revalidateContent("blog", data.slug);
}

export async function updateBlogPost(id: string, data: BlogUpdate) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateContent("blog", data.slug);
}

export async function deleteBlogPost(id: string, slug: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateContent("blog", slug);
}

// ---------- Projects ----------

export async function createProject(data: ProjectInsert) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("projects").insert(data);
  if (error) throw new Error(error.message);
  revalidateContent("project", data.slug);
}

export async function updateProject(id: string, data: ProjectUpdate) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("projects").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateContent("project", data.slug);
}

export async function deleteProject(id: string, slug: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateContent("project", slug);
}
