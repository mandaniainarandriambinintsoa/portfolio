"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import type { gsap as GsapType } from "gsap";
import type { Locale } from "@/i18n/config";
import type { ProjectItem, ProjectCategory } from "@/lib/types";
import { getCategoryLabel, getProjectTone } from "@/lib/project-display";
import ProjectCard from "@/components/ui/ProjectCard";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

type FilterType = "all" | ProjectCategory;

/*
 * Finsweet-style portfolio: uniform 2-column grid of large cards.
 * Site metier showcases lead, then product and automation work follow.
 */

/** Reorder the homepage grid priority, with ScalApp last. */
function reorderForDisplay(items: ProjectItem[]): ProjectItem[] {
  const order = [
    "madavoyage",
    "garagiste",
    "bati-diaspora",
    "international-opportunity-agent-n8n",
    "factumation",
    "veille-codeur-automatisation-n8n",
    "leads-automation-showcase",
  ];
  const last = ["scalapp"];
  const copy = [...items];
  const front: ProjectItem[] = [];
  const back: ProjectItem[] = [];

  for (const slug of order) {
    const idx = copy.findIndex((p) => p.slug === slug);
    if (idx !== -1) front.push(...copy.splice(idx, 1));
  }
  for (const slug of last) {
    const idx = copy.findIndex((p) => p.slug === slug);
    if (idx !== -1) back.push(...copy.splice(idx, 1));
  }

  return [...front, ...copy, ...back];
}

export default function Projects({
  title,
  viewAll,
  items,
  locale,
  categoryLabels,
}: {
  title: string;
  viewAll: string;
  items: ProjectItem[];
  locale: Locale;
  categoryLabels: { webapp: string; workflow: string; siteMetier: string };
}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<typeof GsapType | null>(null);
  const prefix = locale === "fr" ? "" : "/en";
  const allLabel = locale === "fr" ? "Tous" : "All";

  const filtered = useMemo(() => {
    const base =
      filter === "all" ? items : items.filter((p) => p.category === filter);
    return filter === "all" ? reorderForDisplay(base) : base;
  }, [filter, items]);

  // Lazy-load GSAP + ScrollTrigger (keeps them out of initial bundle)
  useEffect(() => {
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapMod, stMod]) => {
      const gsap = gsapMod.default;
      gsap.registerPlugin(stMod.ScrollTrigger);
      stMod.ScrollTrigger.config({ ignoreMobileResize: true });
      gsapRef.current = gsap;
    });
  }, []);

  /* ── GSAP scroll-triggered reveal ── */
  useEffect(() => {
    const gsap = gsapRef.current;
    if (!gsap || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 48 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (i % 2) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
    // gsapRef is a ref (mutating it doesn't re-render), so it's not a valid dep;
    // re-run only when the filtered set changes.
  }, [filter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: allLabel },
    { key: "site-metier", label: categoryLabels.siteMetier },
    { key: "webapp", label: categoryLabels.webapp },
    { key: "workflow", label: categoryLabels.workflow },
  ];

  return (
    <section id="projects" className="w-full mb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Header + Filters ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading title={title} className="mb-0" />

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1 sm:w-auto sm:flex-nowrap sm:rounded-full">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  data-ph-event="project_filter_changed"
                  data-ph-props={JSON.stringify({ area: "homepage_projects", filter: f.key, label: f.label, locale })}
                  className={`relative min-w-0 flex-1 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 cursor-pointer sm:flex-none sm:px-5 sm:text-sm ${
                    filter === f.key
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <Link
              href={`${prefix}/projects`}
              data-ph-event="cta_clicked"
              data-ph-props={JSON.stringify({ area: "homepage_projects", cta_type: "view_all_projects", label: viewAll, href: `${prefix}/projects`, locale })}
              className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium hidden sm:flex items-center gap-1 underline underline-offset-4 decoration-slate-400/30 hover:decoration-indigo-400/50"
            >
              {viewAll}
              <IconScoutIcon name="arrowUpRight" size={17} />
            </Link>
          </div>
        </div>

        {/* ── Uniform grid (Finsweet style) ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-16"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              href={`${prefix}/projects/${project.slug}`}
              categoryLabel={getCategoryLabel(project.category, categoryLabels)}
              tone={getProjectTone(project.category)}
              trailingIcon={<IconScoutIcon name="arrowRight" size={24} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
