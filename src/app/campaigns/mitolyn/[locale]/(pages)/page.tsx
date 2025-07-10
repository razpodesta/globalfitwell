// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
/**
 * @file Server Component Entry Point for Mitolyn Bridge Page
 * @description Handles metadata generation and data fetching, adopting the
 * required `async` signature for Next.js 15 functions that
 * consume dynamic route parameters.
 *
 * @author L.I.A Legacy
 * @version 2.4.0 (Production Ready - Async Fix)
 * @since 2.1.0
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mitolynConfig } from "../../campaign.config";
import MitolynBridgePageClient from "./page.client";

/**
 * Generates static paths for each supported locale at build time.
 * @returns {Promise<{ locale: string; }[]>} An array of params for static generation.
 */
export async function generateStaticParams() {
  return Object.keys(mitolynConfig.locales).map((locale) => ({
    locale,
  }));
}

/**
 * Generates dynamic metadata for the page based on the current locale.
 * Declared as `async` to satisfy Next.js 15 type constraints.
 *
 * @param {object} props - The props containing the dynamic route parameters.
 * @param {object} props.params - The dynamic route parameters.
 * @param {string} props.params.locale - The locale code from the URL.
 * @returns {Promise<Metadata>} The metadata object for the page.
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const content = mitolynConfig.locales[locale];
  return content?.metadata || {};
}

/**
 * The main server component for the bridge page.
 * Declared as `async` to satisfy the Next.js 15 PageProps constraint.
 *
 * @param {object} props - The props containing the dynamic route parameters.
 * @param {object} props.params - The dynamic route parameters.
 * @param {string} props.params.locale - The locale code from the URL.
 * @returns {Promise<React.ReactElement>} A promise resolving to the rendered client component.
 */
export default async function MitolynLocaleBridgePage({
  params,
}: {
  params: { locale: string };
}) {
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
