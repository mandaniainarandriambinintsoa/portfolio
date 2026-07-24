import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <div className="mesh-gradient-bg" aria-hidden="true" />
      <div className="text-center">
        <h1 className="text-[200px] font-extrabold tracking-tighter leading-none gradient-text opacity-20 mb-0">
          404
        </h1>
        <p className="text-2xl font-bold text-white mb-2 -mt-8">
          Page introuvable / Page not found
        </p>
        <p className="text-slate-400 mb-8">
          Cette page n&apos;existe pas. / This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all"
        >
          Retour / Home
        </Link>
      </div>
    </main>
  );
}
