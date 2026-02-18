import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "glass";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  icon,
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
      <Link href={href} className={cls}>
        {children}
        {icon && (
          <span className="material-symbols-outlined text-xl">{icon}</span>
        )}
      </Link>
    );
  }

  return (
    <button className={cls}>
      {children}
      {icon && (
        <span className="material-symbols-outlined text-xl">{icon}</span>
      )}
    </button>
  );
}
