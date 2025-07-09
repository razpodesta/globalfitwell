// next.config.ts
import type { NextConfig } from "next";

/**
 * @description Configuración principal de Next.js.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Redirigir la raíz del sitio a la campaña por defecto.
        source: "/",
        destination: "/campaigns/mitolyn", // Apunta a la nueva ruta de campaña
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
