// RUTA: src/app/(main)/products/mitolyn/layout.tsx
import { Header } from "@/app/(components)/layout/Header";
import { Footer } from "@/app/(components)/layout/Footer";
import { ScrollingBanner } from "@/app/(components)/layout/ScrollingBanner";
import { siteContent } from "@/config/site";

export default function MitolynProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params.locale || "pt-BR";
  const content = siteContent[locale] || siteContent["pt-BR"];

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollingBanner message={content.layout.scrollingBannerText} />
      <header className="bg-brand-header-blue sticky top-0 z-50 shadow-lg">
        <Header {...content.layout.header} />
      </header>
      <main className="flex-grow bg-brand-bg-white">{children}</main>
      <footer className="bg-gray-800">
        <Footer
          {...content.layout.footer}
          ctaText={content.layout.header.buttonText}
        />
      </footer>
    </div>
  );
}
// RUTA: src/app/(main)/products/mitolyn/layout.tsx
