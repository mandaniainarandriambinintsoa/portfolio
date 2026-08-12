import { config } from "dotenv";
import payloadConfig from "../../payload.config.ts";
import { createClient } from "@supabase/supabase-js";
import { getPayload } from "payload";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const payload = await getPayload({ config: payloadConfig });

function tagsToPayload(tags = []) {
  return tags.map((label) => ({ label }));
}

async function upsertProject(row) {
  const data = {
    slug: row.slug,
    title: { fr: row.title_fr, en: row.title_en },
    subtitle: { fr: row.subtitle_fr, en: row.subtitle_en },
    description: { fr: row.description_fr, en: row.description_en },
    category: row.category,
    tags: tagsToPayload(row.tags),
    image: row.image,
    link: row.link,
    workflowFile: row.workflow_file,
    featured: row.featured,
    sortOrder: row.sort_order,
    published: row.published,
    _status: row.published ? "published" : "draft",
  };

  const existing = await payload.find({
    collection: "projects",
    limit: 1,
    where: { slug: { equals: row.slug } },
  });

  if (existing.docs[0]) {
    await payload.update({ collection: "projects", id: existing.docs[0].id, data, locale: "all" });
  } else {
    await payload.create({ collection: "projects", data, locale: "all" });
  }
}

async function upsertPost(row) {
  const data = {
    slug: row.slug,
    title: { fr: row.title_fr, en: row.title_en },
    excerpt: { fr: row.excerpt_fr, en: row.excerpt_en },
    content: { fr: row.content_fr, en: row.content_en },
    seoTitle: { fr: row.seo_title_fr, en: row.seo_title_en },
    seoDescription: { fr: row.seo_description_fr, en: row.seo_description_en },
    coverImage: row.cover_image,
    tags: tagsToPayload(row.tags),
    author: row.author,
    readingTime: row.reading_time,
    publishedAt: row.published_at,
    published: row.published,
    _status: row.published ? "published" : "draft",
  };

  const existing = await payload.find({
    collection: "posts",
    limit: 1,
    where: { slug: { equals: row.slug } },
  });

  if (existing.docs[0]) {
    await payload.update({ collection: "posts", id: existing.docs[0].id, data, locale: "all" });
  } else {
    await payload.create({ collection: "posts", data, locale: "all" });
  }
}

const { data: projects, error: projectsError } = await supabase.from("projects").select("*");
if (projectsError) throw projectsError;
for (const project of projects ?? []) {
  await upsertProject(project);
}

const { data: posts, error: postsError } = await supabase.from("blog_posts").select("*");
if (postsError) throw postsError;
for (const post of posts ?? []) {
  await upsertPost(post);
}

console.log(`Migrated ${projects?.length ?? 0} projects and ${posts?.length ?? 0} posts to Payload.`);
