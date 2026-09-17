export function validateVisitorDatabaseUrl(connectionString: string | undefined): string {
  const normalizedConnectionString = connectionString?.trim();
  if (!normalizedConnectionString) {
    throw new Error("Visitor Neon database is not configured");
  }

  let url: URL;
  try {
    url = new URL(normalizedConnectionString);
  } catch {
    throw new Error("Visitor database connection string is invalid");
  }

  if (!["postgres:", "postgresql:"].includes(url.protocol)) {
    throw new Error("Visitor database must use PostgreSQL");
  }

  if (!url.hostname.endsWith(".neon.tech")) {
    throw new Error("Visitor database must be a dedicated Neon database");
  }

  const sslMode = url.searchParams.get("sslmode");
  if (sslMode !== "require" && sslMode !== "verify-full") {
    throw new Error("Visitor database must require TLS");
  }

  return normalizedConnectionString;
}
