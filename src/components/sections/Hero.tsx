// RUTA: src/components/sections/Hero.tsx
/**
 * @file Sección Hero
 * @description Componente principal de la página que muestra el título (H1) y
 * el subtítulo para capturar la atención del usuario inmediatamente. Es el
 * componente más importante para la primera impresión.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import { Container } from "@/components/ui/Container";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    // El tracking "tight" crea una headline de mayor impacto visual.
    <section className="bg-brand-bg-white pt-12 pb-16 text-center">
      <Container className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text-dark leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-text-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      </Container>
    </section>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Fondo de imagen/video**: El componente podría aceptar una prop `backgroundImage` o
//    `backgroundVideo` para crear héroes más inmersivos y visualmente atractivos,
//    con un overlay para garantizar la legibilidad del texto.
// 2. **CTA en el Hero**: Añadir un `slot` opcional para un botón de Call-to-Action
//    directamente debajo del subtítulo. Esto podría ser útil para páginas de venta
//    más directas (VSL) donde el CTA principal debe estar "above the fold".

// RUTA: src/components/sections/Hero.tsx
