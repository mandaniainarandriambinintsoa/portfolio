export function isPayloadRemoteContentEnabled(): boolean {
  if (process.env.PAYLOAD_SKIP_REMOTE_CONTENT === "true") return false;
  if (process.env.PAYLOAD_REMOTE_CONTENT_ENABLED === "true") return true;

  // Keep local CMS experimentation convenient, but make production reads opt-in.
  return process.env.NODE_ENV !== "production";
}

export function isPayloadSitemapEnabled(): boolean {
  return (
    isPayloadRemoteContentEnabled() &&
    process.env.PAYLOAD_SKIP_SITEMAP_CMS !== "true"
  );
}
