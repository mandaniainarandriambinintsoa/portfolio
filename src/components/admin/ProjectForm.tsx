"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import SlugInput from "./SlugInput";
import TagsInput from "./TagsInput";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/admin/actions";
import type { Database } from "@/lib/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

type Props = {
  initial?: ProjectRow;
};

export default function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const isEdit = !!initial;

  const [tab, setTab] = useState<"fr" | "en">("fr");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [titleFr, setTitleFr] = useState(initial?.title_fr ?? "");
  const [titleEn, setTitleEn] = useState(initial?.title_en ?? "");
  const [subtitleFr, setSubtitleFr] = useState(initial?.subtitle_fr ?? "");
  const [subtitleEn, setSubtitleEn] = useState(initial?.subtitle_en ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [descFr, setDescFr] = useState(initial?.description_fr ?? "");
  const [descEn, setDescEn] = useState(initial?.description_en ?? "");
  const [category, setCategory] = useState(initial?.category ?? "webapp");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [image, setImage] = useState(initial?.image ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [workflowFile, setWorkflowFile] = useState(initial?.workflow_file ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? false);
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const data = {
      title_fr: titleFr,
      title_en: titleEn,
      subtitle_fr: subtitleFr,
      subtitle_en: subtitleEn,
      slug,
      description_fr: descFr,
      description_en: descEn,
      category,
      tags,
      image,
      link: link || null,
      workflow_file: workflowFile || null,
      featured,
      published,
      sort_order: parseInt(sortOrder) || 0,
    };

    try {
      if (isEdit) {
        await updateProject(initial.id, data);
      } else {
        await createProject(data);
      }
      router.push("/admin/projects");
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
      await deleteProject(initial.id, initial.slug);
      router.push("/admin/projects");
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
              placeholder="Mon projet"
            />
          ) : (
            <FormField
              label="Title (EN)"
              name="title_en"
              value={titleEn}
              onChange={setTitleEn}
              required
              placeholder="My project"
            />
          )}
          <SlugInput value={slug} onChange={setSlug} titleValue={titleFr || titleEn} />
        </div>

        {/* Subtitle */}
        {tab === "fr" ? (
          <FormField
            label="Sous-titre (FR)"
            name="subtitle_fr"
            value={subtitleFr}
            onChange={setSubtitleFr}
            placeholder="Description courte"
          />
        ) : (
          <FormField
            label="Subtitle (EN)"
            name="subtitle_en"
            value={subtitleEn}
            onChange={setSubtitleEn}
            placeholder="Short description"
          />
        )}

        {/* Description */}
        {tab === "fr" ? (
          <FormField
            label="Description (FR)"
            name="description_fr"
            type="textarea"
            rows={6}
            value={descFr}
            onChange={setDescFr}
            placeholder="Description détaillée du projet..."
          />
        ) : (
          <FormField
            label="Description (EN)"
            name="description_en"
            type="textarea"
            rows={6}
            value={descEn}
            onChange={setDescEn}
            placeholder="Detailed project description..."
          />
        )}

        {/* Category + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Catégorie"
            name="category"
            type="select"
            value={category}
            onChange={setCategory}
            options={[
              { value: "webapp", label: "Web App" },
              { value: "workflow", label: "Workflow" },
            ]}
          />
          <FormField
            label="Ordre d'affichage"
            name="sort_order"
            type="number"
            value={sortOrder}
            onChange={setSortOrder}
            placeholder="0"
          />
          <FormField
            label="Image (chemin)"
            name="image"
            value={image}
            onChange={setImage}
            placeholder="/images/projects/..."
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Lien externe (URL)"
            name="link"
            type="url"
            value={link}
            onChange={setLink}
            placeholder="https://..."
          />
          <FormField
            label="Fichier workflow (chemin SVG)"
            name="workflow_file"
            value={workflowFile}
            onChange={setWorkflowFile}
            placeholder="/images/workflows/..."
          />
        </div>

        <TagsInput value={tags} onChange={setTags} />

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded bg-white/5 border border-white/10 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Featured</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded bg-white/5 border border-white/10 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Publié</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl transition-all cursor-pointer"
          >
            {saving ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer le projet"}
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
