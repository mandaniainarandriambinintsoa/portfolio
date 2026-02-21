import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID?.trim();

function getAnalyticsClient() {
  const rawKey = process.env.GA4_PRIVATE_KEY?.trim() || "";
  // Handle both escaped \n (from .env files) and real newlines (from Vercel)
  const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL?.trim(),
      private_key: privateKey,
    },
  });
}

export type VisitorGA4 = {
  city: string;
  country: string;
  countryCode: string;
  minutesAgo: number;
};

export async function GET() {
  if (!propertyId || !process.env.GA4_CLIENT_EMAIL || !process.env.GA4_PRIVATE_KEY) {
    return NextResponse.json({ visitors: [], activeUsers: 0 });
  }

  try {
    const client = getAnalyticsClient();

    const [response] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [
        { name: "city" },
        { name: "country" },
        { name: "countryId" },
        { name: "minutesAgo" },
      ],
      metrics: [{ name: "activeUsers" }],
      limit: 15,
    });

    const visitors: VisitorGA4[] = [];
    let totalActiveUsers = 0;

    if (response.rows) {
      for (const row of response.rows) {
        const city = row.dimensionValues?.[0]?.value || "Inconnu";
        const country = row.dimensionValues?.[1]?.value || "Inconnu";
        const countryCode = row.dimensionValues?.[2]?.value || "";
        const minutesAgo = parseInt(row.dimensionValues?.[3]?.value || "0", 10);
        const users = parseInt(row.metricValues?.[0]?.value || "0", 10);

        totalActiveUsers += users;

        visitors.push({ city, country, countryCode, minutesAgo });
      }
    }

    return NextResponse.json(
      { visitors, activeUsers: totalActiveUsers },
      {
        headers: {
          "Cache-Control": "s-maxage=30, stale-while-revalidate=15",
        },
      }
    );
  } catch (err) {
    console.error("GA4 Realtime API error:", err);
    return NextResponse.json({ visitors: [], activeUsers: 0 }, { status: 200 });
  }
}
