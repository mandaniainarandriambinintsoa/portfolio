export type ProjectCategory = "webapp" | "workflow" | "site-metier";

export type CaseStudyVariant = {
  image: string;
  label: string;
  description: string;
};

export type CaseStudy = {
  brief: string;
  variantsIntro: string;
  variants: CaseStudyVariant[];
  decision: string;
  finalImage: string;
  finalCaption: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string | null;
  featured: boolean;
  category: ProjectCategory;
  image: string;
  workflowFile: string | null;
};
