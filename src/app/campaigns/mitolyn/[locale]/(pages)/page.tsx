// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
/**
 * @file Server Component Entry Point for Mitolyn Bridge Page
 * @description This file is the main server-side entry point for the route.
 * It handles metadata generation and data fetching, then passes the
 * necessary props to the client component for rendering.
 *
 * @author Your Name
 * @version 2.1.0
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
 * @param {{ params: { locale: string } }} props The component props containing URL params.
 * @returns {Promise<Metadata>} The metadata object for the page.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = mitolynConfig.locales[locale];
  return content?.metadata || {};
}

/**
 * The main server component for the bridge page.
 * @param {{ params: { locale: string } }} props The component props containing URL params.
 */
export default function MitolynLocaleBridgePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
