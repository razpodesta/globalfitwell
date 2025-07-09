// RUTA: src/app/(dev)/developers/branding/page.tsx
"use client";

import { Footer } from "@/app/(components)/layout/Footer";
import { Header } from "@/app/(components)/layout/Header";
import { ScrollingBanner } from "@/app/(components)/layout/ScrollingBanner";
import { DoubleScrollingBanner } from "@/app/(components)/sections/DoubleScrollingBanner";
import { Hero } from "@/app/(components)/sections/Hero";
import { Button } from "@/app/(components)/ui/Button";
import { Container } from "@/app/(components)/ui/Container";
import { siteContent } from "@/config/site";
import { Check, Clipboard } from "lucide-react";
import { Inter, Lato, Montserrat, Roboto_Condensed } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react"; // <-- IMPORTACIÓN CORREGIDA
import { ColorResult, SketchPicker } from "react-color";

/**
 * @devonly
 * @page Live Theme Builder (Laboratório Visual Interativo)
 * @description Ferramenta de desenvolvimento avançada para prototipar e visualizar temas
 * (cores, fontes, textos) em tempo real, aplicados a uma pré-visualização completa da página.
 * Esta página possui seu próprio layout independente e não herda elementos do site principal.
 * -- NÃO INCLUÍDA NO BUILD DE PRODUÇÃO --
 */

// --- Configuração das Fontes ---
const roboto_condensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontOptions = {
  "Roboto Condensed": roboto_condensed.variable + " font-sans",
  Lato: lato.variable + " font-lato",
  Montserrat: montserrat.variable + " font-montserrat",
  Inter: inter.variable + " font-inter",
};
type FontName = keyof typeof fontOptions;

// --- Componentes da Vitrine ---
const ShowcaseSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-brand-text-dark border-b-2 border-brand-primary pb-2 mb-8">
      {title}
    </h2>
    <div className="space-y-8">{children}</div>
  </section>
);
const ColorInputWithPicker = ({
  label,
  color,
  setColor,
}: {
  label: string;
  color: string;
  setColor: (color: string) => void;
}) => {
  const [displayPicker, setDisplayPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setDisplayPicker(!displayPicker)}
          className="h-9 w-9 cursor-pointer rounded border border-gray-300 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-9 px-2 font-mono text-sm border-gray-300 rounded shadow-sm"
        />
        <button
          onClick={handleCopy}
          className="p-2 h-9 bg-gray-100 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Clipboard className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>
      {displayPicker && (
        <div className="absolute z-10 top-full mt-2 left-0">
          <div
            className="fixed inset-0"
            onClick={() => setDisplayPicker(false)}
          />
          <SketchPicker
            color={color}
            onChange={(c: ColorResult) => setColor(c.hex)}
          />
        </div>
      )}
    </div>
  );
};

