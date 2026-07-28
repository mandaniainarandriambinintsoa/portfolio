import type { Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

export type HomeBlockType =
  | "homeHero"
  | "homeClientLogos"
  | "homeCommandCenter"
  | "homeServices"
  | "homeProcess"
  | "homeApproach"
  | "homeTestimonials"
  | "homeStats"
  | "homeCollaborationGuides"
  | "homePricing"
  | "homeTechStack"
  | "homeProjects"
  | "homeVisitorTracking"
  | "homeFAQ"
  | "homeCTAFinal";

export type PageLayoutBlock = {
  blockType: HomeBlockType;
  id?: string | null;
};

type PayloadPage = {
  layout?: PageLayoutBlock[] | null;
  slug?: string | null;
  title?: string | null;
};

type PayloadReadOptions = {
  draft?: boolean;
};

export const defaultHomeLayout: PageLayoutBlock[] = [
  { blockType: "homeHero" },
  { blockType: "homeClientLogos" },
  { blockType: "homeCommandCenter" },
  { blockType: "homeServices" },
  { blockType: "homeProcess" },
  { blockType: "homeApproach" },
  { blockType: "homeTestimonials" },
  { blockType: "homeStats" },
  { blockType: "homeCollaborationGuides" },
  { blockType: "homePricing" },
  { blockType: "homeTechStack" },
  { blockType: "homeProjects" },
  { blockType: "homeVisitorTracking" },
  { blockType: "homeFAQ" },
  { blockType: "homeCTAFinal" },
];

export async function getPageBySlug(
  slug: string,
  locale: Locale,
  options?: PayloadReadOptions
): Promise<PayloadPage | null> {
  if (process.env.PAYLOAD_SKIP_REMOTE_CONTENT === "true") return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      depth: 0,
      draft: Boolean(options?.draft),
      fallbackLocale: "fr",
      limit: 1,
      locale,
      overrideAccess: Boolean(options?.draft),
      where: {
        and: [
          { slug: { equals: slug } },
          ...(options?.draft
            ? []
            : [
                { _status: { equals: "published" } },
                { published: { not_equals: false } },
              ]),
        ],
      },
    } as never);

    return (result.docs[0] as PayloadPage | undefined) ?? null;
  } catch {
    return null;
  }
}
