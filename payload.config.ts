import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./src/payload/collections/Media.ts";
import { Posts } from "./src/payload/collections/Posts.ts";
import { Projects } from "./src/payload/collections/Projects.ts";
import { Services } from "./src/payload/collections/Services.ts";
import { Users } from "./src/payload/collections/Users.ts";
import { SiteContent } from "./src/payload/globals/SiteContent.ts";
import { SiteSettings } from "./src/payload/globals/SiteSettings.ts";
import { migrations as postgresMigrations } from "./src/payload/migrations/postgres/index.ts";
import { migrations as sqliteMigrations } from "./src/payload/migrations/sqlite/index.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const sharpDependency = sharp as Parameters<typeof buildConfig>[0]["sharp"];

const databaseUri =
  process.env.PAYLOAD_DATABASE_URI ||
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL;

if (!databaseUri) {
  mkdirSync(path.resolve(dirname, ".payload"), { recursive: true });
}

const db = databaseUri
  ? postgresAdapter({
      migrationDir: path.resolve(dirname, "src/payload/migrations/postgres"),
      prodMigrations: postgresMigrations,
      pool: {
        connectionString: databaseUri,
        max: Number(process.env.PAYLOAD_DATABASE_POOL_MAX ?? 5),
        ssl: databaseUri.includes("supabase.co") || databaseUri.includes("pooler.supabase.com")
          ? { rejectUnauthorized: false }
          : undefined,
      },
      idType: "uuid",
      schemaName: process.env.PAYLOAD_DATABASE_SCHEMA || undefined,
    })
  : sqliteAdapter({
      client: {
        url: process.env.PAYLOAD_SQLITE_URL || "file:./.payload/payload.db",
      },
      idType: "uuid",
      migrationDir: path.resolve(dirname, "src/payload/migrations/sqlite"),
      prodMigrations: sqliteMigrations,
      push: true,
    });

const serverURL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "dark",
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "src/app/(payload)/admin/importMap.js"),
    },
    meta: {
      titleSuffix: " - Manda IA CMS",
    },
  },
  collections: [Users, Media, Services, Projects, Posts],
  cors: [serverURL, "http://localhost:3000"],
  csrf: [serverURL, "http://localhost:3000"],
  db,
  globals: [SiteSettings, SiteContent],
  localization: {
    defaultLocale: "fr",
    fallback: true,
    locales: [
      { code: "fr", label: "Francais" },
      { code: "en", label: "English" },
    ],
  },
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  routes: {
    admin: "/admin",
    api: "/api/payload",
    graphQL: "/api/graphql",
    graphQLPlayground: "/api/graphql-playground",
  },
  secret: process.env.PAYLOAD_SECRET || "change-me-in-env-before-production",
  serverURL,
  sharp: sharpDependency,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
});