// --- Página Principal do Laboratório ---
const BrandingPageContent = () => {
  const [theme, setTheme] = useState({
    scrollingBannerBg: "#D47D3A",
    headerBg: "#0d40b8",
    pageBg: "#F9FAFB",
    footerBg: "#1F2937",
    buttonBg: "#70C14A",
    buttonText: "#FFFFFF",
    primaryText: "#2D2D2D",
    secondaryText: "#555555",
    heroTitle: "Cientistas de Harvard Descobrem a Causa do Metabolismo Lento",
    heroSubtitle:
      "Um simples interruptor celular pode forçar o corpo a queimar gordura 24h por dia.",
    font: "Roboto Condensed" as FontName,
  });
  const handleThemeChange = (key: keyof typeof theme, value: string) =>
    setTheme((prev) => ({ ...prev, [key]: value }));
  const mockContent = useMemo(() => siteContent["pt-BR"], []);

  return (
    <div className={`min-h-screen bg-gray-100 ${fontOptions[theme.font]}`}>
      <div className="flex h-screen">
        {/* PAINEL DE CONTROLE (ESQUERDA) */}
        <aside className="w-1/3 max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-brand-text-dark">
              Laboratório Visual
            </h1>
            <p className="text-sm text-brand-text-light">Mitolyn Branding</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 pt-4">
              Controles do Tema
            </h3>
            <ColorInputWithPicker
              label="Banner Rolante"
              color={theme.scrollingBannerBg}
              setColor={(c) => handleThemeChange("scrollingBannerBg", c)}
            />
            <ColorInputWithPicker
              label="Header Fundo"
              color={theme.headerBg}
              setColor={(c) => handleThemeChange("headerBg", c)}
            />
            <ColorInputWithPicker
              label="Página Fundo"
              color={theme.pageBg}
              setColor={(c) => handleThemeChange("pageBg", c)}
            />
            <ColorInputWithPicker
              label="Footer Fundo"
              color={theme.footerBg}
              setColor={(c) => handleThemeChange("footerBg", c)}
            />
            <ColorInputWithPicker
              label="Botão Fundo"
              color={theme.buttonBg}
              setColor={(c) => handleThemeChange("buttonBg", c)}
            />
            <ColorInputWithPicker
              label="Botão Texto"
              color={theme.buttonText}
              setColor={(c) => handleThemeChange("buttonText", c)}
            />
            <ColorInputWithPicker
              label="Texto Principal"
              color={theme.primaryText}
              setColor={(c) => handleThemeChange("primaryText", c)}
            />
            <ColorInputWithPicker
              label="Texto Secundário"
              color={theme.secondaryText}
              setColor={(c) => handleThemeChange("secondaryText", c)}
            />

            <h3 className="text-xs font-semibold uppercase text-gray-500 pt-4">
              Tipografia e Conteúdo
            </h3>
            <div>
              <label className="text-sm font-medium">Fonte Global</label>
              <select
                value={theme.font}
                onChange={(e) => handleThemeChange("font", e.target.value)}
                className="w-full p-2 mt-1 border-gray-300 rounded shadow-sm"
              >
                <option disabled>Selecione uma fonte</option>
                {Object.keys(fontOptions).map((name) => (
                  <option key={name} value={name as FontName}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Título do Hero</label>
              <textarea
                value={theme.heroTitle}
                onChange={(e) => handleThemeChange("heroTitle", e.target.value)}
                className="w-full p-2 mt-1 border-gray-300 rounded shadow-sm min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtítulo do Hero</label>
              <textarea
                value={theme.heroSubtitle}
                onChange={(e) =>
                  handleThemeChange("heroSubtitle", e.target.value)
                }
                className="w-full p-2 mt-1 border-gray-300 rounded shadow-sm min-h-[100px]"
              />
            </div>
          </div>
        </aside>

        {/* LIENZO DE PRÉ-VISUALIZAÇÃO (DIREITA) */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <ShowcaseSection title="Pré-visualização ao Vivo (Live Preview)">
              <div className="rounded-xl shadow-2xl border-4 border-white bg-white overflow-hidden transform scale-[0.85] origin-top">
                <div
                  style={{
                    backgroundColor: theme.pageBg,
                    color: theme.secondaryText,
                  }}
                >
                  <ScrollingBanner
                    message={mockContent.layout.scrollingBannerText}
                    style={{ background: theme.scrollingBannerBg }}
                  />
                  <header style={{ backgroundColor: theme.headerBg }}>
                    <Header {...mockContent.layout.header} />
                  </header>
                  <main>
                    <div style={{ color: theme.primaryText }}>
                      <Hero
                        title={theme.heroTitle}
                        subtitle={theme.heroSubtitle}
                      />
                    </div>
                    <div className="py-10">
                      <Container className="text-center max-w-xl">
                        <Link href="#" className="pointer-events-none">
                          <div className="relative aspect-video mx-auto group rounded-lg overflow-hidden border-4 border-white shadow-lg">
                            <Image
                              src={mockContent.bridgePage.thumbSection.imageUrl}
                              alt={mockContent.bridgePage.thumbSection.altText}
                              fill
                              className="object-cover"
                              priority
                              sizes="50vw"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-6 backdrop-blur-sm">
                                <svg
                                  className="w-16 h-16 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Container>
                    </div>
                    <div className="text-center pb-10">
                      <Button
                        href="#"
                        style={{
                          backgroundColor: theme.buttonBg,
                          color: theme.buttonText,
                        }}
                      >
                        PEÇA AGORA
                      </Button>
                    </div>
                    <DoubleScrollingBanner
                      {...mockContent.reviewPage.doubleScrollingBannerSection}
                    />
                  </main>
                  <footer style={{ backgroundColor: theme.footerBg }}>
                    <Footer
                      {...mockContent.layout.footer}
                      ctaText={mockContent.layout.header.buttonText}
                    />
                  </footer>
                </div>
              </div>
            </ShowcaseSection>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function BrandingPage() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return <BrandingPageContent />;
}
// RUTA: src/app/(dev)/developers/branding/page.tsx
