"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import ProjectCard from "@/components/ui/ProjectCard";
import {
  getCategoryLabel,
  getProjectDestination,
  getProjectTone,
} from "@/lib/project-display";
import type { ProjectCategory, ProjectItem } from "@/lib/types";

type CategoryFilter = "all" | ProjectCategory;

type ProjectsListingProps = {
  items: ProjectItem[];
  prefix: string;
  categoryLabels: {
    all: string;
    webapp: string;
    workflow: string;
    siteMetier: string;
  };
};

export default function ProjectsListing({
  items,
  prefix,
  categoryLabels,
}: ProjectsListingProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((p) => p.category === activeFilter);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, { dependencies: [activeFilter], scope: gridRef });

  const filters: { key: CategoryFilter; label: string; color: string }[] = [
    { key: "all", label: categoryLabels.all, color: "bg-white/10 text-white" },
    { key: "site-metier", label: categoryLabels.siteMetier, color: "bg-amber-600 text-white" },
    { key: "webapp", label: categoryLabels.webapp, color: "bg-indigo-600 text-white" },
    { key: "workflow", label: categoryLabels.workflow, color: "bg-emerald-600 text-white" },
  ];

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-3 mb-12 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            data-ph-event="project_filter_changed"
            data-ph-props={JSON.stringify({ area: "projects_listing", filter: f.key, label: f.label })}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeFilter === f.key
                ? f.color
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f.label}
            <span className="ml-2 text-xs opacity-60">
              {f.key === "all"
                ? items.length
                : items.filter((p) => p.category === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Projects grid — uniform 2 columns (Finsweet style) */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16"
      >
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={getProjectDestination(project.slug, prefix)}
            categoryLabel={getCategoryLabel(project.category, categoryLabels)}
            tone={getProjectTone(project.category)}
            showDescription
          />
        ))}
      </div>
    </>
  );
}
