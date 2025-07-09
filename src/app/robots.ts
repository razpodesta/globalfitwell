// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // ¡CRÍTICO! Bloquear el rastreo de TODAS las rutas de API
        // para proteger los enlaces de afiliado de todas las campañas.
        disallow: ["/api/", "/developers/"],
      },
      // Puedes añadir reglas específicas para bots aquí si es necesario
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
