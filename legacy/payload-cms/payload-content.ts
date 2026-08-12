import type { Locale } from "@/i18n/config";
import type { ProjectItem, ServiceItem } from "@/lib/types";
import { getPayloadClient } from "@/lib/payload";
import { isPayloadRemoteContentEnabled } from "@/lib/content-mode";
import type { BlogPost } from "./blog";

type TagItem = {
  label?: string | null;
};

type MediaLike = {
  url?: string | null;
};

type PayloadProject = {
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  tags?: TagItem[] | null;
  link?: string | null;
  featured?: boolean | null;
  category?: ProjectItem["category"] | null;
  image?: string | null;
  media?: MediaLike | string | null;
  workflowFile?: string | null;
};

type PayloadPost = {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  coverImage?: string | null;
  coverMedia?: MediaLike | string | null;
  tags?: TagItem[] | null;
  author?: string | null;
  readingTime?: number | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

type PayloadService = {
  key?: string | null;
  slug?: string | null;
  icon?: string | null;
  color?: ServiceItem["color"] | null;
  title?: string | null;
  description?: string | null;
  cardTitle?: string | null;
  cardDescription?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  landing?: unknown;
  isLanding?: boolean | null;
  sortOrder?: number | null;
  published?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

type PayloadReadOptions = {
  draft?: boolean;
};

function skipRemoteContent(): boolean {
  return !isPayloadRemoteContentEnabled();
}

function mapTags(tags?: TagItem[] | null): string[] {
  return (tags ?? []).map((tag) => tag.label).filter((tag): tag is string => Boolean(tag));
}

function mediaURL(media?: MediaLike | string | null): string | null {
  if (!media || typeof media === "string") return null;
  return media.url ?? null;
}

function publicStatusWhere() {
  return {
    and: [
      { _status: { equals: "published" } },
      { published: { not_equals: false } },
    ],
  };
}

function maybePublicStatusWhere(options?: PayloadReadOptions) {
  return options?.draft ? undefined : publicStatusWhere();
}

function mapPayloadService(service: PayloadService): ServiceItem {
  return {
    key: service.key ?? undefined,
    slug: service.slug ?? "",
    icon: service.icon ?? "code_blocks",
    color: service.color ?? "indigo",
    title: service.title ?? "",
    description: service.description ?? "",
    cardTitle: service.cardTitle ?? undefined,
    cardDescription: service.cardDescription ?? undefined,
    seoTitle: service.seoTitle ?? undefined,
    seoDescription: service.seoDescription ?? undefined,
    landing: service.landing ?? undefined,
    isLanding: Boolean(service.isLanding),
    updatedAt: service.updatedAt ?? null,
    createdAt: service.createdAt ?? null,
  };
}

export async function getPayloadServices(
  locale: Locale,
  options?: PayloadReadOptions
): Promise<ServiceItem[] | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      depth: 0,
      draft: Boolean(options?.draft),
      fallbackLocale: "fr",
      limit: 100,
      locale,
      overrideAccess: Boolean(options?.draft),
      sort: "sortOrder",
      where: maybePublicStatusWhere(options),
    } as never);

    if (!result.docs.length) return null;
    return (result.docs as PayloadService[]).map(mapPayloadService);
  } catch {
    return null;
  }
}

export async function getPayloadServiceBySlug(
  slug: string,
  locale: Locale,
  options?: PayloadReadOptions
): Promise<ServiceItem | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
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

    const service = result.docs[0] as PayloadService | undefined;
    return service ? mapPayloadService(service) : null;
  } catch {
    return null;
  }
}

export async function getPayloadServiceSitemapEntries(
  locale: Locale
): Promise<{ key: string; slug: string; updatedAt: string | null; createdAt: string | null }[] | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      depth: 0,
      fallbackLocale: "fr",
      limit: 100,
      locale,
      sort: "sortOrder",
      where: publicStatusWhere(),
    } as never);

    if (!result.docs.length) return null;

    return (result.docs as PayloadService[])
      .filter((service) => Boolean(service.slug))
      .map((service) => ({
        key: service.key ?? service.slug ?? "",
        slug: service.slug ?? "",
        updatedAt: service.updatedAt ?? null,
        createdAt: service.createdAt ?? null,
      }));
  } catch {
    return null;
  }
}

