// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL. Includes console
 * verification for deployment validation.
 *
 * @author L.I.A Legacy
 * @version 2.5.0 (Production Ready with Verification)
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
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_request: NextRequest, context: any) {
  const { params } = context;
  const { campaignName } = params;

  // --- INICIO DE VERIFICACIÓN POR CONSOLA (L.I.A. Legacy) ---
  console.log(
    `[L.I.A. VERIFICATION] API Route /api/go invoked for campaign: "${campaignName}"`
  );

  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  console.log(
    `[L.I.A. VERIFICATION] Constructed Environment Variable Name: "${envVarName}"`
  );
  // --- FIN DE VERIFICACIÓN POR CONSOLA ---

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
