import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let client: ReturnType<typeof createClient<Database>> | null = null;

export function createBrowserClient() {
  if (!client) {
    client = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
