// RUTA: next.config.ts
import type { NextConfig } from "next";

/**
 * @description Configuración principal de Next.js.
 * Aquí definimos redireccionamientos globales para la aplicación.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products/mitolyn/pt-BR",
        permanent: true, // Es una redirección permanente (SEO-friendly).
      },
    ];
  },
};

export default nextConfig;
// RUTA: next.config.ts
