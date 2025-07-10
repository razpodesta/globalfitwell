// RUTA: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        // Redirigir la raíz a la campaña y locale por defecto (en-US)
        destination: "/campaigns/mitolyn/en-US",
        permanent: true,
      },
      {
        // Redirección base de la campaña al locale por defecto
        source: "/campaigns/mitolyn",
        destination: "/campaigns/mitolyn/en-US",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
// RUTA: next.config.ts
