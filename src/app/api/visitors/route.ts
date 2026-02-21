import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID;

function getAnalyticsClient() {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL,
      private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  });
}

export type VisitorGA4 = {
  city: string;
  country: string;
  countryCode: string;
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
        const users = parseInt(row.metricValues?.[0]?.value || "0", 10);

        totalActiveUsers += users;

        // One entry per row (each city/country combo)
        visitors.push({ city, country, countryCode });
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GA4 Realtime API error:", message);
    return NextResponse.json(
      { visitors: [], activeUsers: 0, debug: { error: message, hasKey: !!process.env.GA4_PRIVATE_KEY, hasEmail: !!process.env.GA4_CLIENT_EMAIL, propertyId } },
      { status: 200 }
    );
  }
}
