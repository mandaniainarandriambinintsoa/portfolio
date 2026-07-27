import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

await loadEnvLocal(".env.local");

const baseUrl = readArgument("--base-url") ?? "http://localhost:3020";
const apiSecret = process.env.API_SECRET_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!apiSecret || !supabaseUrl || !supabaseKey) {
  throw new Error(
    "API_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL and a Supabase key are required",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
const { data: posts, error } = await supabase
  .from("blog_posts")
  .select("*")
  .eq("published", true)
  .order("published_at", { ascending: true });

if (error) throw error;

const results = [];
for (const post of posts ?? []) {
  const response = await fetch(`${baseUrl}/api/public/blog`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiSecret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      slug: post.slug,
      title_fr: post.title_fr,
      title_en: post.title_en,
      excerpt_fr: post.excerpt_fr,
      excerpt_en: post.excerpt_en,
      content_fr: post.content_fr,
      content_en: post.content_en,
      seo_title_fr: post.seo_title_fr,
      seo_title_en: post.seo_title_en,
      seo_description_fr: post.seo_description_fr,
      seo_description_en: post.seo_description_en,
      cover_image: post.cover_image,
      tags: post.tags ?? [],
      author: post.author,
      reading_time: post.reading_time,
      published_at: post.published_at,
      published: true,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `${post.slug}: ${response.status} ${await response.text()}`,
    );
  }

  results.push({
    slug: post.slug,
    ...(await response.json()),
  });
}

console.log(JSON.stringify({ baseUrl, count: results.length, results }, null, 2));

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function loadEnvLocal(path) {
  const source = await readFile(path, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
