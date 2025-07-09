// RUTA: src/app/(dev)/developers/branding/lab.config.ts
/**
 * @file Configuración Estática para la Campaign Design Suite.
 * @description Define los datos base que alimentan el laboratorio, como las campañas
 * disponibles, paletas de marca y las opciones de fuentes.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
import { mitolynConfig } from "@/app/campaigns/mitolyn/config";
import { type CampaignConfig } from "@/lib/types/campaign.d";
import { Inter, Lato, Montserrat, Roboto_Condensed } from "next/font/google";

// --- Fuentes ---
const roboto = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export type FontName = "Roboto Condensed" | "Lato" | "Montserrat" | "Inter";
export const fontOptions: Record<
  FontName,
  { name: FontName; className: string }
> = {
  "Roboto Condensed": { name: "Roboto Condensed", className: roboto.variable },
  Lato: { name: "Lato", className: lato.variable },
  Montserrat: { name: "Montserrat", className: montserrat.variable },
  Inter: { name: "Inter", className: inter.variable },
};

// --- Campañas ---
export const labCampaigns: Record<string, CampaignConfig> = {
  mitolyn: mitolynConfig,
  // "super-serum": superSerumConfig,
};

// --- Paletas de Marca ---
export const brandPalettes: Record<
  string,
  Record<string, { name: string; hex: string }>
> = {
  mitolyn: {
    primaryBlue: { name: "Azul Primario", hex: "#0d40b8" },
    accentOrange: { name: "Naranja Acento", hex: "#D47D3A" },
    textDark: { name: "Texto Oscuro", hex: "#2D2D2D" },
    successGreen: { name: "Verde Éxito", hex: "#70C14A" },
    ctaYellow: { name: "Amarillo CTA", hex: "#F9E44F" },
    footerDark: { name: "Gris Footer", hex: "#1F2937" },
  },
};
