import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "./access.ts";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks.ts";
import { generatePreviewURL } from "../preview.ts";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "category", "featured", "_status", "sortOrder"],
    group: "Content",
    livePreview: {
      url: ({ data, req }) => generatePreviewURL({ collection: "projects", data, req }),
    },
    preview: (data, { req }) => generatePreviewURL({ collection: "projects", data, req }),
    useAsTitle: "title",
  },
  defaultSort: "sortOrder",
  hooks: {
    afterChange: [revalidateAfterChange("project")],
    afterDelete: [revalidateAfterDelete("project")],
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
      name: "subtitle",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "category",
      type: "select",
      defaultValue: "webapp",
      options: [
        { label: "Web app", value: "webapp" },
        { label: "Workflow", value: "workflow" },
        { label: "Site metier", value: "site-metier" },
      ],
      required: true,
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
      name: "media",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Image geree par Payload pour les nouveaux contenus.",
      },
    },
    {
      name: "image",
      type: "text",
      required: true,
      admin: {
        description: "Chemin public existant, conserve pour la migration et les fallbacks.",
      },
    },
    {
      name: "imageAlt",
      type: "text",
      localized: true,
    },
    {
      name: "link",
      type: "text",
    },
    {
      name: "workflowFile",
      type: "text",
    },
    {
      name: "role",
      type: "textarea",
      localized: true,
    },
    {
      name: "results",
      type: "array",
      fields: [
        {
          name: "item",
          type: "text",
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 100,
      admin: {
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
