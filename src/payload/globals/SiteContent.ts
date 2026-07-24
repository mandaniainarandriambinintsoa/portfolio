import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../collections/access.ts";

export const SiteContent: GlobalConfig = {
  slug: "site-content",
  label: "Site content",
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
      name: "content",
      type: "json",
      admin: {
        description:
          "Full localized site dictionary migrated from the codebase. Keep valid JSON; use the dedicated collections for services, projects and posts.",
      },
      localized: true,
      required: true,
    },
  ],
};
