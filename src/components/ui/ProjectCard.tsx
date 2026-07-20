import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/lib/types";
import type { ProjectTone } from "@/lib/project-display";

const badgeTone: Record<ProjectTone, string> = {
  indigo: "bg-indigo-500/80",
  emerald: "bg-emerald-500/80",
  amber: "bg-amber-500/80",
};

/**
 * Finsweet-style portfolio card: large cover image on top, then title + arrow,
 * then service tags below. Uniform sizing (no bento spans). Used by both the
 * homepage Projects section and the /projects listing.
 *
 * The wrapping client components handle grid layout + scroll-reveal; this card
 * only needs the `.project-card` class so their GSAP selectors find it.
 */
export default function ProjectCard({
  project,
  href,
  categoryLabel,
  tone,
  showDescription = false,
}: {
  project: ProjectItem;
  href: string;
  categoryLabel: string;
  tone: ProjectTone;
  showDescription?: boolean;
}) {
  return (
    <Link
      href={href}
      className="project-card group block"
      data-ph-event="project_opened"
      data-ph-props={JSON.stringify({
        slug: project.slug,
        title: project.title,
        category: project.category,
        href,
      })}
    >
      {/* Cover image */}
      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white backdrop-blur-md ${badgeTone[tone]}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Title + arrow */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
        </div>
        <span
          aria-hidden="true"
          className="material-symbols-outlined mt-1 shrink-0 text-2xl text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
        >
          arrow_forward
        </span>
      </div>

      {/* Optional description */}
      {showDescription && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
          {project.description}
        </p>
      )}

      {/* Service tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
