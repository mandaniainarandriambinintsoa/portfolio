import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "./access.ts";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["filename", "alt", "updatedAt"],
    useAsTitle: "filename",
  },
  upload: {
    mimeTypes: ["image/avif", "image/webp", "image/png", "image/jpeg", "image/svg+xml", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      admin: {
        description: "Texte alternatif court et descriptif pour le SEO et l'accessibilite.",
      },
    },
  ],
};
