import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "./access.ts";
import { homeLayoutBlocks } from "../blocks/HomeSections.ts";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks.ts";
import { generatePreviewURL } from "../preview.ts";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    group: "Content",
    livePreview: {
      url: ({ data, req }) => generatePreviewURL({ collection: "pages", data, req }),
    },
    preview: (data, { req }) => generatePreviewURL({ collection: "pages", data, req }),
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [revalidateAfterChange("page")],
    afterDelete: [revalidateAfterDelete("page")],
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
      admin: {
        description: "Use 'home' for the homepage.",
        position: "sidebar",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "published",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: true,
    },
    {
      name: "layout",
      type: "blocks",
      admin: {
        description: "Add, remove and drag sections to change the page structure.",
      },
      blocks: homeLayoutBlocks,
      localized: true,
      required: true,
    },
  ],
};
