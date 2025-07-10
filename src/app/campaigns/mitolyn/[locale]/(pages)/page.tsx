// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
/**
 * @file Server Component Entry Point for Mitolyn Bridge Page
 * @description Final, robust version to ensure Vercel build compatibility.
 * It uses explicit async signatures and awaits params where required by the
 * Next.js 15 build environment.
 *
 * @author L.I.A Legacy
 * @version 3.0.0 (Vercel Final Build Fix)
 * @since 2.1.0
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mitolynConfig } from "../../campaign.config";
import MitolynBridgePageClient from "./page.client";

// No changes needed here, this function is inherently async and correct.
export async function generateStaticParams() {
  return Object.keys(mitolynConfig.locales).map((locale) => ({
    locale,
  }));
}

/**
 * Generates dynamic metadata for the page based on the current locale.
 *
 * @param {object} props - The props containing the dynamic route parameters.
 * @returns {Promise<Metadata>} The metadata object for the page.
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Explicit await for maximum compatibility
  const awaitedParams = await params;
  const { locale } = awaitedParams;

  const content = mitolynConfig.locales[locale];
  return content?.metadata || {};
}

/**
 * The main server component for the bridge page.
 *
 * @param {object} props - The props containing the dynamic route parameters.
 * @returns {Promise<React.ReactElement>} A promise resolving to the rendered client component.
 */
export default async function MitolynLocaleBridgePage({
  params,
}: {
  params: { locale: string };
}) {
  // Explicit await for maximum compatibility
  const awaitedParams = await params;
  const { locale } = awaitedParams;

  const content = mitolynConfig.locales[locale];

  if (!content) {
    notFound();
  }

  // Pass the resolved, server-side content to the client component.
  return (
    <MitolynBridgePageClient
      content={content}
      affiliateUrl={mitolynConfig.affiliateUrl}
    />
  );
}
// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
