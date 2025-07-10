// RUTA: src/app/layout.tsx
import type { Metadata } from "next";
import {
  Roboto_Condensed,
  Poppins,
  Open_Sans,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { AntiCopyHandler } from "@/components/HOCs/AntiCopyHandler";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "GlobalFitWell - Your Partner in Wellness",
  description:
    "Discover science-backed solutions for a healthier, more energetic life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${roboto_condensed.variable} ${poppins.variable} ${open_sans.variable} ${playfair_display.variable}`}
    >
      <body className="font-sans antialiased text-brand-text-dark bg-brand-bg-white">
        <AntiCopyHandler>{children}</AntiCopyHandler>
      </body>
    </html>
  );
}
