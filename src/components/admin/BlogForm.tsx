"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import MarkdownEditor from "./MarkdownEditor";
import SlugInput from "./SlugInput";
import TagsInput from "./TagsInput";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/admin/actions";
import type { Database } from "@/lib/supabase/types";

type BlogRow = Database["public"]["Tables"]["blog_posts"]["Row"];

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

type Props = {
  initial?: BlogRow;
};

export default function BlogForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = !!initial;

  const [tab, setTab] = useState<"fr" | "en">("fr");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [titleFr, setTitleFr] = useState(initial?.title_fr ?? "");
  const [titleEn, setTitleEn] = useState(initial?.title_en ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerptFr, setExcerptFr] = useState(initial?.excerpt_fr ?? "");
  const [excerptEn, setExcerptEn] = useState(initial?.excerpt_en ?? "");
  const [contentFr, setContentFr] = useState(initial?.content_fr ?? "");
  const [contentEn, setContentEn] = useState(initial?.content_en ?? "");
  const [seoTitleFr, setSeoTitleFr] = useState(initial?.seo_title_fr ?? "");
  const [seoTitleEn, setSeoTitleEn] = useState(initial?.seo_title_en ?? "");
  const [seoDescFr, setSeoDescFr] = useState(initial?.seo_description_fr ?? "");
  const [seoDescEn, setSeoDescEn] = useState(initial?.seo_description_en ?? "");
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [published, setPublished] = useState(initial?.published ?? false);
  const [publishedAt, setPublishedAt] = useState(
    initial?.published_at
      ? new Date(initial.published_at).toISOString().slice(0, 16)
      : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const data = {
      title_fr: titleFr,
      title_en: titleEn,
      slug,
      excerpt_fr: excerptFr,
      excerpt_en: excerptEn,
      content_fr: contentFr,
      content_en: contentEn,
      seo_title_fr: seoTitleFr || null,
      seo_title_en: seoTitleEn || null,
      seo_description_fr: seoDescFr || null,
      seo_description_en: seoDescEn || null,
      cover_image: coverImage || null,
      tags,
      reading_time: calcReadingTime(contentFr || contentEn),
      published,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
    };

    try {
      if (isEdit) {
        await updateBlogPost(initial.id, data);
      } else {
        await createBlogPost(data);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initial) return;
    setDeleting(true);
    try {
      await deleteBlogPost(initial.id, initial.slug);
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setDeleting(false);
      setShowDelete(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Language tabs */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1 w-fit">
          {(["fr", "en"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setTab(lang)}
              className={`px-4 py-2 text-sm rounded-lg transition-all cursor-pointer ${
                tab === lang
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang === "fr" ? "Français" : "English"}
            </button>
          ))}
        </div>

        {/* Title + Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tab === "fr" ? (
            <FormField
              label="Titre (FR)"
              name="title_fr"
              value={titleFr}
              onChange={setTitleFr}
              required
              placeholder="Mon article"
            />
          ) : (
            <FormField
              label="Title (EN)"
              name="title_en"
              value={titleEn}
              onChange={setTitleEn}
              required
              placeholder="My article"
            />
          )}
          <SlugInput value={slug} onChange={setSlug} titleValue={titleFr || titleEn} />
        </div>

        {/* Excerpt */}
        {tab === "fr" ? (
          <FormField
            label="Extrait (FR)"
            name="excerpt_fr"
            type="textarea"
            rows={3}
            value={excerptFr}
            onChange={setExcerptFr}
            placeholder="Résumé court de l'article..."
          />
        ) : (
          <FormField
            label="Excerpt (EN)"
            name="excerpt_en"
            type="textarea"
            rows={3}
            value={excerptEn}
            onChange={setExcerptEn}
            placeholder="Short summary of the article..."
          />
        )}

        {/* Content Markdown */}
        {tab === "fr" ? (
          <MarkdownEditor
            label="Contenu (FR) — Markdown"
            name="content_fr"
            value={contentFr}
            onChange={setContentFr}
            placeholder="# Mon article..."
          />
        ) : (
          <MarkdownEditor
            label="Content (EN) — Markdown"
            name="content_en"
            value={contentEn}
            onChange={setContentEn}
            placeholder="# My article..."
          />
        )}

        {/* SEO */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            SEO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tab === "fr" ? (
              <>
                <FormField
                  label="SEO Title (FR)"
                  name="seo_title_fr"
                  value={seoTitleFr}
                  onChange={setSeoTitleFr}
                />
                <FormField
                  label="SEO Description (FR)"
                  name="seo_desc_fr"
                  value={seoDescFr}
                  onChange={setSeoDescFr}
                />
              </>
            ) : (
              <>
                <FormField
                  label="SEO Title (EN)"
                  name="seo_title_en"
                  value={seoTitleEn}
                  onChange={setSeoTitleEn}
                />
                <FormField
                  label="SEO Description (EN)"
                  name="seo_desc_en"
                  value={seoDescEn}
                  onChange={setSeoDescEn}
                />
              </>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Image de couverture (URL)"
            name="cover_image"
            type="url"
            value={coverImage}
            onChange={setCoverImage}
            placeholder="https://..."
          />
          <FormField
            label="Date de publication"
            name="published_at"
            type="text"
            value={publishedAt}
            onChange={setPublishedAt}
            placeholder="2026-02-18T10:00"
          />
        </div>

        <TagsInput value={tags} onChange={setTags} />

        {/* Published toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 rounded bg-white/5 border border-white/10 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-slate-300">Publier immédiatement</span>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl transition-all cursor-pointer"
          >
            {saving ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer l'article"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className="px-6 py-3 bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20 font-semibold rounded-xl transition-all cursor-pointer"
            >
              Supprimer
            </button>
          )}
        </div>
      </form>

      {isEdit && (
        <DeleteConfirmDialog
          open={showDelete}
          title={initial.title_fr}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={deleting}
        />
      )}
    </>
  );
}
