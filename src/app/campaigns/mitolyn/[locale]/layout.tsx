// RUTA: src/app/campaigns/mitolyn/[locale]/layout.tsx
/**
 * @file Dynamic Layout for the Mitolyn Campaign
 * @description This layout wraps all pages for a specific locale within the Mitolyn
 * campaign. It dynamically fetches the correct content and theme from the
 * central configuration file based on the `locale` parameter from the URL.
 * It follows the Next.js 15 pattern for accessing dynamic route params.
 *
 * @author L.I.A Legacy
 * @version 2.1.0
 * @since 2.0.0
 */
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { mitolynConfig } from "../campaign.config";

/**
 * Renders the layout for a specific locale of the Mitolyn campaign.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child pages to be rendered within the layout.
 * @param {object} props.params - The dynamic route parameters.
 * @param {string} props.params.locale - The locale code (e.g., 'en-US') from the URL.
 * @returns {React.ReactElement | null} The rendered layout or null if the locale content is not found.
 */
export default function MitolynLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Correctly access the 'locale' parameter inside the function body.
  const { locale } = params;

  const content = mitolynConfig.locales[locale];
  const theme = mitolynConfig.theme;

  // If content for the given locale does not exist, trigger a 404 page.
  if (!content) {
    notFound();
  }

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
// RUTA: src/app/campaigns/mitolyn/[locale]/layout.tsx
