// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL. It fetches the
 * target URL from environment variables for security.
 *
 * @author L.I.A Legacy
 * @version 2.3.1
 * @since 2.3.0
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles GET requests to this dynamic route. It infers the type for the
 * `context` parameter directly from Next.js's route handler signature to
 * ensure build-time type compatibility.
 *
 * @param {NextRequest} _request - The incoming Next.js request object (unused).
 * @param {object} context - The context object containing URL parameters.
 * @param {object} context.params - The dynamic route parameters.
 * @param {string} context.params.campaignName - The name of the campaign extracted from the URL.
 * @returns {Promise<NextResponse>} A Next.js response object that redirects the user.
 * @throws Will not throw an error, but will log a critical error to the console if the environment variable is missing and redirect to the homepage.
 * @example
 * ```
 * // A GET request to /api/go/mitolyn
 * // will trigger this function with context.params.campaignName = "mitolyn"
 * ```
 */
export async function GET(
  _request: NextRequest,
  context: { params: { campaignName: string } }
) {
  const { campaignName } = context.params;

  // Construye dinámicamente el nombre de la variable de entorno.
  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  const affiliateUrl = process.env[envVarName];

  // 1. Verificar si la URL de afiliado está configurada en las variables de entorno.
  if (!affiliateUrl) {
    console.error(
      `CRITICAL: Affiliate URL environment variable "${envVarName}" is not set.`
    );
    // Redirige a la página principal por defecto si la configuración no existe.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";
    return NextResponse.redirect(new URL("/", siteUrl));
  }

  // 2. Redirección 307 (Temporal) para mantener el método de la petición.
  // Es la mejor práctica para redirecciones de "cloaking".
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
// RUTA: src/app/api/go/[campaignName]/route.ts
