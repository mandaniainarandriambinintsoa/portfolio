# Archived Payload CMS experiment

This directory preserves the former Payload CMS integration for reference and
possible reuse in TeamIA. It is excluded from TypeScript and the Next.js build.

The portfolio now treats its public content as code:

- Home, services, and projects use the locale dictionaries under `src/i18n`.
- Blog posts use the versioned snapshot at `src/content/blog-posts.json`.
- Publishing content requires a code change and deployment.

Do not move these files back into `src` without restoring the Payload packages,
database configuration, API routes, and an explicit CMS deployment plan.
