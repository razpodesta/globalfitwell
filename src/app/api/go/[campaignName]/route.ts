// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL. It fetches the
 * target URL from environment variables for security.
 *
 * @author Your Name
 * @version 2.1.0
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles GET requests to this dynamic route.
 * @param _request - The incoming Next.js request object.
 * @param context - The context object containing URL parameters.
 * @returns A Next.js response object that redirects the user.
 */
export async function GET(
  _request: NextRequest,
  // CORRECCIÓN FINAL: Se recibe el contexto como un objeto y se desestructura adentro.
  // Esto evita que el analizador de tipos de Next.js falle en la firma de la función.
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
    return NextResponse.redirect(new URL("/", _request.url));
  }

  // 2. Redirección 307 (Temporal)
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
