import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-stale*/**",
    "legacy/**",
    ".playwright-mcp/**",
    ".tmp-chrome-debug-profile*/**",
    ".tmp-chrome-seo-verify*/**",
    ".tmp-chrome-freelance-profile/**",
    ".tmp-screenshots/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
