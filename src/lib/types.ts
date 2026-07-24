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

export type ServiceColor = "indigo" | "emerald" | "blue" | "purple" | "sky" | "amber";

export type ServiceItem = {
  key?: string;
  icon: string;
  title: string;
  description: string;
  slug: string;
  color: ServiceColor;
  isLanding?: boolean;
  cardTitle?: string;
  cardDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  landing?: unknown;
  updatedAt?: string | null;
  createdAt?: string | null;
};
