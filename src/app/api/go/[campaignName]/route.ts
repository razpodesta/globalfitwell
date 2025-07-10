// RUTA: src/app/api/go/[campaignName]/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: { campaignName: string } }
) {
  const { campaignName } = context.params;
  const envVarName = `${campaignName.toUpperCase()}_AFFILIATE_URL`;
  const affiliateUrl = process.env[envVarName];

  if (!affiliateUrl) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";
    return NextResponse.redirect(new URL("/", siteUrl));
  }

  return NextResponse.redirect(new URL(affiliateUrl), 307);
}
