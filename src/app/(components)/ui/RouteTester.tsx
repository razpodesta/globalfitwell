// RUTA: src/app/(components)/ui/RouteTester.tsx
"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TestTube, ExternalLink, Palette, ChevronRight } from "lucide-react";
import { siteContent } from "@/config/site";

/**
 * @devonly
 * @description Componente exclusivo para desarrollo que permite navegar rápidamente entre
 * todas las rutas del proyecto y acceder a la guía de estilo.
 * Se posiciona de forma fija en la pantalla y es visualmente distintivo.
 * NO SE INCLUYE EN PRODUCCIÓN.
 */
export function RouteTester() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Genera dinámicamente la lista completa y actualizada de rutas
  const locales = Object.keys(siteContent);
  const routes = [
    // --- Sección de Desarrollo ---
    {
      group: "DEV TOOLS",
      items: [
        {
          name: "Guía de Estilo / Branding",
          path: "/developers/branding",
          icon: <Palette className="h-4 w-4 text-indigo-500" />,
        },
      ],
    },
    // --- Sección de Páginas de Producto ---
    {
      group: "PÁGINAS DE PRODUCTO",
      items: locales.flatMap((loc) => [
        {
          name: `Bridge Page (${loc.toUpperCase()})`,
          path: `/products/mitolyn/${loc}`,
          icon: null,
        },
        {
          name: `Review Page (${loc.toUpperCase()})`,
          path: `/products/mitolyn/${loc}/review`,
          icon: null,
        },
      ]),
    },
    // --- Sección de Páginas Legales ---
    {
      group: "PÁGINAS LEGALES",
      items: [
        { name: "Termos de Uso", path: "/termos", icon: null },
        { name: "Política de Privacidade", path: "/privacidade", icon: null },
        { name: "Política de Cookies", path: "/cookies", icon: null },
      ],
    },
  ];

  const handleNavigation = (path: string) => {
    if (!path) return;
    router.push(path);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="fixed top-28 left-4 z-[9999]">
      {/* Botón Rojo Parpadeante con Texto */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-pure-red px-4 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 animate-pulse"
        aria-label="Abrir menú de rutas de prueba"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <TestTube className="h-5 w-5" />
        <span className="font-bold text-sm">RUTAS</span>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 origin-top-left rounded-md bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5">
          <div className="max-h-[70vh] overflow-y-auto">
            {routes.map((routeGroup) => (
              <Fragment key={routeGroup.group}>
                <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase text-gray-500">
                  {routeGroup.group}
                </div>
                {routeGroup.items.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => handleNavigation(route.path)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      pathname === route.path
                        ? "bg-brand-primary/10 font-semibold text-brand-primary"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2">
                      {route.icon || (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                      <span>{route.name}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 opacity-50" />
                  </button>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// RUTA: src/app/(components)/ui/RouteTester.tsx
