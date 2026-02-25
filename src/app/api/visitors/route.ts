import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { createAdminClient } from "@/lib/supabase/admin";

const propertyId = process.env.GA4_PROPERTY_ID?.trim();

function getAnalyticsClient() {
  const rawKey = process.env.GA4_PRIVATE_KEY?.trim() || "";
  const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL?.trim(),
      private_key: privateKey,
    },
  });
}

export type VisitorRow = {
  city: string;
  country: string;
  country_code: string;
  created_at: string;
};

export async function GET() {
  const supabase = createAdminClient();

  // 1. Fetch GA4 Realtime visitors and insert new ones into Supabase
  if (propertyId && process.env.GA4_CLIENT_EMAIL && process.env.GA4_PRIVATE_KEY) {
    try {
      const client = getAnalyticsClient();

      const [response] = await client.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [
          { name: "city" },
          { name: "country" },
          { name: "countryId" },
        ],
        metrics: [{ name: "activeUsers" }],
        limit: 15,
      });

      if (response.rows) {
        // Deduplicate by city+country
        const seen = new Set<string>();
        const toInsert: { city: string; country: string; country_code: string }[] = [];

        for (const row of response.rows) {
          const city = row.dimensionValues?.[0]?.value || "Inconnu";
          const country = row.dimensionValues?.[1]?.value || "Inconnu";
          const countryCode = row.dimensionValues?.[2]?.value || "";
          const key = `${city}-${country}`;

          if (!seen.has(key)) {
            seen.add(key);
            toInsert.push({ city, country, country_code: countryCode });
          }
        }

        if (toInsert.length > 0) {
          // Avoid duplicates: don't re-insert same city+country within last 5 min
          for (const v of toInsert) {
            const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
            const { data: existing } = await supabase
              .from("visitor_logs")
              .select("id")
              .eq("city", v.city)
              .eq("country", v.country)
              .gte("created_at", fiveMinAgo)
              .limit(1);

            if (!existing || existing.length === 0) {
              await supabase.from("visitor_logs").insert(v);
            }
          }
        }
      }
    } catch (err) {
      console.error("GA4 Realtime API error:", err);
    }
  }

  // 2. Always return the 6 most recent visitors from Supabase
  const { data: visitors } = await supabase
    .from("visitor_logs")
    .select("city, country, country_code, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  return NextResponse.json(
    { visitors: visitors || [] },
    {
      headers: {
        "Cache-Control": "s-maxage=30, stale-while-revalidate=15",
      },
    }
  );
}
