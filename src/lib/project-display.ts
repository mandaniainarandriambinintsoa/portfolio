import type { ProjectCategory } from "@/lib/types";

/** Accent tone used for project category badges and subtitles. */
export type ProjectTone = "indigo" | "emerald" | "amber";

/** Labels for the three project categories, sourced from the i18n dictionary. */
export type CategoryLabels = {
  webapp: string;
  workflow: string;
  siteMetier: string;
};

/** Map a project category to its accent tone. */
export function getProjectTone(category: ProjectCategory): ProjectTone {
  if (category === "workflow") return "emerald";
  if (category === "site-metier") return "amber";
  return "indigo";
}

/** Map a project category to its localized label. */
export function getCategoryLabel(
  category: ProjectCategory,
  labels: CategoryLabels,
): string {
  if (category === "workflow") return labels.workflow;
  if (category === "site-metier") return labels.siteMetier;
  return labels.webapp;
}
