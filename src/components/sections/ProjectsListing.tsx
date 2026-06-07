"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import GlassCard from "@/components/ui/GlassCard";
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

  const animateCards = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, []);

  useGSAP(() => {
    animateCards();
  }, { dependencies: [activeFilter], scope: gridRef });

  const filters: { key: CategoryFilter; label: string; color: string }[] = [
    { key: "all", label: categoryLabels.all, color: "bg-white/10 text-white" },
    { key: "site-metier", label: categoryLabels.siteMetier, color: "bg-amber-600 text-white" },
    { key: "webapp", label: categoryLabels.webapp, color: "bg-indigo-600 text-white" },
    { key: "workflow", label: categoryLabels.workflow, color: "bg-emerald-600 text-white" },
  ];

  const categoryLabel = (category: ProjectCategory) => {
    if (category === "workflow") return categoryLabels.workflow;
    if (category === "site-metier") return categoryLabels.siteMetier;
    return categoryLabels.webapp;
  };

  const categoryClasses = (category: ProjectCategory) => {
    if (category === "workflow") {
      return {
        badge: "bg-emerald-600 text-white",
        subtitle: "text-emerald-400",
      };
    }

    if (category === "site-metier") {
      return {
        badge: "bg-amber-600 text-white",
        subtitle: "text-amber-400",
      };
    }

    return {
      badge: "bg-indigo-600 text-white",
      subtitle: "text-indigo-400",
    };
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
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

      {/* Projects grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((project) => {
          const tone = categoryClasses(project.category);

          return (
            <Link
              key={project.slug}
              href={`${prefix}/projects/${project.slug}`}
              className="project-card group"
            >
            <GlassCard
              noPadding
              className="h-full overflow-hidden hover:bg-white/5 transition-colors"
            >
              {/* Image thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.subtitle}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Category badge */}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${tone.badge}`}
                >
                  {categoryLabel(project.category)}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold mb-1">{project.title}</h2>
                <p className={`text-sm mb-3 ${tone.subtitle}`}>
                  {project.subtitle}
                </p>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 rounded text-xs font-bold tracking-wider uppercase text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
            </Link>
          );
        })}
      </div>
    </>
  );
}
