// RUTA: src/app/(dev)/developers/branding/page.tsx
/**
 * @file Campaign Design Suite Main Page
 * @description Main entry point for the branding lab. Its visibility in production
 * is controlled by the NEXT_PUBLIC_ENABLE_DEV_SUITE_IN_PROD environment variable.
 *
 * @author L.I.A Legacy
 * @version 1.3.0 (Feature Flag Implementation)
 */
"use client";

import { RouteMenu } from "@/components/dev/RouteTester";
import { Monitor, Share2, Smartphone, Tablet, TestTube } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { ControlPanel } from "./components";
import { fontOptions } from "./lab.config";
import { LabState, useLabEngine, Viewport } from "./useLabEngine";

// --- Definiciones de Componentes Locales (LabHeader, LabFooter) sin cambios ---
interface LabHeaderProps {
  onShare: () => void;
  viewport: Viewport;
  onViewportChange: (v: Viewport) => void;
}

const LabHeader = ({ onShare, onViewportChange, viewport }: LabHeaderProps) => {
  const [isRouteMenuOpen, setRouteMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setRouteMenuOpen(false);
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

const LabFooter = () => (
  <footer className="bg-gray-200 text-gray-500 p-2 text-center text-xs z-20 border-t h-8 shrink-0">
    © {new Date().getFullYear()} Entorno de Desarrollo. No para uso en
    producción.
  </footer>
);
// --- Fin de Definiciones de Componentes Locales ---

const viewportClasses: Record<Viewport, string> = {
  desktop: "w-full max-w-[1400px]",
  tablet: "w-full max-w-[768px]",
  mobile: "w-full max-w-[420px]",
};

function BrandingLab() {
  const {
    state,
    viewport,
    setViewport,
    previewUrl,
    handleStateChange,
    handleColorChange,
    handleShare,
    generateConfigCode,
  } = useLabEngine();
  const activeFontClass = fontOptions[state.font]?.className || "";

  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${activeFontClass}`}>
      <LabHeader
        onShare={handleShare}
        viewport={viewport}
        onViewportChange={setViewport}
      />
      <div className="flex flex-1 overflow-hidden">
        <ControlPanel
          state={state as LabState}
          onStateChange={handleStateChange}
          onColorChange={handleColorChange}
          onExport={generateConfigCode}
        />
        <main className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-gray-700/50">
          <div
            className={`relative bg-white rounded-lg shadow-2xl transition-all duration-300 ease-in-out ${viewportClasses[viewport]}`}
            style={{ height: "calc(100% - 2rem)" }}
          >
            <div className="w-full h-full">
              {previewUrl && (
                <iframe
                  key={previewUrl}
                  src={previewUrl}
                  className="w-full h-full border-0 rounded-lg"
                  title="Campaign Preview"
                />
              )}
            </div>
          </div>
        </main>
      </div>
      <LabFooter />
    </div>
  );
}

export default function BrandingPage() {
  // --- INICIO DE LA MODIFICACIÓN ---
  // La visibilidad de la suite ahora se controla por una variable de entorno.
  // Esto permite activarla en producción para demostraciones o colaboradores externos.
  const isDevSuiteEnabled =
    process.env.NEXT_PUBLIC_ENABLE_DEV_SUITE_IN_PROD === "true";

  // La suite solo se muestra si estamos en desarrollo O si la bandera está explícitamente activada.
  if (process.env.NODE_ENV === "production" && !isDevSuiteEnabled) {
    return null;
  }
  // --- FIN DE LA MODIFICACIÓN ---

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-lg font-semibold">
          Cargando Suite de Diseño...
        </div>
      }
    >
      <BrandingLab />
    </Suspense>
  );
}
// RUTA: src/app/(dev)/developers/branding/page.tsx
