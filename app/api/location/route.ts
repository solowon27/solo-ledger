import { NextResponse } from "next/server";

export async function GET(
  request: Request
) {
  const headers = request.headers;

  /**
   * Vercel
   */
  const vercelCountry =
    headers.get("x-vercel-ip-country");

  /**
   * Cloudflare
   */
  const cloudflareCountry =
    headers.get("cf-ipcountry");

  /**
   * Common proxy/CDN header.
   */
  const forwardedCountry =
    headers.get(
      "x-country-code"
    );

  const country =
    vercelCountry ||
    cloudflareCountry ||
    forwardedCountry ||
    null;

  return NextResponse.json(
    {
      country:
        country?.toLowerCase() ??
        null,
    },
    {
      headers: {
        "Cache-Control":
          "private, no-store",
      },
    }
  );
}