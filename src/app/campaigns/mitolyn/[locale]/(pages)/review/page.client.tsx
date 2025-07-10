// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/review/page.client.tsx
/**
 * @file Client Component for the Mitolyn Review Page.
 * @description Renders the UI for the review page. This component is designed to be
 * driven entirely by the content object it receives as a prop. It handles all
 * client-side interactivity.
 *
 * @author Your Name
 * @version 1.0.0
 */
"use client";

import Image from "next/image";
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
import type { LocaleContent } from "@/lib/types/campaign.d";

interface ReviewPageProps {
  content: LocaleContent;
  affiliateUrl: string;
}

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
          alt={`Photo of ${name}`}
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

export default function MitolynReviewPageClient({
  content,
  affiliateUrl,
}: ReviewPageProps) {
  const reviewContent = content.reviewPage;
  const assets = content.assets;

  if (!reviewContent.intro.openingQuestion) {
    return (
      <TextSection>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">In-Depth Review Coming Soon...</h1>
          <p className="mt-4 text-lg text-brand-text-light">
            Our team is currently preparing a detailed analysis for this
            section.
          </p>
        </div>
      </TextSection>
    );
  }

  const doubleScrollingBannerData = {
    testimonials: reviewContent.doubleScrollingBannerSection.testimonials.map(
      (t, i) => ({
        ...t,
        imageSrc: assets.testimonialPhotos[i] || "",
        altText: `Testimonial from ${t.name}`,
      })
    ),
    logos: reviewContent.doubleScrollingBannerSection.logos.map(
      (logo): LogoItem => ({ imageSrc: logo.imageSrc, altText: logo.altText })
    ),
  };

  const testimonialGridData = {
    title: reviewContent.testimonialSection.title,
    testimonials: reviewContent.testimonialSection.testimonials.map((t, i) => ({
      ...t,
      imageSrc: assets.testimonialPhotos[i] || "",
    })),
  };

  return (
    <>
      <FadeIn>
        <TextSection className="text-center pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text-dark leading-tight max-w-4xl mx-auto">
            {reviewContent.intro.openingQuestion}
          </h1>
          <div className="max-w-3xl mx-auto mt-6">
            {reviewContent.intro.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-brand-text-light mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Button
              href={affiliateUrl}
              className="text-xl px-12 py-4 bg-brand-action hover:bg-brand-action-dark text-white hover:animate-jiggle"
            >
              {reviewContent.intro.cta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <AuthorBox {...reviewContent.author} imageUrl={assets.authorPhoto} />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-white">
          <div className="prose lg:prose-xl mx-auto text-center">
            <h2>{reviewContent.problemSection.title}</h2>
            {reviewContent.problemSection.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </TextSection>
      </FadeIn>
      <FadeIn>
        <DoubleScrollingBanner {...doubleScrollingBannerData} />
      </FadeIn>
      <FadeIn>
        <IngredientAnalysis {...reviewContent.ingredientSection} />
      </FadeIn>
      <FadeIn>
        <BenefitsSection
          title="Main Benefits"
          benefits={reviewContent.intro.benefits}
          subtitle=""
        />
      </FadeIn>
      <FadeIn>
        <TestimonialGrid {...testimonialGridData} />
      </FadeIn>
      <FadeIn>
        <GuaranteeSection
          {...reviewContent.guaranteeSection}
          imageUrl={assets.guaranteeSeal}
        />
      </FadeIn>
      <FadeIn>
        <FaqAccordion {...reviewContent.faqSection} />
      </FadeIn>
      <FadeIn>
        <TextSection className="bg-gray-800 text-white text-center">
          <h2 className="text-3xl font-bold">{reviewContent.finalCta.title}</h2>
          <div className="mt-8">
            <Button
              href={affiliateUrl}
              className="bg-brand-cta-buy text-brand-text-dark font-bold hover:bg-brand-cta-buy-dark shadow-lg shadow-yellow-500/30 hover:scale-110"
            >
              {reviewContent.finalCta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>
    </>
  );
}
