// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description Final version using explicit await on params to ensure
 * compatibility with all Next.js 15 environments.
 *
 * @author L.I.A Legacy
 * @version 3.1.0 (Final Await Fix)
 * @since 2.3.0
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles GET requests to this dynamic route.
 * @param {NextRequest} _request The incoming Next.js request object.
 * @param {any} context The context object containing URL parameters.
 * @returns {Promise<NextResponse>} A promise resolving to the redirect response.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_request: NextRequest, context: any) {
  // CORRECCIÓN FINAL: Se usa 'await' explícitamente sobre el objeto params.
  const params = await context.params;
  const { campaignName } = params;

  console.log(
    `[L.I.A. VERIFICATION] API Route /api/go invoked for campaign: "${campaignName}"`
  );
  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  console.log(
    `[L.I.A. VERIFICATION] Constructed Environment Variable Name: "${envVarName}"`
  );

  const affiliateUrl = process.env[envVarName];

  if (!affiliateUrl) {
    console.error(
      `[CRITICAL FAILURE] Environment Variable "${envVarName}" NOT FOUND. Check Vercel project settings. Redirecting to homepage.`
    );
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";
    return NextResponse.redirect(new URL("/", siteUrl));
  }

  console.log(
    `[L.I.A. VERIFICATION] SUCCESS: Variable "${envVarName}" matched. Redirecting user.`
  );
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
// RUTA: src/app/api/go/[campaignName]/route.ts
