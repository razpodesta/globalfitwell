// RUTA: src/app/(dev)/developers/branding/components.tsx
"use client";

import React, { useState } from "react";
import {
  Settings,
  Type,
  Palette,
  ChevronUp,
  Clipboard,
  Check,
  LayoutTemplate,
} from "lucide-react";
import { ColorResult, SketchPicker } from "react-color";
import { fontOptions, FontName } from "./lab.config";
import { LabState, PageType } from "./useLabEngine";
import { CampaignTheme } from "@/lib/types/campaign.d";

// --- Interfaces de Props ---

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

interface FontSizeControlProps {
  value: number;
  onChange: (value: number) => void;
}

interface PageTypeTabsProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

interface BridgePageControlsProps {
  state: LabState;
  onStateChange: <K extends keyof LabState>(key: K, value: LabState[K]) => void;
}

interface ControlPanelProps {
  state: LabState;
  onStateChange: <K extends keyof LabState>(key: K, value: LabState[K]) => void;
  onColorChange: (name: keyof CampaignTheme["colors"], hex: string) => void;
  onExport: () => void;
}

// --- Componentes de UI del Panel ---

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
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {icon} {title}
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

const ColorPicker = ({ label, color, onChange }: ColorPickerProps) => {
  const [displayPicker, setDisplayPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setDisplayPicker(true)}
          className="h-8 w-8 cursor-pointer rounded border border-gray-300 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 px-2 font-mono text-xs border-gray-300 rounded shadow-sm"
        />
        <button onClick={handleCopy} className="p-2 h-8 bg-gray-100 rounded">
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
        </button>
      </div>
      {displayPicker && (
        <div className="absolute z-10 top-full mt-2 left-0">
          <div
            className="fixed inset-0"
            onClick={() => setDisplayPicker(false)}
          />
          <SketchPicker
            color={color}
            onChange={(c: ColorResult) => onChange(c.hex)}
          />
        </div>
      )}
    </div>
  );
};

const FontSizeControl = ({ value, onChange }: FontSizeControlProps) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">
      Tamaño de Fuente Base (px)
    </label>
    <div className="flex items-center gap-2 mt-1">
      <input
        type="range"
        min="12"
        max="20"
        step="0.5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 p-2 text-sm text-center border-gray-300 rounded shadow-sm"
      />
    </div>
  </div>
);

const PageTypeTabs = ({ currentPage, onPageChange }: PageTypeTabsProps) => (
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

const BridgePageControls = ({
  state,
  onStateChange,
}: BridgePageControlsProps) => (
  <div className="space-y-4 pt-2 p-2">
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

// --- PANEL DE CONTROL PRINCIPAL ---
export const ControlPanel = ({
  state,
  onStateChange,
  onColorChange,
}: ControlPanelProps) => (
  <aside className="w-96 h-full bg-white shadow-lg p-4 overflow-y-auto shrink-0">
    <Accordion title="Configuración Global" icon={<Settings />} defaultOpen>
      <div className="space-y-3 p-2">
        <label
          htmlFor="campaign-select"
          className="text-xs font-semibold text-gray-600"
        >
          Campaña Activa
        </label>
        {/* Aquí iría el selector de campaña, si hubiera más de una */}
        <div className="w-full p-2 mt-1 text-sm bg-gray-100 rounded">
          {state.campaign}
        </div>
        <label className="text-xs font-semibold text-gray-600">
          Tipo de Página
        </label>
        <PageTypeTabs
          currentPage={state.pageType}
          onPageChange={(p) => onStateChange("pageType", p)}
        />
      </div>
    </Accordion>

    <Accordion title="Tipografía" icon={<Type />} defaultOpen>
      <div className="space-y-4 p-2">
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
        <FontSizeControl
          value={state.fontSize}
          onChange={(v: number) => onStateChange("fontSize", v)}
        />
      </div>
    </Accordion>

    <Accordion title="Paleta de Colores" icon={<Palette />}>
      <div className="grid grid-cols-1 gap-4 p-2">
        {Object.entries(state.themeColors).map(([key, value]) => (
          <ColorPicker
            key={key}
            label={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            color={value}
            onChange={(hex) =>
              onColorChange(key as keyof CampaignTheme["colors"], hex)
            }
          />
        ))}
      </div>
    </Accordion>

    <Accordion title="Contenido de Página" icon={<LayoutTemplate />}>
      {state.pageType === "bridge" && (
        <BridgePageControls state={state} onStateChange={onStateChange} />
      )}
      {/* Añadir aquí controles para otras páginas cuando sea necesario */}
    </Accordion>
  </aside>
);
// RUTA: src/app/(dev)/developers/branding/components.tsx
