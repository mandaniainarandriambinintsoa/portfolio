import { readFile } from "node:fs/promises";
import { getPayload } from "payload";

await loadEnvLocal(".env.local");

const locale = readArgument("--locale") ?? "en";
if (!["fr", "en"].includes(locale)) {
  throw new Error("--locale must be fr or en");
}

const { default: payloadConfig } = await import("../../payload.config.ts");
const payload = await getPayload({ config: payloadConfig });

try {
  const dictionary = JSON.parse(
    await readFile(`src/i18n/dictionaries/${locale}.json`, "utf8"),
  );
  const current = await payload.findGlobal({
    slug: "site-content",
    depth: 0,
    draft: false,
    fallbackLocale: false,
    locale,
  });
  const currentContent =
    current.content &&
    typeof current.content === "object" &&
    !Array.isArray(current.content)
      ? current.content
      : {};

  const updated = await payload.updateGlobal({
    slug: "site-content",
    data: {
      content: {
        ...currentContent,
        hero: dictionary.hero,
      },
      _status: "published",
    },
    draft: false,
    fallbackLocale: false,
    locale,
  });

  console.log(
    JSON.stringify(
      {
        locale,
        status: updated._status,
        hero: updated.content?.hero,
      },
      null,
      2,
    ),
  );
} finally {
  await payload.destroy();
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function loadEnvLocal(path) {
  const source = await readFile(path, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
