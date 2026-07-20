"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = { label: string; href: string };

export default function HeaderClient({
  locale,
  navLinks,
  contactLabel,
  contactHref,
}: {
  locale: string;
  navLinks: NavLink[];
  contactLabel: string;
  contactHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-4" : "py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={locale === "fr" ? "/" : "/en"}
            className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white"
            data-ph-event="nav_clicked"
            data-ph-props={JSON.stringify({ area: "header", item: "logo", locale })}
          >
            <Image
              src="/images/logo-manda-dark.svg"
              alt="Logo Manda"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            MANDA<span className="text-indigo-500">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30"
                data-ph-event="nav_clicked"
                data-ph-props={JSON.stringify({ area: "header_desktop", item: item.label, href: item.href, locale })}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
            <Link
              href={contactHref}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              data-ph-event="cta_clicked"
              data-ph-props={JSON.stringify({ area: "header_desktop", cta_type: "contact", label: contactLabel, href: contactHref, locale })}
            >
              {contactLabel}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050507]/95 backdrop-blur-xl pt-28 px-8 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
              data-ph-event="nav_clicked"
              data-ph-props={JSON.stringify({ area: "header_mobile", item: item.label, href: item.href, locale })}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <LanguageSwitcher locale={locale} />
            <Link
              href={contactHref}
              className="px-6 py-3 bg-indigo-600 rounded-xl text-sm font-bold text-white"
              onClick={() => setMobileOpen(false)}
              data-ph-event="cta_clicked"
              data-ph-props={JSON.stringify({ area: "header_mobile", cta_type: "contact", label: contactLabel, href: contactHref, locale })}
            >
              {contactLabel}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
