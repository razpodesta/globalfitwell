// RUTA: src/app/(dev)/developers/branding/useBrandingLab.ts
/**
 * @file Hook de Lógica para el Laboratorio de Branding.
 * @description Encapsula todo el manejo de estado, la sincronización con la URL,
 * y la lógica de negocio del laboratorio.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FontName, labCampaigns } from "./lab.config";
// La importación de 'CampaignConfig' ha sido eliminada ya que no se utilizaba directamente.

// Tipado estricto para el estado del laboratorio
export interface LabState {
  campaign: keyof typeof labCampaigns;
  font: FontName;
  heroTitle: string;
  heroSubtitle: string;
}

// Estado por defecto
const defaultState: LabState = {
  campaign: "mitolyn",
  font: "Roboto Condensed",
  heroTitle: "Título de Hero por Defecto",
  heroSubtitle: "Este es un subtítulo de ejemplo para la campaña.",
};

export const useBrandingLab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- Estado Principal ---
  const [state, setState] = useState<LabState>(() => {
    const params = new URLSearchParams(searchParams);
    const decodedState: Partial<LabState> = {};
    const campaign = params.get("campaign");
    if (campaign && campaign in labCampaigns)
      decodedState.campaign = campaign as keyof typeof labCampaigns;
    const font = params.get("font");
    if (font) decodedState.font = font as FontName;
    const title = params.get("title");
    if (title) decodedState.heroTitle = decodeURIComponent(title);
    const subtitle = params.get("subtitle");
    if (subtitle) decodedState.heroSubtitle = decodeURIComponent(subtitle);
    return { ...defaultState, ...decodedState };
  });

  // --- Sincronización de Estado a URL ---
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("campaign", state.campaign);
    params.set("font", state.font);
    if (state.heroTitle !== defaultState.heroTitle)
      params.set("title", encodeURIComponent(state.heroTitle));
    if (state.heroSubtitle !== defaultState.heroSubtitle)
      params.set("subtitle", encodeURIComponent(state.heroSubtitle));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [state, pathname, router]);

  // --- Manejadores de Eventos ---
  const handleStateChange = useCallback(
    <K extends keyof LabState>(key: K, value: LabState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("¡URL de la vista actual copiada al portapapeles!");
  }, []);

  // --- Lógica de Exportación ---
  const generateConfigCode = useCallback(() => {
    const activeConfig = labCampaigns[state.campaign];
    // Crea una copia profunda para no modificar el original
    const newConfig = JSON.parse(JSON.stringify(activeConfig));

    // Sobrescribe el contenido con los valores del estado actual del laboratorio
    const defaultLocale = Object.keys(newConfig.locales)[0] || "pt-BR";
    newConfig.locales[defaultLocale].bridgePage.hero.title = state.heroTitle;
    newConfig.locales[defaultLocale].bridgePage.hero.subtitle =
      state.heroSubtitle;
    // Aquí se podrían añadir más campos (colores, etc.) si se expande el estado

    // Formatea el objeto como un string de código TypeScript
    const codeString = `
// Archivo de configuración generado para la campaña: ${state.campaign}
// Copia y pega este contenido en: src/app/campaigns/${state.campaign}/config.ts

import { type CampaignConfig } from "@/lib/types/campaign.d";

export const ${state.campaign}Config: CampaignConfig = ${JSON.stringify(
      newConfig,
      null,
      2
    )};
    `;

    navigator.clipboard.writeText(codeString);
    alert(
      `¡Código de configuración para "${state.campaign}" copiado al portapapeles!`
    );
  }, [state]);

  // --- Datos Derivados ---
  const activeCampaignConfig = labCampaigns[state.campaign];

  return {
    state,
    activeCampaignConfig,
    handleStateChange,
    handleShare,
    generateConfigCode,
  };
};

// --- MEJORAS FUTURAS ---
// 1. **useReducer para Estado Complejo**: Si el estado del laboratorio (`LabState`) crece
//    mucho más, podría ser beneficioso reemplazar `useState` por `useReducer` para un
//    manejo de estado más predecible y acciones de actualización centralizadas.
// 2. **Debouncing en la Actualización de URL**: Actualmente, cada cambio en un `textarea`
//    dispara una actualización de la URL. Para mejorar el rendimiento, se podría implementar
//    un "debounce" en el `useEffect` que sincroniza el estado con la URL, de modo que
//    la URL solo se actualice después de que el usuario deje de escribir por un breve período.

// RUTA: src/app/(dev)/developers/branding/useBrandingLab.ts
