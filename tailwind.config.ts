// RUTA: tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * @file Configuración principal de Tailwind CSS para el proyecto.
 * @description Este archivo centraliza toda la configuración de diseño del sitio,
 * incluyendo la paleta de colores, familias de fuentes, animaciones y plugins.
 * Mantener este archivo organizado es clave para la consistencia visual y la
 * mantenibilidad del proyecto.
 * @see https://tailwindcss.com/docs/configuration
 */
const config: Config = {
  /**
   * @property {string[]} content - Lista de archivos que Tailwind analizará
   * para encontrar las clases de utilidad que se están usando. Esto permite
   * purgar las clases no utilizadas en el build de producción, optimizando el CSS.
   */
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  /**
   * @property {object} theme - El corazón de la configuración de diseño.
   * Aquí extendemos la paleta de colores, fuentes y animaciones por defecto de Tailwind.
   */
  theme: {
    extend: {
      /**
       * @property {object} colors - Paleta de colores personalizada de la marca.
       * Utilizamos nombres semánticos (ej: 'brand-primary') para que el uso de
       * colores en los componentes sea intuitivo y fácil de mantener.
       */
      colors: {
        // --- Paleta Principal de la Marca ---
        "brand-primary": "#00AEEF",
        "brand-primary-dark": "#0095c7",

        "brand-action": "#D47D3A",
        "brand-action-dark": "#b86b32",

        "brand-cta-buy": "#F9E44F",
        "brand-cta-buy-dark": "#eac92b",

        "brand-success": "#70C14A",
        "brand-success-dark": "#5a9a3b",

        "brand-header-blue": "#0d40b8",

        // --- Paleta de Texto y Fondos ---
        "brand-text-dark": "#2D2D2D",
        "brand-text-light": "#555555",

        "brand-bg-light": "#F9FAFB",
        "brand-bg-white": "#FFFFFF",
        "brand-almost-white": "rgb(254, 254, 254)",

        // --- Paleta de Utilidad ---
        "pure-red": "#FF0000",
        "gray-800": "#1F2937",
      },

      /**
       * @property {object} fontFamily - Define las familias de fuentes personalizadas.
       * Utilizamos variables CSS para cargar las fuentes de Google Fonts de manera
       * eficiente a través de `next/font`.
       */
      fontFamily: {
        // Fuente por defecto del proyecto, vinculada a la variable CSS en `layout.tsx`
        sans: ["var(--font-roboto-condensed)", "sans-serif"],

        // Fuentes adicionales para el laboratorio de branding
        lato: ["var(--font-lato)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },

      /**
       * @property {object} animation - Define animaciones personalizadas reutilizables.
       */
      animation: {
        "gradient-x": "gradient-x 5s ease infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        jiggle: "jiggle 0.5s ease-in-out infinite",
      },

      /**
       * @property {object} keyframes - Define los pasos de las animaciones personalizadas.
       */
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "left center" },
          "50%": { backgroundPosition: "right center" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        jiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
    },
  },

  /**
   * @property {any[]} plugins - Lista de plugins de Tailwind CSS.
   * `@tailwindcss/typography` añade un conjunto de clases 'prose' para
   * estilizar hermosamente bloques de texto largo (como en las páginas legales).
   */
  plugins: [typography],
};

export default config;
// RUTA: tailwind.config.ts
