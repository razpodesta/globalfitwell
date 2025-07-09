// RUTA: src/app/sitemap.ts
import { MetadataRoute } from "next";
import { siteContent } from "@/config/site";

/**
 * @file Generador de Sitemap
 * @description Crea el sitemap.xml dinámicamente a partir de los idiomas definidos
 * en el archivo de configuración `site.ts`. Esto asegura que todas las páginas estáticas
 * de todos los idiomas sean descubiertas por los motores de búsqueda,
 * incluyendo las etiquetas `hreflang` para un correcto SEO internacional.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = Object.keys(siteContent);
  const routes: MetadataRoute.Sitemap = [];

  // Rutas de páginas legales (no tienen versión de idioma)
  const legalRoutes = ["/termos", "/privacidade", "/cookies"];

  // Genera las URLs para cada idioma
  locales.forEach((locale) => {
    const alternates = locales.reduce((acc, loc) => {
      acc[loc] = `${siteUrl}/products/mitolyn/${loc}`;
      return acc;
    }, {} as Record<string, string>);

    routes.push({
      url: `${siteUrl}/products/mitolyn/${locale}`,
      lastModified: new Date(),
      alternates: { languages: alternates },
    });

    routes.push({
      url: `${siteUrl}/products/mitolyn/${locale}/review`,
      lastModified: new Date(),
      alternates: { languages: alternates },
    });
  });

  // Añade las rutas legales
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
// RUTA: src/app/sitemap.ts
