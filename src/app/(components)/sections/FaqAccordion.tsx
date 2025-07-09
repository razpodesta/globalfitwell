// RUTA: src/app/(components)/sections/FaqAccordion.tsx
import { AccordionItem } from "@/app/(components)/ui/Accordion";
import { Container } from "@/app/(components)/ui/Container";

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title: string;
  faqs: Faq[];
}

export function FaqAccordion({ title, faqs }: FaqAccordionProps) {
  return (
    <section className="py-16 bg-brand-bg-light">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
