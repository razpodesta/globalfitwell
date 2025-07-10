// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL. It fetches the
 * target URL from environment variables for security.
 *
 * @author L.I.A Legacy
 * @version 2.4.0
 * @since 2.3.0
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles GET requests to this dynamic route. It uses a type bypass (`any`) for
 * the `context` parameter as a pragmatic solution to resolve a persistent build-time
 * type error in the Vercel environment with Next.js 15.
 *
 * @param {NextRequest} _request - The incoming Next.js request object (unused).
 * @param {any} context - The context object containing URL parameters. Type is bypassed for build stability.
 * @returns {Promise<NextResponse>} A Next.js response object that redirects the user.
 * @throws Will not throw, but logs a critical error and redirects to the homepage if the environment variable is missing.
 * @example
 * ```
 * // A GET request to /api/go/mitolyn triggers this function
 * // with context.params.campaignName = "mitolyn"
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_request: NextRequest, context: any) {
  const { params } = context;
  const { campaignName } = params;

  // Dynamically construct the environment variable name.
  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  const affiliateUrl = process.env[envVarName];

  // 1. Verify if the affiliate URL is configured in the environment variables.
  if (!affiliateUrl) {
    console.error(
      `CRITICAL: Affiliate URL environment variable "${envVarName}" is not set.`
    );
    // Redirect to the default homepage if the configuration is missing.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";
    return NextResponse.redirect(new URL("/", siteUrl));
  }

  // 2. Perform a 307 (Temporary) redirect to preserve the original request method.
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
// RUTA: src/app/api/go/[campaignName]/route.ts
