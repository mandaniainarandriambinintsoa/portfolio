export type ProjectCategory = "webapp" | "workflow";

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
