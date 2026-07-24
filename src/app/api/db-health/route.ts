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
    socket.once("error", (error) => done(false, error.code || error.message));
  });
}

export async function GET() {
  const database = sanitizeDatabaseURL();

  if (!database || "parseError" in database) {
    return NextResponse.json({ database, tcp: null });
  }

  const tcp = await testTCP(database.host, Number(database.port));

  return NextResponse.json({
    database,
    region: process.env.VERCEL_REGION,
    tcp,
  });
}
