// RUTA: src/app/sitemap.ts
import { MetadataRoute } from "next";
import { mitolynConfig } from "./campaigns/mitolyn/campaign.config"; // RUTA CORREGIDA

const allCampaignConfigs = {
  mitolyn: mitolynConfig,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  // Corregido: 'routes' se declara con 'const' ya que no se reasigna.
  const routes: MetadataRoute.Sitemap = [];

  // 1. Generar rutas para cada campaña
  for (const campaignName in allCampaignConfigs) {
    // La variable 'campaignConfig' no se usa directamente en el bucle,
    // ya que el nombre de la campaña es suficiente para construir las URLs.
    // Esto es limpio y evita errores de "variable no utilizada".

    // Página de aterrizaje (Bridge Page)
    routes.push({
      url: `${siteUrl}/campaigns/${campaignName}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });

    // Página de reseña (Review Page)
    routes.push({
      url: `${siteUrl}/campaigns/${campaignName}/review`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    });
  }

  // 2. Generar rutas para páginas legales
  const legalRoutes = ["/termos", "/privacidade", "/cookies"];
  legalRoutes.forEach((route) => {
    routes.push({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  });

  return routes;
}

// --- MEJORAS FUTURAS ---
// 1. **Internacionalización (hreflang)**: Si una campaña se lanza en múltiples idiomas, la
//    estructura de carpetas debería cambiar a `src/app/campaigns/[campaignName]/[locale]`.
//    En ese punto, este sitemap debería ser modificado para iterar sobre los `locales`
//    de cada `campaignConfig` y generar las etiquetas `<xhtml:link rel="alternate" hreflang="..." />`
//    para un SEO internacional óptimo.
// 2. **Generación desde CMS**: En un sistema más avanzado, en lugar de importar configs
//    locales, esta función podría hacer una llamada a un Headless CMS (como Contentful o Sanity)
//    para obtener la lista de todas las campañas y páginas publicadas, haciendo el sitemap
//    100% dinámico y basado en contenido real.

// RUTA: src/app/sitemap.ts
