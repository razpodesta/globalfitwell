// RUTA: src/app/api/go/[campaignName]/route.ts
import { mitolynConfig } from "@/app/campaigns/mitolyn/campaign.config"; // RUTA CORREGIDA
import { NextResponse, type NextRequest } from "next/server";

const campaignConfigs: Record<string, { affiliateUrl: string }> = {
  mitolyn: mitolynConfig,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { campaignName: string } }
) {
  const { campaignName } = params;
  const config = campaignConfigs[campaignName];

  // 1. Verificar si la campaña existe en nuestra configuración
  if (!config) {
    console.error(`Campaña no encontrada: ${campaignName}`);
    return NextResponse.redirect(new URL("/", request.url)); // Fallback a la home
  }

  const affiliateUrl = config.affiliateUrl;

  // 2. Verificar si el enlace de afiliado está configurado para esa campaña
  if (!affiliateUrl || affiliateUrl === "/#") {
    console.error(
      `CRÍTICO: El enlace de afiliado para la campaña "${campaignName}" no está configurado en las variables de entorno.`
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Redirección 307 (Temporal)
  // Es ideal para cloaking, indicando que el recurso está temporalmente en otra URL.
  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
