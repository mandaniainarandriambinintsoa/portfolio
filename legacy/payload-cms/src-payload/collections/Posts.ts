import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "./access.ts";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks.ts";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "author", "_status", "publishedAt"],
    group: "Content",
    useAsTitle: "title",
  },
  defaultSort: "-publishedAt",
  hooks: {
    afterChange: [revalidateAfterChange("blog")],
    afterDelete: [revalidateAfterDelete("blog")],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1200,
        showSaveDraftButton: true,
      },
    },
    maxPerDoc: 30,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      localized: true,
      required: true,
      admin: {
        description: "Markdown conserve pour le rendu public actuel.",
      },
    },
    {
      name: "coverMedia",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "coverImage",
      type: "text",
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Mandaniaina Randriambinintsoa",
      required: true,
    },
    {
      name: "readingTime",
      type: "number",
      defaultValue: 5,
      required: true,
    },
    {
      name: "seoTitle",
      type: "text",
      localized: true,
    },
    {
      name: "seoDescription",
      type: "textarea",
      localized: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Compatibilite avec l'ancien schema Supabase. La publication Payload reste la source principale.",
        position: "sidebar",
      },
    },
  ],
};
