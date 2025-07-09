// RUTA: src/app/(components)/sections/TestimonialGrid.tsx
import { Container } from "@/app/(components)/ui/Container";
import { TestimonialCard } from "@/app/(components)/ui/TestimonialCard";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  imageSrc: string;
}

interface TestimonialGridProps {
  title: string;
  testimonials: Testimonial[];
}

export function TestimonialGrid({ title, testimonials }: TestimonialGridProps) {
  return (
    <section className="py-16 bg-brand-bg-light">
      <Container>
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
