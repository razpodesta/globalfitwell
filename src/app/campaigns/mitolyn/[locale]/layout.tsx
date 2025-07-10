// RUTA: src/app/campaigns/mitolyn/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { mitolynConfig } from "../campaign.config";

export default function MitolynLocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const content = mitolynConfig.locales[locale];
  const theme = mitolynConfig.theme;
  if (!content) notFound();
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollingBanner
        message={content.layout.scrollingBannerText}
        style={{ background: theme.colors.scrollingBannerBg }}
      />
      <header
        className="sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: theme.colors.headerBg }}
      >
        <Header
          logoUrl={content.layout.header.logoUrl}
          ctaText={content.layout.header.ctaText}
          affiliateUrl={mitolynConfig.affiliateUrl}
        />
      </header>
      <main className="flex-grow bg-brand-bg-white">{children}</main>
      <footer style={{ backgroundColor: theme.colors.footerBg }}>
        <Footer
          {...content.layout.footer}
          ctaText={content.layout.header.ctaText}
          affiliateUrl={mitolynConfig.affiliateUrl}
        />
      </footer>
    </div>
  );
}
