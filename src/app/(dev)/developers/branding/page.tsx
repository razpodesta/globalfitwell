// RUTA: src/app/(dev)/developers/branding/page.tsx
"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import { useLabEngine, Viewport } from "./useLabEngine";
import { ControlPanel } from "./components";
import { fontOptions } from "./lab.config";
import { Share2, TestTube, Monitor, Tablet, Smartphone } from "lucide-react";
import { RouteMenu } from "@/components/dev/RouteTester";
import { LabState } from "./useLabEngine";

// ... (El resto del código del archivo sin el Suspense wrapper) ...

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
  if (process.env.NODE_ENV !== "development") return null;
  // AHORA SIN EL SUSPENSE WRAPPER, YA QUE EL PROBLEMA NO ESTÁ AQUÍ
  return <BrandingLab />;
}
