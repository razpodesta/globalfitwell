// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
/**
 * @file Server Component Entry Point for Mitolyn Bridge Page
 * @description Handles metadata generation and data fetching, adopting the
 * required `async` signature for Next.js 15 functions.
 *
 * @author L.I.A Legacy
 * @version 2.5.0 (Production Ready - Final Fix)
 * @since 2.1.0
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mitolynConfig } from "../../campaign.config";
import MitolynBridgePageClient from "./page.client";

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
  // CORRECCIÓN DEFINITIVA: Se desestructura 'locale' directamente.
  const { locale } = params;
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
  // CORRECCIÓN DEFINITIVA: Se desestructura 'locale' directamente.
  const { locale } = params;
  const content = mitolynConfig.locales[locale];

  if (!content) {
    notFound();
  }

  return (
    <MitolynBridgePageClient
      content={content}
      affiliateUrl={mitolynConfig.affiliateUrl}
    />
  );
}
// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
