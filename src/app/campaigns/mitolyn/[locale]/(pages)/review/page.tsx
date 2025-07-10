// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/review/page.tsx
"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
// CORRECCIÓN: La ruta ahora sube tres niveles para encontrar el archivo de configuración.
import { mitolynConfig } from "../../../campaign.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextSection } from "@/components/sections/TextSection";
import {
  DoubleScrollingBanner,
  LogoItem,
} from "@/components/sections/DoubleScrollingBanner";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { BenefitsSection } from "@/components/sections/BenefitsSection";

const AuthorBox = ({
  name,
  credentials,
  imageUrl,
}: {
  name: string;
  credentials: string;
  imageUrl: string;
}) => (
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

export default function MitolynReviewPage() {
  const params = useParams();
  const locale = params.locale as string;

  const content = mitolynConfig.locales[locale]?.reviewPage;
  const assets = mitolynConfig.locales[locale]?.assets;

  if (!content || !assets || !content.intro.openingQuestion) {
    notFound();
  }

  const doubleScrollingBannerData = {
    testimonials: content.doubleScrollingBannerSection.testimonials.map(
      (t: { name: string; rating: number }, i: number) => ({
        ...t,
        imageSrc: assets.testimonialPhotos[i],
        altText: `Testimonial from ${t.name}`,
      })
    ),
    logos: content.doubleScrollingBannerSection.logos.map(
      (logo: { imageSrc: string; altText: string }): LogoItem => ({
        imageSrc: logo.imageSrc,
        altText: logo.altText,
      })
    ),
  };

  const testimonialGridData = {
    title: content.testimonialSection.title,
    testimonials: content.testimonialSection.testimonials.map(
      (t: { quote: string; author: string; location: string }, i: number) => ({
        ...t,
        imageSrc: assets.testimonialPhotos[i],
      })
    ),
  };

  return (
    <>
      <FadeIn>
        <TextSection className="text-center pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text-dark leading-tight max-w-4xl mx-auto">
            {content.intro.openingQuestion}
          </h1>
          <div className="max-w-3xl mx-auto mt-6">
            {content.intro.paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-lg text-brand-text-light mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Button
              href={mitolynConfig.affiliateUrl}
              className="text-xl px-12 py-4 bg-brand-action hover:bg-brand-action-dark text-white hover:animate-jiggle"
            >
              {content.intro.cta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <AuthorBox {...content.author} imageUrl={assets.authorPhoto} />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-white">
          <div className="prose lg:prose-xl mx-auto text-center">
            <h2>{content.problemSection.title}</h2>
            {content.problemSection.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <DoubleScrollingBanner {...doubleScrollingBannerData} />
      </FadeIn>
      <FadeIn>
        <IngredientAnalysis {...content.ingredientSection} />
      </FadeIn>
      <FadeIn>
        <BenefitsSection
          title="Main Benefits"
          benefits={content.intro.benefits}
          subtitle=""
        />
      </FadeIn>
      <FadeIn>
        <TestimonialGrid {...testimonialGridData} />
      </FadeIn>
      <FadeIn>
        <GuaranteeSection
          {...content.guaranteeSection}
          imageUrl={assets.guaranteeSeal}
        />
      </FadeIn>
      <FadeIn>
        <FaqAccordion {...content.faqSection} />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-gray-800 text-white text-center">
          <h2 className="text-3xl font-bold">{content.finalCta.title}</h2>
          <div className="mt-8">
            <Button
              href={mitolynConfig.affiliateUrl}
              className="bg-brand-cta-buy text-brand-text-dark font-bold hover:bg-brand-cta-buy-dark shadow-lg shadow-yellow-500/30 hover:scale-110"
            >
              {content.finalCta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
    </>
  );
}
// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/review/page.tsx
