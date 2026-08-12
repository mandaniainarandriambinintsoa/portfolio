import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload, type PayloadRequest } from "payload";

export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return new Response("Missing preview path.", { status: 400 });
  }

  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Preview path must be a relative URL.", { status: 400 });
  }

  let user;

  try {
    const authResult = await payload.auth({
      headers: req.headers,
      req: req as unknown as PayloadRequest,
    });
    user = authResult.user;
  } catch {
    user = null;
  }

  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response("You must be logged in to preview drafts.", { status: 403 });
  }

  draft.enable();
  redirect(path);
}
