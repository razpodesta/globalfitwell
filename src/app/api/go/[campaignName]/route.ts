// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL. It fetches the
 * target URL from environment variables for security.
 *
 * @author Your Name
 * @version 2.0.0
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles GET requests to this dynamic route.
 * @param _request - The incoming Next.js request object.
 * @param params - The dynamic route parameters.
 * @param params.campaignName - The name of the campaign from the URL.
 * @returns A Next.js response object that redirects the user.
 */
export async function GET(
  _request: NextRequest,
  // CORRECCIÓN: Se utiliza la firma de tipo en línea esperada por Next.js.
  { params }: { params: { campaignName: string } }
) {
  const { campaignName } = params;

  // Construye dinámicamente el nombre de la variable de entorno.
  // Ejemplo: para la campaña "mitolyn", busca "MITOLYN_AFFILIATE_URL".
  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  const affiliateUrl = process.env[envVarName];

  // 1. Verificar si la URL de afiliado está configurada en las variables de entorno.
  if (!affiliateUrl) {
    console.error(
      `CRITICAL: Affiliate URL environment variable "${envVarName}" is not set.`
    );
    // Redirige a la página principal si la configuración no existe.
    return NextResponse.redirect(new URL("/", _request.url));
  }

  // 2. Redirección 307 (Temporal)
  // Ideal para cloaking, indica que el recurso está temporalmente en otra URL.
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
