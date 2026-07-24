import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../collections/access.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: "Content",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1200,
        showSaveDraftButton: true,
      },
    },
    max: 20,
  },
  fields: [
    {
      name: "identity",
      type: "group",
      fields: [
        { name: "name", type: "text", localized: true },
        { name: "headline", type: "text", localized: true },
        { name: "bio", type: "textarea", localized: true },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "location", type: "text", localized: true },
        { name: "availability", type: "text", localized: true },
      ],
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "defaultTitle", type: "text", localized: true },
        { name: "defaultDescription", type: "textarea", localized: true },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
