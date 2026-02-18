export default function AdminHeader({ email }: { email: string }) {
  return (
    <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8">
      <h2 className="text-lg font-semibold text-white">Dashboard</h2>
      <span className="text-sm text-slate-400">{email}</span>
    </header>
  );
}
