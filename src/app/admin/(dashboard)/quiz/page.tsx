import { createServerClient } from "@/lib/supabase/server";
import QuizLeadsClient from "./QuizLeadsClient";

export default async function AdminQuizPage() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("quiz_leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Quiz Leads</h1>
        <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm font-semibold rounded-xl border border-indigo-500/30">
          {leads.length} lead{leads.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <QuizLeadsClient leads={leads} />
      </div>
    </div>
  );
}
