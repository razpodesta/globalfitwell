// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mitolynConfig } from "../../campaign.config";
import MitolynBridgePageClient from "./page.client";

export async function generateStaticParams() {
  return Object.keys(mitolynConfig.locales).map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = mitolynConfig.locales[locale];
  return content?.metadata || {};
}

export default function MitolynLocaleBridgePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const content = mitolynConfig.locales[locale];
  if (!content) notFound();
  return (
    <MitolynBridgePageClient
      content={content}
      affiliateUrl={mitolynConfig.affiliateUrl}
    />
  );
}
