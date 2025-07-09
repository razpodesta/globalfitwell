// RUTA: src/app/(components)/sections/GuaranteeSection.tsx
import { Container } from "@/app/(components)/ui/Container";
import Image from "next/image";

interface GuaranteeSectionProps {
  title: string;
  text: string;
  imageUrl: string;
}

export function GuaranteeSection({
  title,
  text,
  imageUrl,
}: GuaranteeSectionProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 border-2 border-brand-green rounded-lg shadow-lg bg-green-50/50">
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt="Selo de Garantia"
              width={150}
              height={150}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-text-dark">{title}</h2>
            <p className="mt-4 text-brand-text-light">{text}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
