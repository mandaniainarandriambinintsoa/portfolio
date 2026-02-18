"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import GlassCard from "@/components/ui/GlassCard";
import type { BlogPost } from "@/lib/data/blog";

type BlogListingClientProps = {
  posts: BlogPost[];
  prefix: string;
  allTags: string[];
  labels: {
    all: string;
    readMore: string;
    minRead: string;
    noPosts: string;
  };
};

export default function BlogListingClient({
  posts,
  prefix,
  allTags,
  labels,
}: BlogListingClientProps) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeTag === "all"
      ? posts
      : posts.filter((p) => p.tags.includes(activeTag));

  const animateCards = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".blog-card");
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
  }, { dependencies: [activeTag], scope: gridRef });

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(prefix === "" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {/* Tag filters */}
      <div className="flex gap-3 mb-10 flex-wrap">
        <button
          onClick={() => setActiveTag("all")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTag === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {labels.all}
          <span className="ml-2 text-xs opacity-60">{posts.length}</span>
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTag === tag
                ? "bg-indigo-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tag}
            <span className="ml-2 text-xs opacity-60">
              {posts.filter((p) => p.tags.includes(tag)).length}
            </span>
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">{labels.noPosts}</p>
          </div>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              className="blog-card group"
            >
              <GlassCard
                noPadding
                className="h-full overflow-hidden hover:bg-white/5 transition-colors"
              >
                {/* Cover image or gradient placeholder */}
                <div className="relative h-48 overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-emerald-600/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Reading time badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-600 text-white">
                    {post.readingTime} {labels.minRead}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-indigo-600/20 border border-indigo-500/30 rounded text-[10px] font-bold tracking-wider uppercase text-indigo-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer: date + read more */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <time dateTime={post.publishedAt ?? undefined}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                      {labels.readMore}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
