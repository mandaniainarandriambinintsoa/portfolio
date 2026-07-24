import net from "node:net";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function sanitizeDatabaseURL() {
  const raw = process.env.PAYLOAD_DATABASE_URI || process.env.DATABASE_URI || process.env.POSTGRES_URL;
  if (!raw) return null;

  try {
    const url = new URL(raw.replace(/^["']|["']$/g, ""));
    return {
      host: url.hostname,
      port: url.port || "5432",
      protocol: url.protocol,
      usernameShape: url.username.replace(/[^.]/g, "x"),
    };
  } catch {
    return { parseError: true };
  }
}

function testTCP(host: string, port: number) {
  return new Promise<{ ok: boolean; ms: number; error?: string }>((resolve) => {
    const started = Date.now();
    const socket = net.createConnection({ host, port });
    const done = (ok: boolean, error?: string) => {
      socket.destroy();
      resolve({ ok, ms: Date.now() - started, error });
    };
    socket.setTimeout(10000);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false, "timeout"));
    socket.once("error", (error) => {
      const code = "code" in error && typeof error.code === "string" ? error.code : error.message;
      done(false, code);
    });
  });
}

export async function GET() {
  const database = sanitizeDatabaseURL();

  if (!database || "parseError" in database) {
    return NextResponse.json({ database, tcp: null });
  }

  const tcp = await testTCP(database.host, Number(database.port));
  const pgStarted = Date.now();
  let pg: { ok: boolean; ms: number; error?: string } | null = null;

  try {
    const importModule = new Function("specifier", "return import(specifier)") as (
      specifier: string,
    ) => Promise<{ Pool: new (config: Record<string, unknown>) => { end: () => Promise<void>; query: (sql: string) => Promise<unknown> } }>;
    const { Pool } = await importModule("pg");
    const pool = new Pool({
      allowExitOnIdle: true,
      connectionString: process.env.PAYLOAD_DATABASE_URI,
      connectionTimeoutMillis: 30000,
      idleTimeoutMillis: 500,
      max: 1,
      ssl: { rejectUnauthorized: false },
    });
    try {
      await pool.query("select 1 as ok");
      pg = { ok: true, ms: Date.now() - pgStarted };
    } finally {
      await pool.end();
    }
  } catch (error) {
    pg = {
      ok: false,
      ms: Date.now() - pgStarted,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return NextResponse.json({
    database,
    pg,
    region: process.env.VERCEL_REGION,
    tcp,
  });
}
