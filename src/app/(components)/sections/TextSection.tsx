// RUTA: src/app/(components)/sections/TextSection.tsx
import { Container } from "@/app/(components)/ui/Container";
import React from "react";

interface TextSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Um componente de seção genérico para exibir conteúdo de texto dentro de um Container.
 * É um wrapper reutilizável para manter a consistência do espaçamento vertical.
 * @param children - O conteúdo a ser renderizado dentro da seção.
 * @param className - Classes CSS adicionais para personalizar a seção.
 */
export function TextSection({ children, className = "" }: TextSectionProps) {
  // Combina as classes base com quaisquer classes personalizadas fornecidas.
  const sectionClasses = ["py-16", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClasses}>
      <Container>{children}</Container>
    </section>
  );
}
// RUTA: src/app/(components)/sections/TextSection.tsx
