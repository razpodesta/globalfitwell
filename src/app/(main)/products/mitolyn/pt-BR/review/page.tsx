// RUTA: src/app/(main)/products/mitolyn/pt-BR/review/page.tsx
import { Container } from "@/app/(components)/ui/Container";
import { Button } from "@/app/(components)/ui/Button";
import { FadeIn } from "@/app/(components)/ui/FadeIn";
import { TextSection } from "@/app/(components)/sections/TextSection";
import Image from "next/image";
import { DoubleScrollingBanner } from "@/app/(components)/sections/DoubleScrollingBanner";
import { IngredientAnalysis } from "@/app/(components)/sections/IngredientAnalysis";
import { TestimonialGrid } from "@/app/(components)/sections/TestimonialGrid";
import { GuaranteeSection } from "@/app/(components)/sections/GuaranteeSection";
import { FaqAccordion } from "@/app/(components)/sections/FaqAccordion";
import { siteContent, affiliateLink } from "@/config/site"; // <-- RUTA CORREGIDA

function AuthorBox({
  name,
  credentials,
  imageUrl,
}: {
  name: string;
  credentials: string;
  imageUrl: string;
}) {
  return (
    <div className="mt-12 mb-16">
      <Container>
        <div className="flex items-center gap-4 max-w-md mx-auto p-4 bg-brand-bg-light border border-gray-200 rounded-lg shadow-sm">
          <Image
            src={imageUrl}
            alt={`Foto de ${name}`}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-brand-text-dark">{name}</p>
            <p className="text-sm text-brand-text-light">{credentials}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
function BenefitsSection({
  benefits,
  title,
}: {
  benefits: string[];
  title: string;
}) {
  return (
    <TextSection className="bg-brand-bg-light">
      <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-colors duration-300"
          >
            <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-brand-success flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <p className="text-lg text-brand-text-light">{benefit}</p>
          </div>
        ))}
      </div>
    </TextSection>
  );
}

export default function ReviewPage_ptBR() {
  const content = siteContent["pt-BR"].reviewPage;

  return (
    <>
      <FadeIn>
        <TextSection className="text-center pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text-dark leading-tight max-w-4xl mx-auto">
            {content.intro.openingQuestion}
          </h1>
          <div className="max-w-3xl mx-auto mt-6">
            {content.intro.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-brand-text-light mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Button
              href={affiliateLink}
              className="text-xl px-12 py-4 bg-brand-action hover:bg-brand-action-dark focus-visible:ring-brand-action text-white hover:animate-jiggle"
            >
              {content.intro.cta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <AuthorBox {...content.author} />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-white">
          <div className="prose lg:prose-xl mx-auto text-center">
            <h2>{content.problemSection.title}</h2>
            {content.problemSection.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <DoubleScrollingBanner {...content.doubleScrollingBannerSection} />
      </FadeIn>
      <FadeIn>
        <IngredientAnalysis
          title={content.ingredientSection.title}
          ingredients={content.ingredientSection.ingredients}
        />
      </FadeIn>
      <FadeIn>
        <BenefitsSection
          benefits={content.intro.benefits}
          title="Principais Benefícios"
        />
      </FadeIn>
      <FadeIn>
        <TestimonialGrid
          title={content.testimonialSection.title}
          testimonials={content.testimonialSection.testimonials}
        />
      </FadeIn>
      <FadeIn>
        <GuaranteeSection {...content.guaranteeSection} />
      </FadeIn>
      <FadeIn>
        <FaqAccordion
          title={content.faqSection.title}
          faqs={content.faqSection.faqs}
        />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-gray-800 text-white text-center">
          <h2 className="text-3xl font-bold">{content.finalCta.title}</h2>
          <div className="mt-8">
            <Button
              href={affiliateLink}
              className="bg-brand-cta-buy text-brand-text-dark font-bold hover:bg-brand-cta-buy-dark shadow-lg shadow-yellow-500/30 hover:scale-110 transition-all duration-300 ease-in-out"
            >
              {content.finalCta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
    </>
  );
}
// RUTA: src/app/(main)/products/mitolyn/pt-BR/review/page.tsx
