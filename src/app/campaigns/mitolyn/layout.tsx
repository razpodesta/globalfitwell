// src/app/campaigns/mitolyn/layout.tsx
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { mitolynConfig } from "./config";

export default function MitolynLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Para este layout, usamos el locale 'pt-BR' como base.
  // Las páginas internas pueden manejar lógicas de multi-idioma si es necesario.
  const content = mitolynConfig.locales["pt-BR"];

  if (!content) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollingBanner message={content.layout.scrollingBannerText} />
      <header className="bg-brand-header-blue sticky top-0 z-50 shadow-lg">
        <Header
          {...content.layout.header}
          affiliateUrl={mitolynConfig.affiliateUrl}
        />
      </header>
      <main className="flex-grow bg-brand-bg-white">{children}</main>
      <footer className="bg-gray-800">
        <Footer
          {...content.layout.footer}
          ctaText={content.layout.header.buttonText}
          affiliateUrl={mitolynConfig.affiliateUrl}
        />
      </footer>
    </div>
  );
}
