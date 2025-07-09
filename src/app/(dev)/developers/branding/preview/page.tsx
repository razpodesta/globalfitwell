// RUTA: src/app/(dev)/developers/branding/preview/page.tsx
/**
 * @file Página de Previsualización para la Suite de Diseño.
 * @description Esta página está diseñada para ser renderizada DENTRO de un <iframe> en el
 * laboratorio principal. Recibe el estado del diseño a través de parámetros de búsqueda
 * en la URL, lo decodifica y renderiza el componente de página correspondiente con props dinámicos.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
import MitolynBridgePageClient, {
  MitolynBridgePageProps,
} from "@/app/campaigns/mitolyn/(pages)/page.client";
import MitolynReviewPage from "@/app/campaigns/mitolyn/(pages)/review/page";
import { labCampaigns, fontOptions, FontName } from "../lab.config";
import { LocaleContent } from "@/lib/types/campaign.d";

type PageType = "bridge" | "review" | "blog";

// --- Lógica de Decodificación del Estado ---
const decodeStateForPreview = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const campaign =
    (searchParams.campaign as keyof typeof labCampaigns) || "mitolyn";
  const pageType = (searchParams.pageType as PageType) || "bridge";
  const font = (searchParams.font as FontName) || "Roboto Condensed";

  const config = labCampaigns[campaign];
  const localeContent = config.locales["pt-BR"];
  const dynamicContent: LocaleContent = JSON.parse(
    JSON.stringify(localeContent)
  );

  if (searchParams.heroTitle)
    dynamicContent.bridgePage.hero.title = searchParams.heroTitle as string;
  if (searchParams.heroSubtitle)
    dynamicContent.bridgePage.hero.subtitle =
      searchParams.heroSubtitle as string;
  if (searchParams.ctaButtonText)
    dynamicContent.bridgePage.thumbSection.ctaButtonText =
      searchParams.ctaButtonText as string;

  const pageProps = {
    config: { ...config, locales: { "pt-BR": dynamicContent } },
  };

  const pageComponentMapping: Record<
    PageType,
    React.ComponentType<MitolynBridgePageProps>
  > = {
    bridge: MitolynBridgePageClient,
    review: MitolynReviewPage,
    blog: () => (
      <div className="p-8 text-center bg-white h-full flex items-center justify-center">
        Vista Previa del Blog en Desarrollo...
      </div>
    ),
  };

  const fontClass = fontOptions[font]?.className || "";

  return {
    pageComponent: pageComponentMapping[pageType],
    pageProps,
    fontClass,
  };
};

// --- Componente de Página ---
export default function PreviewPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    pageComponent: PageToPreview,
    pageProps,
    fontClass,
  } = decodeStateForPreview(searchParams);

  return (
    <html className={fontClass}>
      <body className="font-sans">
        <PageToPreview {...pageProps} />
      </body>
    </html>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Soporte Multi-Idioma**: La lógica de `decodeStateForPreview` actualmente fuerza "pt-BR".
//    Debería ser capaz de recibir un parámetro `locale` en la URL para cargar dinámicamente
//    el contenido del idioma correcto desde la configuración de la campaña.
// 2. **Renderizado de Secciones Dinámicas**: Para que la preview de la "Review Page" sea editable,
//    esta página necesitaría recibir y aplicar más parámetros de la URL (ej. título de la sección
//    de ingredientes, contenido de las FAQs, etc.).

// RUTA: src/app/(dev)/developers/branding/preview/page.tsx
