import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import type { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<unknown>;
};

const getHandler = REST_GET(config);
const postHandler = REST_POST(config);
const deleteHandler = REST_DELETE(config);
const patchHandler = REST_PATCH(config);
const putHandler = REST_PUT(config);
const optionsHandler = REST_OPTIONS(config);

function payloadContext(context: RouteContext) {
  return context as {
    params: Promise<{ slug?: string[] }>;
  };
}

export const GET = (request: NextRequest, context: RouteContext) =>
  getHandler(request, payloadContext(context));

export const POST = (request: NextRequest, context: RouteContext) =>
  postHandler(request, payloadContext(context));

export const DELETE = (request: NextRequest, context: RouteContext) =>
  deleteHandler(request, payloadContext(context));

export const PATCH = (request: NextRequest, context: RouteContext) =>
  patchHandler(request, payloadContext(context));

export const PUT = (request: NextRequest, context: RouteContext) =>
  putHandler(request, payloadContext(context));

export const OPTIONS = (request: NextRequest, context: RouteContext) =>
  optionsHandler(request, payloadContext(context));
