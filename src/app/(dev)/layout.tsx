// RUTA: src/app/(dev)/layout.tsx
/**
 * @file Layout para Herramientas de Desarrollo
 * @description Este layout minimalista se aplica solo a las rutas dentro del grupo (dev).
 * No incluye Header, Footer ni ningún otro elemento de la UI principal del sitio,
 * proporcionando un lienzo en blanco para las herramientas de desarrollo.
 */
export default function DevToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simplemente renderiza a los hijos sin ninguna envoltura adicional.
  return <>{children}</>;
}
// RUTA: src/app/(dev)/layout.tsx
