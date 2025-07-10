// RUTA: src/app/(dev)/developers/branding/preview/page.tsx
/**
 * @file Campaign Preview Page
 * @description This page is rendered inside an iframe in the Campaign Design Suite.
 * It receives the entire campaign state via URL search parameters, decodes them,
 * and renders a complete, fully-styled page preview. It dynamically selects the
 * correct page component and applies the specified theme.
 * @devonly
 */
"use client";

import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MitolynBridgePage from "@/app/campaigns/mitolyn/[locale]/(pages)/page";
import MitolynReviewPage from "@/app/campaigns/mitolyn/[locale]/(pages)/review/page";
import { labCampaigns, fontOptions, FontName } from "../lab.config";
import { CampaignConfig, CampaignTheme } from "@/lib/types/campaign.d";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type PageType = "bridge" | "review" | "blog";

interface PreviewLayoutProps {
  config: CampaignConfig;
  children: React.ReactNode;
  theme: CampaignTheme;
}

// Define un tipo base para las props de las páginas que se pueden previsualizar
type PreviewablePageProps = {
  params: { locale: string };
};

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
    config, // Necesitamos pasar el config al layout
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

    const pageProps = { params: { locale } };

    // CORRECCIÓN: Se utiliza un tipo de props explícito en lugar de 'any'
    const pageComponentMapping: Record<
      PageType,
      React.ComponentType<PreviewablePageProps>
    > = {
      bridge: MitolynBridgePage,
      review: MitolynReviewPage,
      blog: () => (
        <div className="p-8 text-center">Blog Preview (Work in Progress)</div>
      ),
    };

    return {
      PageToPreview: pageComponentMapping[pageType],
      pageProps,
      fontClass: fontOptions[font]?.className || "",
      fontSize,
      dynamicTheme,
      config: baseConfig, // Devolvemos el config para usarlo en el layout
    };
  }, [searchParams]);

  useEffect(() => {
    document.body.className = `font-sans ${fontClass}`;
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontClass, fontSize]);

  if (!PageToPreview) {
    return <div>Loading Preview...</div>;
  }

  // CORRECCIÓN: Pasamos el objeto 'config' correcto al PreviewLayout
  return (
    <PreviewLayout config={config} theme={dynamicTheme}>
      <PageToPreview {...pageProps} />
    </PreviewLayout>
  );
}
