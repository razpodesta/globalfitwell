// RUTA: src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { AntiCopyHandler } from "@/app/(components)/layout/AntiCopyHandler";
import { RouteTester } from "@/app/(components)/ui/RouteTester";

/**
 * @file Layout Raíz de la Aplicación
 * @description Este es el único layout que contiene las etiquetas <html> y <body>.
 * Es responsable de cargar las fuentes globales, los estilos base y componentes
 * que deben persistir en absolutamente toda la aplicación, como el AntiCopyHandler.
 * Es agnóstico al contenido específico de las páginas.
 */
const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Mitolyn Oficial",
  description: "Análise completa e informações sobre o produto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={roboto_condensed.variable}>
      <body className="font-sans antialiased text-brand-text-dark bg-brand-bg-white">
        <AntiCopyHandler>
          {process.env.NODE_ENV === "development" && <RouteTester />}
          {children}
        </AntiCopyHandler>
      </body>
    </html>
  );
}
// RUTA: src/app/layout.tsx
