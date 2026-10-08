import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getProjects } from "@/lib/data/projects";

const projectsByService: Record<string, string[]> = {
  "developpement-sites-saas": ["meckia", "factumation", "teamia"],
  "integration-ia": ["facebook-agen-ia", "international-opportunity-agent-n8n"],
  "developpeur-rag": ["facebook-agen-ia"],
  "automatisation-n8n": [
    "automatisation-prospection-n8n-lemlist",
    "international-opportunity-agent-n8n",
  ],
  "scaling-saas-workflows": ["optimisation-performance-manda-ia", "meckia"],
  "automatisation-n8n-madagascar": [
    "automatisation-prospection-n8n-lemlist",
    "factumation",
  ],
  "developpeur-react-nextjs-madagascar": ["meckia", "teamia"],
  "developpeur-nextjs-supabase-madagascar": [
    "factumation",
    "logiciel-prospection-b2b-teamia",
  ],
  "developpeur-python-ia-madagascar": ["artigen", "facebook-agen-ia"],
  "developpeur-claude-code-n8n": [
    "factumation",
    "international-opportunity-agent-n8n",
  ],
  "developpeur-codex-n8n": [
    "international-opportunity-agent-n8n",
    "animation-web",
  ],
  "developpeur-javascript-madagascar": ["meckia", "paidmada-mobile-money"],
  "developpeur-nodejs-madagascar": ["paidmada-mobile-money", "meckia"],
  "developpeur-agent-ia-madagascar": ["facebook-agen-ia", "teamia"],
  "freelance-vs-agence-offshore-madagascar": ["teamia", "meckia"],
  "developpeur-agent-vocal-ia": ["madavoyage"],
  "audit-performance-site-web": ["optimisation-performance-manda-ia"],
  "consultant-seo-geo": ["teamia", "optimisation-performance-manda-ia"],
  "forward-deployed-engineer": ["logiciel-prospection-b2b-teamia", "meckia"],
  "remote-n8n-consultant": [
    "automatisation-prospection-n8n-lemlist",
    "international-opportunity-agent-n8n",
  ],
};

export default async function ServiceProjectProof({
  serviceKey,
  locale,
}: {
  serviceKey: string;
  locale: Locale;
}) {
  const slugs = projectsByService[serviceKey] ?? [];
  const projects = await getProjects(locale);
  const selected = slugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
  if (!selected.length) return null;
  const prefix = locale === "fr" ? "" : "/en";

  return (
    <section
      className="my-12 border-y border-white/10 py-8"
      aria-label={
        locale === "fr" ? "Projets à explorer" : "Projects to explore"
      }
    >
      <h2 className="text-xl font-bold text-white">
        {locale === "fr" ? "Explorer les réalisations" : "Explore the work"}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
        {locale === "fr"
          ? "Chaque fiche précise le contexte et le périmètre réalisé. Ces exemples ne garantissent pas le même résultat pour un autre projet."
          : "Explore the original requirements, technical decisions and delivered scope in each case."}
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {selected.map((project) => (
          <Link
            key={project.slug}
            href={`${prefix}/projects/${project.slug}`}
            className="group min-w-0"
            data-ph-event="project_opened"
            data-ph-props={JSON.stringify({
              area: "service_project_proof",
              service_key: serviceKey,
              project_slug: project.slug,
              locale,
            })}
          >
            <h3 className="font-semibold text-indigo-300 group-hover:text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {project.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
