// RUTA: src/app/(dev)/developers/branding/preview/page.tsx
/**
 * @file Campaign Preview Page
 * @description This page is rendered inside an iframe in the Campaign Design Suite.
 * It is dynamically rendered on the server at request time to handle URL search parameters.
 *
 * @author L.I.A Legacy
 * @version 1.1.0 (Dynamic Rendering Fix)
 */
"use client";

import MitolynBridgePageClient, {
  type MitolynBridgePageProps,
} from "@/app/campaigns/mitolyn/[locale]/(pages)/page.client";
import MitolynReviewPageClient from "@/app/campaigns/mitolyn/[locale]/(pages)/review/page.client";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { CampaignConfig, CampaignTheme } from "@/lib/types/campaign.d";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { FontName, fontOptions, labCampaigns } from "../lab.config";

// --- INICIO DE LA CORRECCIÓN ---
// Esta línea le indica a Next.js que esta página debe ser renderizada dinámicamente
// en el servidor en cada petición, en lugar de ser generada estáticamente en el build.
// Esto es necesario porque la página depende de 'useSearchParams()'.
export const dynamic = "force-dynamic";
// --- FIN DE LA CORRECCIÓN ---

type PageType = "bridge" | "review" | "blog";

interface PreviewLayoutProps {
  config: CampaignConfig;
  children: React.ReactNode;
  theme: CampaignTheme;
}

const PreviewLayout = ({ config, children, theme }: PreviewLayoutProps) => {
  const locale = Object.keys(config.locales)[0] || "en-US";
  const content = config.locales[locale];

  if (!content) return null;
  const { layout } = content;

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollingBanner
        message={layout.scrollingBannerText}
        style={{ background: theme.colors.scrollingBannerBg }}
      />
      <header
        className="sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: theme.colors.headerBg }}
      >
        <Header
          logoUrl={layout.header.logoUrl}
          ctaText={layout.header.ctaText}
          affiliateUrl={config.affiliateUrl}
        />
      </header>
      <main className="flex-grow bg-brand-bg-white">{children}</main>
      <footer style={{ backgroundColor: theme.colors.footerBg }}>
        <Footer
          {...layout.footer}
          ctaText={layout.header.ctaText}
          affiliateUrl={config.affiliateUrl}
        />
      </footer>
    </div>
  );
};

export default function PreviewPage() {
  const searchParams = useSearchParams();

  const {
    PageToPreview,
    pageProps,
    fontClass,
    fontSize,
    dynamicTheme,
    config,
  } = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const campaign =
      (params.get("campaign") as keyof typeof labCampaigns) || "mitolyn";
    const pageType = (params.get("pageType") as PageType) || "bridge";
    const font = (params.get("font") as FontName) || "Roboto Condensed";
    const fontSize = Number(params.get("fontSize")) || 16;

    const baseConfig = JSON.parse(JSON.stringify(labCampaigns[campaign]));
    const dynamicTheme = baseConfig.theme;
    const locale = Object.keys(baseConfig.locales)[0] || "en-US";
    const localeContent = baseConfig.locales[locale];

    if (params.get("heroTitle"))
      localeContent.bridgePage.hero.title = params.get("heroTitle");
    if (params.get("heroSubtitle"))
      localeContent.bridgePage.hero.subtitle = params.get("heroSubtitle");
    if (params.get("themeColors")) {
      dynamicTheme.colors = {
        ...dynamicTheme.colors,
        ...JSON.parse(params.get("themeColors")!),
      };
    }

    const pageProps = {
      content: localeContent,
      affiliateUrl: baseConfig.affiliateUrl,
    };

    const pageComponentMapping: Record<
      PageType,
      React.ComponentType<MitolynBridgePageProps>
    > = {
      bridge: MitolynBridgePageClient,
      review: MitolynReviewPageClient,
      blog: () => (
        <div className="p-8 text-center">Blog Preview (Work in Progress)</div>
      ),
    };

    return {
      PageToPreview: pageComponentMapping[pageType],
      pageProps: { ...pageProps },
      fontClass: fontOptions[font]?.className || "",
      fontSize,
      dynamicTheme,
      config: baseConfig,
    };
  }, [searchParams]);

  useEffect(() => {
    document.body.className = `font-sans ${fontClass}`;
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontClass, fontSize]);

  if (!PageToPreview) {
    return <div>Loading Preview...</div>;
  }

  return (
    <PreviewLayout config={config} theme={dynamicTheme}>
      <PageToPreview {...pageProps} />
    </PreviewLayout>
  );
}
// RUTA: src/app/(dev)/developers/branding/preview/page.tsx
