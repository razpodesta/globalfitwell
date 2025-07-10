// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
/**
 * @file Server Component Entry Point for Mitolyn Bridge Page
 * @description This file handles metadata generation and data fetching, adopting
 * Next.js 15 patterns for handling dynamic route parameters.
 *
 * @author L.I.A Legacy
 * @version 2.3.0 (Production Ready)
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
 * @param {object} props - The props containing the dynamic route parameters.
 * @param {object} props.params - The dynamic route parameters.
 * @param {string} props.params.locale - The locale code from the URL.
 * @returns {React.ReactElement} The rendered client component with props.
 */
export default function MitolynLocaleBridgePage({
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
