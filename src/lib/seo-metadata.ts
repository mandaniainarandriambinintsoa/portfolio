const DEFAULT_TITLE_LIMIT = 60;
const DEFAULT_DESCRIPTION_LIMIT = 155;

function normalizeMetadataText(value: string): string {
  return value
    .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function truncateAtWord(value: string, limit: number): string {
  const normalized = normalizeMetadataText(value);
  if (normalized.length <= limit) return normalized;

  const textLimit = limit - 1;
  const candidate = normalized.slice(0, textLimit + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const boundary =
    lastSpace >= Math.floor(textLimit * 0.7) ? lastSpace : textLimit;
  const truncated = candidate
    .slice(0, boundary)
    .replace(/[\s,;:!?.\-–—]+$/u, "")
    .trim();

  return `${truncated}…`;
}

export function compactMetadataTitle(value: string): string {
  return truncateAtWord(value, DEFAULT_TITLE_LIMIT);
}

export function compactMetadataDescription(value: string): string {
  return truncateAtWord(value, DEFAULT_DESCRIPTION_LIMIT);
}
