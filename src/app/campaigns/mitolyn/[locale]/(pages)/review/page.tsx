// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/review/page.tsx
/**
 * @file Server Component for the Mitolyn Review Page.
 * @description This component fetches the correct locale-based content and passes it
 * down to the client component for rendering. It is also responsible for
 * generating page metadata.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mitolynConfig } from "../../../campaign.config";
import MitolynReviewPageClient from "./page.client"; // CORRECCIÓN: Ruta de importación correcta.

/**
 * Generates dynamic metadata for the review page based on the current locale.
 * @param {{ params: { locale: string } }} props The component props.
 * @returns {Promise<Metadata>} The metadata object for the page.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = mitolynConfig.locales[locale]?.reviewPage.intro.openingQuestion;
  const description =
    mitolynConfig.locales[locale]?.reviewPage.intro.paragraphs[0];
  return {
    title: title || "Mitolyn In-Depth Review",
    description:
      description ||
      "A complete analysis of Mitolyn, its ingredients, and customer feedback.",
  };
}

/**
 * The main server component for the review page.
 * @param {{ params: { locale: string } }} props The component props.
 */
export default function MitolynReviewPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const content = mitolynConfig.locales[locale];

  // If content for the locale doesn't exist, trigger a 404 page.
  if (!content) {
    notFound();
  }

  return (
    <MitolynReviewPageClient
      content={content}
      affiliateUrl={mitolynConfig.affiliateUrl}
    />
  );
}