export async function getPayloadSiteDictionary(locale: Locale): Promise<Record<string, unknown> | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "site-content",
      depth: 0,
      fallbackLocale: "fr",
      locale,
    } as never);

    const content = (result as { content?: unknown })?.content;
    return content && typeof content === "object" && !Array.isArray(content)
      ? (content as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function getPayloadProjects(
  locale: Locale,
  options?: PayloadReadOptions
): Promise<ProjectItem[] | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      draft: Boolean(options?.draft),
      fallbackLocale: "fr",
      limit: 100,
      locale,
      overrideAccess: Boolean(options?.draft),
      sort: "sortOrder",
      where: maybePublicStatusWhere(options),
    } as never);

    if (!result.docs.length) return null;

    return (result.docs as PayloadProject[]).map((project) => ({
      slug: project.slug ?? "",
      title: project.title ?? "",
      subtitle: project.subtitle ?? "",
      description: project.description ?? "",
      tags: mapTags(project.tags),
      link: project.link ?? null,
      featured: Boolean(project.featured),
      category: project.category ?? "webapp",
      image: mediaURL(project.media) ?? project.image ?? "",
      workflowFile: project.workflowFile ?? null,
    }));
  } catch {
    return null;
  }
}

export async function getPayloadProjectBySlug(
  slug: string,
  locale: Locale,
  options?: PayloadReadOptions
): Promise<ProjectItem | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      depth: 1,
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

    const project = result.docs[0] as PayloadProject | undefined;
    if (!project) return null;

    return {
      slug: project.slug ?? slug,
      title: project.title ?? "",
      subtitle: project.subtitle ?? "",
      description: project.description ?? "",
      tags: mapTags(project.tags),
      link: project.link ?? null,
      featured: Boolean(project.featured),
      category: project.category ?? "webapp",
      image: mediaURL(project.media) ?? project.image ?? "",
      workflowFile: project.workflowFile ?? null,
    };
  } catch {
    return null;
  }
}

export async function getPayloadProjectSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; createdAt: string | null }[] | null
> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      depth: 0,
      fallbackLocale: "fr",
      limit: 100,
      locale: "fr",
      where: publicStatusWhere(),
    } as never);

    if (!result.docs.length) return null;

    return (result.docs as Array<{ slug?: string | null; updatedAt?: string; createdAt?: string }>)
      .filter((project) => Boolean(project.slug))
      .map((project) => ({
        slug: project.slug ?? "",
        updatedAt: project.updatedAt ?? null,
        createdAt: project.createdAt ?? null,
      }));
  } catch {
    return null;
  }
}

export async function getPayloadPosts(locale: Locale): Promise<BlogPost[] | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      depth: 1,
      fallbackLocale: "fr",
      limit: 100,
      locale,
      sort: "-publishedAt",
      where: publicStatusWhere(),
    } as never);

    return (result.docs as PayloadPost[]).map((post) => ({
      slug: post.slug ?? "",
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      seoTitle: post.seoTitle ?? null,
      seoDescription: post.seoDescription ?? null,
      coverImage: mediaURL(post.coverMedia) ?? post.coverImage ?? null,
      tags: mapTags(post.tags),
      author: post.author ?? "Mandaniaina Randriambinintsoa",
      readingTime: post.readingTime ?? 5,
      publishedAt: post.publishedAt ?? null,
      updatedAt: post.updatedAt ?? null,
    }));
  } catch {
    return null;
  }
}

export async function getPayloadPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      depth: 1,
      fallbackLocale: "fr",
      limit: 1,
      locale,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
          { published: { not_equals: false } },
        ],
      },
    } as never);

    const post = result.docs[0] as PayloadPost | undefined;
    if (!post) return null;

    return {
      slug: post.slug ?? slug,
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      seoTitle: post.seoTitle ?? null,
      seoDescription: post.seoDescription ?? null,
      coverImage: mediaURL(post.coverMedia) ?? post.coverImage ?? null,
      tags: mapTags(post.tags),
      author: post.author ?? "Mandaniaina Randriambinintsoa",
      readingTime: post.readingTime ?? 5,
      publishedAt: post.publishedAt ?? null,
      updatedAt: post.updatedAt ?? null,
    };
  } catch {
    return null;
  }
}

export async function getPayloadPostSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; publishedAt: string | null }[] | null
> {
  if (skipRemoteContent()) return null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      depth: 0,
      fallbackLocale: "fr",
      limit: 100,
      locale: "fr",
      where: publicStatusWhere(),
    } as never);

    if (!result.docs.length) return null;

    return (result.docs as Array<{ slug?: string | null; updatedAt?: string; publishedAt?: string | null }>)
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        slug: post.slug ?? "",
        updatedAt: post.updatedAt ?? null,
        publishedAt: post.publishedAt ?? null,
      }));
  } catch {
    return null;
  }
}
