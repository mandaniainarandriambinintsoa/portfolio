import type { Locale } from "@/i18n/config";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer({
  locale,
  copyright,
}: {
  locale: Locale;
  copyright: string;
}) {
  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
        <p className="text-sm font-medium">{copyright}</p>
        <div className="flex gap-8">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-white transition-colors"
          >
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
