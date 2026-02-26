"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { gsap as GsapType } from "gsap";
import type { Locale } from "@/i18n/config";
import type { ProjectItem, ProjectCategory } from "@/lib/types";

type FilterType = "all" | ProjectCategory;

/*
 * 2-column bento layout:
 *
 *  [──────── FACTUMATION hero (col-span-2) ────────]
 *  [ScalApp]                [ImmoPrive row-span-2]
 *  [Yalee Creek]            [                    ]
 *  [Alchiimy row-span-2]   [Artigen]
 *  [                    ]   [Scraping]
 *  [──────── Tracking (col-span-2) ────────]
 */

/** Reorder: Factumation hero → Artigen 2nd → … → ScalApp last */
function reorderForBento(items: ProjectItem[]): ProjectItem[] {
  const order = ["factumation", "artigen"];
  const last = ["scalapp"];
  const copy = [...items];
  const front: ProjectItem[] = [];
  const back: ProjectItem[] = [];

  // Pull out explicitly ordered items
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

/** Layout config per index for the full 8-item bento */
const LAYOUT: Record<number, { span: string; size: "hero" | "tall" | "wide" | "normal" }> = {
  0: { span: "col-span-2 row-span-2", size: "hero" },   // Factumation — full-width hero
  1: { span: "", size: "normal" },                        // Artigen
  2: { span: "row-span-2", size: "tall" },                // ImmoPrive
  3: { span: "", size: "normal" },                        // Yalee Creek
  4: { span: "row-span-2", size: "tall" },                // Alchiimy
  5: { span: "", size: "normal" },                        // Scraping
  6: { span: "", size: "normal" },                        // Tracking
  7: { span: "col-span-2", size: "wide" },                // ScalApp — full-width bottom
};

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
  categoryLabels: { webapp: string; workflow: string };
}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<typeof GsapType | null>(null);
  const prefix = locale === "fr" ? "" : "/en";
  const allLabel = locale === "fr" ? "Tous" : "All";

  const filtered = useMemo(() => {
    const base =
      filter === "all" ? items : items.filter((p) => p.category === filter);
    return filter === "all" ? reorderForBento(base) : base;
  }, [filter, items]);

  const isBentoLayout = filter === "all" && filtered.length >= 6;

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
      // Initial state
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.92 });

      // Staggered scroll reveal
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });

      // Parallax on card images
      cards.forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [filter, gsapRef.current]);

  /* ── Hover tilt effect ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    // Move the glow
    const glow = card.querySelector<HTMLElement>(".card-glow");
    if (glow) {
      gsap.to(glow, {
        x: x * 60,
        y: y * 60,
        opacity: 1,
        duration: 0.4,
      });
    }
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const card = e.currentTarget;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    const glow = card.querySelector<HTMLElement>(".card-glow");
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    }
  }, []);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: allLabel },
    { key: "webapp", label: categoryLabels.webapp },
    { key: "workflow", label: categoryLabels.workflow },
  ];

  return (
    <section ref={sectionRef} id="projects" className="w-full mb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header + Filters ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
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
              className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium hidden sm:flex items-center gap-1 underline underline-offset-4 decoration-slate-400/30 hover:decoration-indigo-400/50"
            >
              {viewAll}
              <span className="material-symbols-outlined text-base">
                north_east
              </span>
            </Link>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div
          ref={gridRef}
          className={`grid gap-4 ${
            isBentoLayout
              ? "grid-cols-1 sm:grid-cols-2 auto-rows-[220px] sm:auto-rows-[240px]"
              : "grid-cols-1 sm:grid-cols-2 auto-rows-[240px] sm:auto-rows-[260px]"
          }`}
          style={{ gridAutoFlow: "dense", perspective: "1200px" }}
        >
          {filtered.map((project, i) => {
            const layout = isBentoLayout ? LAYOUT[i] : undefined;
            const size = layout?.size ?? "normal";
            const span = layout?.span ?? "";
            const isHero = size === "hero";
            const isTall = size === "tall";
            const isWide = size === "wide";
            const isWorkflow = project.category === "workflow";
            const showDesc = isHero || isTall || isWide;

            return (
              <Link
                key={project.slug}
                href={`${prefix}/projects/${project.slug}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`project-card group relative overflow-hidden rounded-3xl border transition-all duration-500 will-change-transform ${
                  isHero
                    ? "border-indigo-500/15 hover:border-indigo-400/30"
                    : isWorkflow
                      ? "border-white/[0.06] hover:border-emerald-500/20"
                      : "border-white/[0.06] hover:border-white/[0.12]"
                } ${span}`}
              >
                {/* Background image with overflow for parallax */}
                <div className="absolute inset-[-10%] z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={
                      isHero || isWide
                        ? "(min-width: 640px) 100vw, 100vw"
                        : "(min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 z-[1] ${
                    isHero
                      ? "bg-gradient-to-t from-black via-black/60 to-black/20"
                      : "bg-gradient-to-t from-black/95 via-black/40 to-black/10"
                  }`}
                />

                {/* Interactive glow that follows cursor */}
                <div
                  className={`card-glow absolute z-[2] w-[300px] h-[300px] rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 blur-[80px] ${
                    isWorkflow
                      ? "bg-emerald-500/20"
                      : "bg-indigo-500/20"
                  }`}
                />

                {/* Hero accent line */}
                {isHero && (
                  <div className="absolute top-0 inset-x-0 h-[1px] z-[3] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                )}

                {/* Arrow indicator */}
                <div className="absolute top-5 right-5 z-10 size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-lg text-white/80">
                    north_east
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 transition-transform duration-500 translate-y-2 group-hover:translate-y-0 ${
                    isHero ? "p-8 sm:p-10" : "p-6 sm:p-7"
                  }`}
                >
                  {/* Badges */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span
                      className={`px-3 py-1 backdrop-blur-sm rounded-full text-[10px] font-semibold tracking-wider uppercase text-white ${
                        isWorkflow ? "bg-emerald-500/60" : "bg-indigo-500/60"
                      }`}
                    >
                      {isWorkflow
                        ? categoryLabels.workflow
                        : categoryLabels.webapp}
                    </span>
                    {project.tags
                      .slice(0, showDesc ? 3 : 2)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/8 backdrop-blur-sm rounded-full text-[10px] font-medium tracking-wider uppercase text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold leading-tight ${
                      isHero
                        ? "text-2xl sm:text-3xl md:text-4xl"
                        : showDesc
                          ? "text-xl sm:text-2xl"
                          : "text-base sm:text-lg"
                    }`}
                  >
                    {project.subtitle}
                  </h3>

                  {/* Description */}
                  {showDesc && (
                    <p
                      className={`text-slate-400 line-clamp-2 mt-3 ${
                        isHero
                          ? "text-base sm:text-lg max-w-2xl"
                          : "text-sm max-w-md"
                      }`}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
