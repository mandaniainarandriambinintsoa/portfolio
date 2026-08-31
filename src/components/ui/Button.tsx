import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "glass";
  href?: string;
  target?: "_blank" | "_self";
  rel?: string;
  children: React.ReactNode;
  className?: string;
  analytics?: {
    event: string;
    properties?: Record<string, string | number | boolean | null | undefined>;
  };
};

export default function Button({
  variant = "primary",
  href,
  target,
  rel,
  children,
  className = "",
  analytics,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-5 font-bold rounded-xl md:rounded-2xl transition-all cursor-pointer text-sm md:text-base";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
    glass:
      "glass-card hover:bg-white/5 text-white font-medium border-white/10",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={cls}
        data-ph-event={analytics?.event}
        data-ph-props={analytics ? JSON.stringify({ ...analytics.properties, href }) : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      data-ph-event={analytics?.event}
      data-ph-props={analytics ? JSON.stringify(analytics.properties ?? {}) : undefined}
    >
      {children}
    </button>
  );
}
