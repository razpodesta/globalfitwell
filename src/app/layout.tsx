// RUTA: src/app/layout.tsx
/**
 * @file Layout Raíz de la Aplicación
 * @description Layout principal que envuelve toda la aplicación. Define la estructura
 * HTML base y carga las fuentes globales.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { AntiCopyHandler } from "@/components/HOCs/AntiCopyHandler";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "GlobalFitWell",
  description: "Your partner in wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={roboto_condensed.variable}>
      <body className="font-sans antialiased text-brand-text-dark bg-brand-bg-white">
        <AntiCopyHandler>{children}</AntiCopyHandler>
      </body>
    </html>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Proveedor de Tema (Theming)**: Implementar `ThemeProvider` para modo oscuro.
// 2. **Proveedor de i18n**: Implementar `next-intl` para gestión avanzada de idiomas.
// 3. **Banner de Cookies**: Añadir componente para consentimiento GDPR/LGPD.

// RUTA: src/app/layout.tsx
