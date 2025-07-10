// RUTA: src/app/api/go/[campaignName]/route.ts
/**
 * @file Dynamic Affiliate Link Redirector (Cloaking)
 * @description This API route handler dynamically redirects users to the correct
 * affiliate link based on the campaign name in the URL.
 *
 * @author Your Name
 * @version 1.1.0
 */
import { NextResponse, type NextRequest } from "next/server";
import { mitolynConfig } from "@/app/campaigns/mitolyn/campaign.config";

// Mapeo de campañas a sus configuraciones
const campaignConfigs: Record<string, { affiliateUrl: string }> = {
  mitolyn: mitolynConfig,
  // Futuras campañas se añadirán aquí
};

/**
 * @interface RouteContext
 * @description Defines the shape of the context object passed to the route handler,
 * which includes the dynamic URL parameters.
 */
interface RouteContext {
  params: {
    campaignName: string;
  };
}

/**
 * Handles GET requests to this route.
 * @param {NextRequest} _request - The incoming request object (precedido por guion bajo si no se usa).
 * @param {RouteContext} context - The context object containing URL parameters.
 * @returns {Promise<NextResponse>} A response object that redirects the user.
 */
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { campaignName } = params;
  const config = campaignConfigs[campaignName];

  if (!config) {
    console.error(`Campaign not found: ${campaignName}`);
    // Redirigir a la página principal por defecto si la campaña no existe
    return NextResponse.redirect(new URL("/", _request.url));
  }

  const affiliateUrl = config.affiliateUrl;

  if (!affiliateUrl || affiliateUrl === "/#") {
    console.error(
      `CRITICAL: Affiliate URL for campaign "${campaignName}" is not set.`
    );
    return NextResponse.redirect(new URL("/", _request.url));
  }

  // 307 Temporary Redirect: Ideal para cloaking, ya que indica que el recurso está
  // temporalmente en otra URL, preservando la URL original para futuras peticiones.
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
