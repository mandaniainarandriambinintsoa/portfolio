import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

type RevalidateTarget = "blog" | "page" | "project" | "service";

async function revalidate(type: RevalidateTarget, slug?: string) {
  try {
    const { revalidateContent } = await import("@/lib/admin/revalidate");
    revalidateContent(type, slug);
  } catch {
    // Payload can also run from CLI scripts where Next revalidation is unavailable.
  }
}

export function revalidateAfterChange(type: RevalidateTarget): CollectionAfterChangeHook {
  return async ({ doc }) => {
    await revalidate(type, typeof doc.slug === "string" ? doc.slug : undefined);
    return doc;
  };
}

export function revalidateAfterDelete(type: RevalidateTarget): CollectionAfterDeleteHook {
  return async ({ doc }) => {
    await revalidate(type, typeof doc.slug === "string" ? doc.slug : undefined);
    return doc;
  };
}
