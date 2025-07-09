// RUTA: src/app/(dev)/developers/branding/useLabEngine.ts
/**
 * @file Motor Lógico para la Campaign Design Suite.
 * @description Hook que encapsula la lógica de estado del panel de control,
 * la sincronización con URL, persistencia en localStorage y las acciones de la suite.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontName, labCampaigns } from "./lab.config";
// Las importaciones de 'useMemo' y 'LocaleContent' han sido eliminadas por no ser utilizadas.

export type PageType = "bridge" | "review" | "blog";
export type Viewport = "desktop" | "tablet" | "mobile";

export interface LabState {
  campaign: keyof typeof labCampaigns;
  pageType: PageType;
  font: FontName;
  heroTitle: string;
  heroSubtitle: string;
  ctaButtonText: string;
}

const defaultState: LabState = {
  campaign: "mitolyn",
  pageType: "bridge",
  font: "Roboto Condensed",
  heroTitle: "Título de Hero por Defecto",
  heroSubtitle: "Este es un subtítulo de ejemplo para la campaña.",
  ctaButtonText: "VER VIDEO AHORA",
};

const LOCAL_STORAGE_KEY = "campaign-design-suite-state";

export const useLabEngine = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<LabState>(() => {
    const params = new URLSearchParams(searchParams);
    if (params.toString()) {
      const decoded: Partial<LabState> = {};
      const campaign = params.get("campaign");
      if (campaign && campaign in labCampaigns)
        decoded.campaign = campaign as keyof typeof labCampaigns;
      const pageType = params.get("pageType");
      if (pageType) decoded.pageType = pageType as PageType;
      const font = params.get("font");
      if (font) decoded.font = font as FontName;
      const title = params.get("title");
      if (title) decoded.heroTitle = decodeURIComponent(title);
      const subtitle = params.get("subtitle");
      if (subtitle) decoded.heroSubtitle = decodeURIComponent(subtitle);
      const cta = params.get("cta");
      if (cta) decoded.ctaButtonText = decodeURIComponent(cta);
      return { ...defaultState, ...decoded };
    }

    try {
      const storedState =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_KEY)
          : null;
      return storedState ? JSON.parse(storedState) : defaultState;
    } catch {
      console.warn(
        "No se pudo cargar el estado del laboratorio desde localStorage."
      );
      return defaultState;
    }
  });

  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    const stateToUrl: Record<string, string> = {
      campaign: state.campaign,
      pageType: state.pageType,
      font: state.font,
      heroTitle: state.heroTitle,
      heroSubtitle: state.heroSubtitle,
      ctaButtonText: state.ctaButtonText,
    };
    Object.entries(stateToUrl).forEach(([key, value]) => {
      if (String(value) !== String(defaultState[key as keyof LabState])) {
        params.set(key, String(value));
      }
    });

    const newPreviewUrl = `/developers/branding/preview?${params.toString()}`;
    setPreviewUrl(newPreviewUrl);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch {
      console.warn("Error al guardar en localStorage.");
    }
  }, [state, pathname, router]);

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

  const generateConfigCode = useCallback(() => {
    const activeConfig = labCampaigns[state.campaign];
    const newConfig = JSON.parse(JSON.stringify(activeConfig));
    const locale = Object.keys(newConfig.locales)[0] || "pt-BR";

    const localeRef = newConfig.locales[locale];
    localeRef.bridgePage.hero.title = state.heroTitle;
    localeRef.bridgePage.hero.subtitle = state.heroSubtitle;
    localeRef.bridgePage.thumbSection.ctaButtonText = state.ctaButtonText;

    const codeString = `// RUTA: src/app/campaigns/${
      state.campaign
    }/config.ts\n\nimport { type CampaignConfig } from "@/lib/types/campaign.d";\n\nexport const ${
      state.campaign
    }Config: CampaignConfig = ${JSON.stringify(newConfig, null, 2)};`;
    navigator.clipboard.writeText(codeString);
    alert(`¡Código de configuración para "${state.campaign}" copiado!`);
  }, [state]);

  return {
    state,
    viewport,
    setViewport,
    previewUrl,
    handleStateChange,
    handleShare,
    generateConfigCode,
  };
};

// --- MEJORAS FUTURAS ---
// 1. **useReducer para Estado Complejo**: Si el estado del laboratorio (`LabState`) crece
//    mucho más, podría ser beneficioso reemplazar `useState` por `useReducer` para un
//    manejo de estado más predecible y acciones de actualización centralizadas.
// 2. **Debouncing en la Actualización de URL**: Implementar un hook `useDebounce` para
//    los campos de texto, de modo que la URL y el estado de `localStorage` solo se
//    actualicen después de que el usuario deje de escribir por un breve período (ej. 300ms).

// RUTA: src/app/(dev)/developers/branding/useLabEngine.ts
