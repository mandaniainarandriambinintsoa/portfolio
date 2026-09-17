import { NextResponse } from "next/server";
import { getLatestVisitors } from "@/lib/neon/visitors";
import type { VisitorFeedResponse } from "@/lib/visitor-data";

export async function GET() {
  try {
    const visitors = await getLatestVisitors();
    const response: VisitorFeedResponse = { visitors, available: true };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Vercel-CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Visitor feed unavailable", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    const response: VisitorFeedResponse = { visitors: [], available: false };
    return NextResponse.json(response, {
      status: 503,
      headers: {
        "Cache-Control": "private, no-store",
        "Retry-After": "60",
      },
    });
  }
}
