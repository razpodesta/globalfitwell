// RUTA: src/app/robots.ts
import { MetadataRoute } from "next";

/**
 * @file Generador de robots.txt
 * @description Define las reglas para los crawlers de los motores de búsqueda (Google, Bing, etc.).
 * Este archivo es crucial para el SEO técnico y la seguridad del negocio de afiliados.
 * Se genera dinámicamente al construir el sitio, asegurando que las rutas sean correctas.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/robots
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/intro
 *
 * @returns {MetadataRoute.Robots} Un objeto de configuración para el archivo robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  /**
   * @description La URL base del sitio. Se obtiene de una variable de entorno pública
   * para asegurar que sea correcta tanto en desarrollo como en producción.
   * Es fundamental para construir la URL absoluta del sitemap.
   */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        /**
         * @property {string} userAgent - El bot al que se aplican las reglas.
         * '*' significa que estas reglas son para todos los bots.
         */
        userAgent: "*",

        /**
         * @property {string[]} allow - Rutas que los bots tienen permitido rastrear.
         * '/' permite el rastreo de todo el sitio, que es la configuración por defecto
         * y la recomendada para la mayoría de los casos.
         */
        allow: "/",

        /**
         * @property {string[]} disallow - Rutas o directorios que los bots NO deben rastrear.
         * Esta es la directiva más importante para proteger contenido sensible.
         */
        disallow: [
          // ¡CRÍTICO! Bloquea la ruta de cloaking de afiliados para evitar que Google
          // la siga y potencialmente penalice el sitio o el enlace.
          "/go",

          // Bloquea todas las rutas bajo /developers/, como nuestra página de branding.
          // Esto evita que herramientas internas sean indexadas.
          "/developers/",
        ],
      },
      // --- Ejemplo de regla específica para un bot (actualmente no necesaria) ---
      // {
      //   userAgent: 'GPTBot',
      //   disallow: '/', // Esto bloquearía completamente a los bots de OpenAI.
      // }
    ],

    /**
     * @property {string} sitemap - La URL absoluta del archivo sitemap.xml.
     * Esta es una de las directivas más importantes, ya que le dice a los motores
     * de búsqueda dónde encontrar un mapa de todas las páginas que deseas indexar.
     */
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
// RUTA: src/app/robots.ts
