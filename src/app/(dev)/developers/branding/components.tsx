// RUTA: src/app/(dev)/developers/branding/components.tsx
/**
 * @file Componentes de UI para la Campaign Design Suite.
 * @description Contiene sub-componentes para construir la interfaz del laboratorio,
 * incluyendo Header con controles de viewport, Panel de Control con acordeones,
 * y `RouteMenu`.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Share2,
  Download,
  Settings,
  Type,
  TestTube,
  ChevronUp,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import { RouteMenu } from "@/components/dev/RouteTester";
import { fontOptions, labCampaigns, FontName } from "./lab.config";
import { LabState, PageType, Viewport } from "./useLabEngine";

// --- Interfaces de Componentes ---
interface LabHeaderProps {
  onShare: () => void;
  viewport: Viewport;
  onViewportChange: (v: Viewport) => void;
}
interface ControlPanelProps {
  state: LabState;
  onStateChange: <K extends keyof LabState>(key: K, value: LabState[K]) => void;
  onExport: () => void;
}
interface BridgePageControlsProps {
  state: LabState;
  onStateChange: <K extends keyof LabState>(key: K, value: LabState[K]) => void;
}
interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// --- Componentes de Layout del Laboratorio ---
export const LabHeader = ({
  onShare,
  viewport,
  onViewportChange,
}: LabHeaderProps) => {
  const [isRouteMenuOpen, setRouteMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setRouteMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white p-2 shadow-md z-30 flex justify-between items-center h-16 shrink-0">
      <h1 className="text-lg font-bold ml-4">Campaign Design Suite</h1>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 p-1 bg-gray-700 rounded-lg">
        <button
          onClick={() => onViewportChange("desktop")}
          className={`p-2 rounded-md transition-colors ${
            viewport === "desktop" ? "bg-indigo-500" : "hover:bg-gray-600"
          }`}
          title="Desktop View"
        >
          <Monitor size={18} />
        </button>
        <button
          onClick={() => onViewportChange("tablet")}
          className={`p-2 rounded-md transition-colors ${
            viewport === "tablet" ? "bg-indigo-500" : "hover:bg-gray-600"
          }`}
          title="Tablet View"
        >
          <Tablet size={18} />
        </button>
        <button
          onClick={() => onViewportChange("mobile")}
          className={`p-2 rounded-md transition-colors ${
            viewport === "mobile" ? "bg-indigo-500" : "hover:bg-gray-600"
          }`}
          title="Mobile View"
        >
          <Smartphone size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 mr-4">
        <span className="text-xs font-semibold opacity-75">
          Powered by MetaShark
        </span>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setRouteMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            <TestTube size={16} /> DEV ROUTES
          </button>
          {isRouteMenuOpen && (
            <RouteMenu onNavigate={() => setRouteMenuOpen(false)} />
          )}
        </div>
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors"
        >
          <Share2 size={16} /> Compartir
        </button>
      </div>
    </header>
  );
};

export const LabFooter = () => (
  <footer className="bg-gray-200 text-gray-500 p-2 text-center text-xs z-20 border-t h-8 shrink-0">
    © {new Date().getFullYear()} Entorno de Desarrollo. No para uso en
    producción.
  </footer>
);

// --- Panel de Control Principal ---
export const ControlPanel = ({
  state,
  onStateChange,
  onExport,
}: ControlPanelProps) => (
  <aside className="w-96 h-full bg-white shadow-lg p-4 overflow-y-auto shrink-0">
    <Accordion title="Configuración Global" icon={<Settings />} defaultOpen>
      <div className="space-y-3 p-2">
        <div>
          <label
            htmlFor="campaign-select"
            className="text-xs font-semibold text-gray-600"
          >
            Campaña Activa
          </label>
          <select
            id="campaign-select"
            value={state.campaign}
            onChange={(e) =>
              onStateChange(
                "campaign",
                e.target.value as keyof typeof labCampaigns
              )
            }
            className="w-full p-2 mt-1 text-sm border-gray-300 rounded shadow-sm"
          >
            {Object.keys(labCampaigns).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">
            Tipo de Página
          </label>
          <PageTypeTabs
            currentPage={state.pageType}
            onPageChange={(p) => onStateChange("pageType", p)}
          />
        </div>
      </div>
    </Accordion>

    <Accordion title="Contenido de Página" icon={<Type />}>
      {state.pageType === "bridge" && (
        <BridgePageControls state={state} onStateChange={onStateChange} />
      )}
      {state.pageType === "review" && (
        <div className="p-4 my-2 text-sm bg-blue-50 border-l-4 border-blue-400 text-blue-700">
          Controles para la Review Page en desarrollo...
        </div>
      )}
      {state.pageType === "blog" && (
        <div className="p-4 my-2 text-sm bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          Controles para el Blog en desarrollo...
        </div>
      )}
    </Accordion>

    <div className="mt-6 px-2">
      <button
        onClick={onExport}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors"
      >
        <Download size={16} />
        Exportar Código de Configuración
      </button>
    </div>
  </aside>
);

// --- Sub-componentes del Panel de Control ---
const BridgePageControls = ({
  state,
  onStateChange,
}: BridgePageControlsProps) => (
  <div className="space-y-4 pt-2">
    <div>
      <label
        htmlFor="font-select"
        className="text-xs font-semibold text-gray-600"
      >
        Fuente Global
      </label>
      <select
        id="font-select"
        value={state.font}
        onChange={(e) => onStateChange("font", e.target.value as FontName)}
        className="w-full p-2 mt-1 text-sm border-gray-300 rounded shadow-sm"
      >
        {Object.values(fontOptions).map((font) => (
          <option key={font.name} value={font.name}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label
        htmlFor="hero-title"
        className="text-xs font-semibold text-gray-600"
      >
        Título del Hero
      </label>
      <textarea
        id="hero-title"
        value={state.heroTitle}
        onChange={(e) => onStateChange("heroTitle", e.target.value)}
        className="w-full p-2 mt-1 text-sm border-gray-300 rounded shadow-sm min-h-[70px]"
      />
    </div>
    <div>
      <label
        htmlFor="hero-subtitle"
        className="text-xs font-semibold text-gray-600"
      >
        Subtítulo del Hero
      </label>
      <textarea
        id="hero-subtitle"
        value={state.heroSubtitle}
        onChange={(e) => onStateChange("heroSubtitle", e.target.value)}
        className="w-full p-2 mt-1 text-sm border-gray-300 rounded shadow-sm min-h-[90px]"
      />
    </div>
    <div>
      <label htmlFor="cta-text" className="text-xs font-semibold text-gray-600">
        Texto del Botón CTA
      </label>
      <input
        type="text"
        id="cta-text"
        value={state.ctaButtonText}
        onChange={(e) => onStateChange("ctaButtonText", e.target.value)}
        className="w-full p-2 mt-1 text-sm border-gray-300 rounded shadow-sm"
      />
    </div>
  </div>
);

const PageTypeTabs = ({
  currentPage,
  onPageChange,
}: {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}) => (
  <div className="w-full mt-2">
    <nav className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {[
        { id: "bridge", label: "Bridge" },
        { id: "review", label: "Review" },
        { id: "blog", label: "Blog" },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onPageChange(tab.id as PageType)}
          className={`w-full rounded-md py-1.5 text-xs font-medium transition-colors ${
            currentPage === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:bg-white/50 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
);

const Accordion = ({
  title,
  icon,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {icon}
          {title}
        </h3>
        <ChevronUp
          className={`transition-transform text-gray-500 ${
            isOpen ? "" : "rotate-180"
          }`}
          size={18}
        />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

// --- MEJORAS FUTURAS ---
// 1. **Componente ColorPicker**: Reintegrar el componente `ColorInputWithPicker` para permitir
//    la edición de colores de la campaña (header, footer, etc.) directamente desde el panel.
// 2. **Arrastrar y Soltar Secciones**: Implementar una librería como `dnd-kit` para permitir
//    reordenar las secciones de la página desde el panel, lo que modificaría un array `sections`
//    en el estado del laboratorio.

// RUTA: src/app/(dev)/developers/branding/components.tsx
