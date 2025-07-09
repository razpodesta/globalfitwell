// RUTA: src/app/(dev)/developers/branding/page.tsx
/**
 * @file Página Principal del Laboratorio Visual de Branding (Orquestador).
 * @description Punto de entrada para la suite de diseño. Orquesta el hook de lógica,
 * la UI del panel de control y el canvas de previsualización con el iframe.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
"use client";

import React, { Suspense } from "react";
import { useLabEngine, Viewport } from "./useLabEngine";
import { LabHeader, LabFooter, ControlPanel } from "./components";
import { fontOptions } from "./lab.config";

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
          state={state}
          onStateChange={handleStateChange}
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
  if (process.env.NODE_ENV !== "development") return null;
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

// --- MEJORAS FUTURAS ---
// 1. **Renderizado Condicional de Controles**: El panel de control (`ControlPanel`) podría
//    ser más inteligente, mostrando campos de edición diferentes basados en el `state.pageType`
//    (ej. controles para la sección de "Ingredientes" solo si se selecciona la "Review Page").
// 2. **Comunicación Iframe <-> Panel**: Implementar `window.postMessage` para permitir que, por ejemplo,
//    un clic en un elemento dentro de la preview resalte el control correspondiente en el panel.

// RUTA: src/app/(dev)/developers/branding/page.tsx
