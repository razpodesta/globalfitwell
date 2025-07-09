// RUTA: src/app/(components)/sections/Hero.tsx
import { Container } from "@/app/(components)/ui/Container";

interface HeroProps {
  title: string;
  subtitle: string;
}

/**
 * A seção "Hero" da página. Exibe o título principal e o subtítulo
 * para capturar a atenção do usuário imediatamente.
 * @param title - O título principal (H1) da página.
 * @param subtitle - O parágrafo de suporte abaixo do título.
 */
export function Hero({ title, subtitle }: HeroProps) {
  return (
    // O tracking "tight" cria uma headline de maior impacto visual.
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
// RUTA: src/app/(components)/sections/Hero.tsx
