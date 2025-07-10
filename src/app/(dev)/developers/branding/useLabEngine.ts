// RUTA: src/app/(dev)/developers/branding/useLabEngine.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontName, labCampaigns } from "./lab.config";
import { mitolynConfig } from "@/app/campaigns/mitolyn/campaign.config";
import { CampaignTheme } from "@/lib/types/campaign.d";

export type PageType = "bridge" | "review" | "blog";
export type Viewport = "desktop" | "tablet" | "mobile";

export interface LabState {
  campaign: keyof typeof labCampaigns;
  pageType: PageType;
  font: FontName;
  fontSize: number;
  themeColors: CampaignTheme["colors"];
  heroTitle: string;
  heroSubtitle: string;
  ctaButtonText: string;
}

const defaultState: LabState = {
  campaign: "mitolyn",
  pageType: "bridge",
  font: "Roboto Condensed",
  fontSize: 16,
  themeColors: mitolynConfig.theme.colors,
  heroTitle: "Título de Hero por Defecto",
  heroSubtitle: "Este es un subtítulo de ejemplo para la campaña.",
  ctaButtonText: "VER VIDEO AHORA",
};

const LOCAL_STORAGE_KEY = "campaign-design-suite-state-v2";

const safeJsonParse = (json: string | null) => {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const useLabEngine = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<LabState>(() => {
    const params = new URLSearchParams(searchParams);
    if (params.toString()) {
      const decoded: Partial<LabState> = {};
      const campaign = params.get("campaign");
      if (campaign && campaign in labCampaigns) decoded.campaign = campaign;
      const pageType = params.get("pageType");
      if (pageType) decoded.pageType = pageType as PageType;
      const font = params.get("font");
      if (font) decoded.font = font as FontName;
      const fontSize = params.get("fontSize");
      if (fontSize) decoded.fontSize = Number(fontSize);
      const colors = safeJsonParse(params.get("themeColors"));
      if (colors) decoded.themeColors = colors;
      const title = params.get("title");
      if (title) decoded.heroTitle = decodeURIComponent(title);
      const subtitle = params.get("subtitle");
      if (subtitle) decoded.heroSubtitle = decodeURIComponent(subtitle);
      const cta = params.get("cta");
      if (cta) decoded.ctaButtonText = decodeURIComponent(cta);
      return { ...defaultState, ...decoded };
    }

    const storedState = safeJsonParse(
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE_KEY)
        : null
    );
    return storedState ? { ...defaultState, ...storedState } : defaultState;
  });

  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    const stateToUrl = {
      campaign: state.campaign,
      pageType: state.pageType,
      font: state.font,
      fontSize: state.fontSize,
      themeColors: JSON.stringify(state.themeColors),
      heroTitle: state.heroTitle,
      heroSubtitle: state.heroSubtitle,
      ctaButtonText: state.ctaButtonText,
    };

    Object.entries(stateToUrl).forEach(([key, value]) => {
      const defaultValue =
        key === "themeColors"
          ? JSON.stringify(defaultState.themeColors)
          : defaultState[key as keyof LabState];
      if (String(value) !== String(defaultValue)) {
        params.set(key, String(value));
      }
    });

    const newPreviewUrl = `/developers/branding/preview?${params.toString()}`;
    setPreviewUrl(newPreviewUrl);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state, pathname, router]);

  const handleStateChange = useCallback(
    <K extends keyof LabState>(key: K, value: LabState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleColorChange = useCallback(
    (colorName: keyof CampaignTheme["colors"], newHex: string) => {
      setState((prev) => ({
        ...prev,
        themeColors: { ...prev.themeColors, [colorName]: newHex },
      }));
    },
    []
  );

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("¡URL de la vista actual copiada al portapapeles!");
  }, []);

  const generateConfigCode = useCallback(() => {
    // ... la lógica de exportación se puede adaptar después para incluir los nuevos campos ...
    alert("Función de exportación pendiente de actualizar.");
  }, []);

  return {
    state,
    viewport,
    setViewport,
    previewUrl,
    handleStateChange,
    handleColorChange,
    handleShare,
    generateConfigCode,
  };
};
// RUTA: src/app/(dev)/developers/branding/useLabEngine.ts
