import { revalidatePath } from "next/cache";

export function revalidateContent(type: "blog" | "project", slug?: string) {
  if (type === "blog" && slug) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath("/blog");
    revalidatePath("/en/blog");
  } else if (type === "project" && slug) {
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/en/projects/${slug}`);
    revalidatePath("/projects");
    revalidatePath("/en/projects");
    revalidatePath("/");
    revalidatePath("/en");
  } else if (type === "blog") {
    revalidatePath("/blog");
    revalidatePath("/en/blog");
  } else if (type === "project") {
    revalidatePath("/projects");
    revalidatePath("/en/projects");
    revalidatePath("/");
    revalidatePath("/en");
  }

  revalidatePath("/sitemap.xml");
}
