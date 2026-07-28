import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "./access.ts";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks.ts";
import { generatePreviewURL } from "../preview.ts";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "isLanding", "_status", "sortOrder"],
    group: "Content",
    livePreview: {
      url: ({ data, req }) => generatePreviewURL({ collection: "services", data, req }),
    },
    preview: (data, { req }) => generatePreviewURL({ collection: "services", data, req }),
    useAsTitle: "title",
  },
  defaultSort: "sortOrder",
  hooks: {
    afterChange: [revalidateAfterChange("service")],
    afterDelete: [revalidateAfterDelete("service")],
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
      name: "key",
      type: "text",
      admin: {
        description: "Stable FR/EN pairing key. Do not change after publishing.",
        position: "sidebar",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      index: true,
      localized: true,
      required: true,
    },
    {
      name: "isLanding",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
    },
    {
      name: "sortOrder",
      type: "number",
      admin: {
        position: "sidebar",
      },
      defaultValue: 100,
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
      type: "tabs",
      tabs: [
        {
          label: "Card",
          fields: [
            {
              name: "icon",
              type: "text",
              admin: {
                description: "Semantic icon key mapped to the site IconScout palette, e.g. automation or code_blocks.",
              },
              required: true,
            },
            {
              name: "color",
              type: "select",
              defaultValue: "indigo",
              options: [
                { label: "Indigo", value: "indigo" },
                { label: "Emerald", value: "emerald" },
                { label: "Blue", value: "blue" },
                { label: "Purple", value: "purple" },
                { label: "Sky", value: "sky" },
                { label: "Amber", value: "amber" },
              ],
              required: true,
            },
            {
              name: "title",
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
              name: "cardTitle",
              type: "text",
              localized: true,
            },
            {
              name: "cardDescription",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          label: "Landing",
          fields: [
            {
              name: "landing",
              type: "json",
              admin: {
                description:
                  "Structured landing content migrated from the current site. Keep JSON valid; later we can replace this with marketer-friendly blocks.",
              },
              localized: true,
            },
          ],
        },
        {
          label: "SEO",
          fields: [
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
          ],
        },
      ],
    },
  ],
};
