// RUTA: src/app/campaigns/mitolyn/(pages)/page.tsx
/**
 * @file Bridge Page para la campaña Mitolyn (Componente de Servidor).
 * @description Punto de entrada del servidor para la página. Exporta `generateMetadata`
 * y renderiza el componente cliente correspondiente.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import type { Metadata } from "next";
// CORRECCIÓN: La ruta de importación ahora es relativa al directorio padre.
import { mitolynConfig as defaultConfig } from "../config";
import MitolynBridgePageClient, {
  type MitolynBridgePageProps,
} from "./page.client";

export async function generateMetadata(): Promise<Metadata> {
  return defaultConfig.locales["pt-BR"]?.metadata || {};
}

export default function MitolynBridgePage(props: MitolynBridgePageProps) {
  return <MitolynBridgePageClient {...props} />;
}
