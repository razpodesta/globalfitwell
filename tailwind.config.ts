// RUTA: tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#00AEEF",
        "brand-primary-dark": "#0095c7",
        "brand-action": "#D47D3A",
        "brand-action-dark": "#b86b32",
        "brand-cta-buy": "#F9E44F",
        "brand-cta-buy-dark": "#eac92b",
        "brand-success": "#70C14A",
        "brand-success-dark": "#5a9a3b",
        "brand-header-blue": "#0d40b8",
        "brand-text-dark": "#2D2D2D",
        "brand-text-light": "#555555",
        "brand-bg-light": "#F9FAFB",
        "brand-bg-white": "#FFFFFF",
        "brand-almost-white": "rgb(254, 254, 254)",
        "pure-red": "#FF0000",
        "gray-800": "#1F2937",
      },
      fontFamily: {
        sans: ["var(--font-roboto-condensed)", "sans-serif"],
        serif: ["var(--font-playfair-display)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        "open-sans": ["var(--font-open-sans)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        jiggle: "jiggle 0.5s ease-in-out infinite",
        "word-cascade": "word-cascade 0.8s ease-out forwards",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        jiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        "word-cascade": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
