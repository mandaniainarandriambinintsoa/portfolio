"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { gsap as GsapType } from "gsap";

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
};

type TestimonialsDict = {
  title: string;
  items: TestimonialItem[];
  transmission_title: string;
  transmission_text: string;
  transmission_highlight: string;
  transmission_rest: string;
};

const AUTOPLAY_MS = 6000;

export default function Testimonials({ dict, locale }: { dict: TestimonialsDict; locale?: string }) {
  const [active, setActive] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const gsapRef = useRef<typeof GsapType | null>(null);
  const items = dict.items;

  // Lazy-load GSAP (keeps it out of initial bundle)
  useEffect(() => {
    import("gsap").then((mod) => {
      gsapRef.current = mod.default;
    });
  }, []);

  const animateIn = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap || !cardRef.current) return;
    const quote = cardRef.current.querySelector(".t-quote");
    const meta = cardRef.current.querySelector(".t-meta");
    const tl = gsap.timeline();
    tl.fromTo(
      quote,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    ).fromTo(
      meta,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const gsap = gsapRef.current;
      if (!gsap || !cardRef.current) return;
      const quote = cardRef.current.querySelector(".t-quote");
      const meta = cardRef.current.querySelector(".t-meta");
      gsap.to([quote, meta], {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActive(index);
        },
      });
    },
    []
  );

  // Animate in after active changes
  useEffect(() => {
    animateIn();
  }, [active, animateIn]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        const gsap = gsapRef.current;
        if (gsap && cardRef.current) {
          const quote = cardRef.current.querySelector(".t-quote");
          const meta = cardRef.current.querySelector(".t-meta");
          gsap.to([quote, meta], {
            opacity: 0,
            y: -10,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              setActive(next);
            },
          });
        }
        return prev; // Don't change yet, onComplete will
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [items.length]);

  const current = items[active];

  // Color accent per project
  const accentColors: Record<string, string> = {
    scalapp: "text-indigo-400",
    immoprive: "text-cyan-400",
    "yalee-creek-ranch": "text-amber-400",
    factumation: "text-emerald-400",
  };
  const dotColors: Record<string, string> = {
    scalapp: "bg-indigo-400",
    immoprive: "bg-cyan-400",
    "yalee-creek-ranch": "bg-amber-400",
    factumation: "bg-emerald-400",
  };

  return (
    <section className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      {/* Section title */}
      <h2 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mb-10">
        {dict.title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Testimonial card - takes 3 cols */}
        <div className="lg:col-span-3 relative">
          <div
            ref={cardRef}
            className="bg-white rounded-2xl p-8 md:p-10 text-black relative overflow-hidden min-h-[280px] flex flex-col justify-between"
          >
            {/* Big quote mark */}
            <div className="absolute top-6 left-8 text-7xl font-black text-black/[0.04] leading-none select-none pointer-events-none">
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote className="t-quote text-lg md:text-xl font-bold italic leading-relaxed mb-8 relative z-10">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author meta */}
            <div className="t-meta flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-black/[0.15] flex items-center justify-center">
                  <span className="text-lg font-bold text-black/60">
                    {current.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm">{current.author}</p>
                  <p className="text-xs text-black/70">
                    {current.role} — {current.company}
                  </p>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex items-center gap-1">
                {items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      clearInterval(timerRef.current);
                      if (i !== active) goTo(i);
                    }}
                    className="flex items-center justify-center min-w-6 min-h-6 cursor-pointer"
                    aria-label={`Testimonial ${i + 1}`}
                  >
                    <span
                      className={`block transition-all duration-300 rounded-full ${
                        i === active
                          ? `w-8 h-2.5 ${dotColors[item.project] ?? "bg-indigo-400"}`
                          : "w-2.5 h-2.5 bg-black/20 hover:bg-black/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Accent bar at top */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-500 ${
                dotColors[current.project]?.replace("bg-", "bg-") ?? "bg-indigo-400"
              }`}
            />
          </div>
        </div>

        {/* Transmission block - takes 2 cols */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-white/[0.06]">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400 mb-4 uppercase">
            {dict.transmission_title}
          </p>
          <p className="text-slate-300 leading-relaxed">
            {dict.transmission_text}{" "}
            <strong className="text-white">
              {dict.transmission_highlight}
            </strong>
            {dict.transmission_rest}
          </p>

          {/* Stats mini */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <div>
              <p className="text-2xl font-bold text-white">20+</p>
              <p className="text-xs text-slate-400 mt-1">
                {locale === "fr" ? "Projets livrés" : "Projects delivered"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400 mt-1">
                {locale === "fr" ? "Clients satisfaits" : "Client satisfaction"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
