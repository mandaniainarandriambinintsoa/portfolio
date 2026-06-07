export type NavItem = {
  label: { fr: string; en: string };
  href: { fr: string; en: string };
};

export const navItems: NavItem[] = [
  {
    label: { fr: "Services", en: "Services" },
    href: { fr: "/services", en: "/en/services" },
  },
  {
    label: { fr: "Process", en: "Process" },
    href: { fr: "/#process", en: "/en/#process" },
  },
  {
    label: { fr: "Projets", en: "Projects" },
    href: { fr: "/#projects", en: "/en/#projects" },
  },
  {
    label: { fr: "Sites métier", en: "Business Sites" },
    href: { fr: "/site-metier", en: "/en/site-metier" },
  },
  {
    label: { fr: "À propos", en: "About" },
    href: { fr: "/about", en: "/en/about" },
  },
  {
    label: { fr: "Blog", en: "Blog" },
    href: { fr: "/blog", en: "/en/blog" },
  },
];
