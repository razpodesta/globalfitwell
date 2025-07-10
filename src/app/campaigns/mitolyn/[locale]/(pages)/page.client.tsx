// RUTA: src/app/campaigns/mitolyn/[locale]/(pages)/page.client.tsx
/**
 * @file Client Component for the Mitolyn Bridge Page.
 * @description Renders the user-facing UI for the bridge page, including all
 * marketing copy, benefit sections, and calls-to-action. This component is
 * designed to be driven entirely by the content object it receives as a prop.
 *
 * @author Your Name
 * @version 2.1.0
 */
"use client";

import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TextSection } from "@/components/sections/TextSection";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";
import type { LocaleContent } from "@/lib/types/campaign.d";

export interface MitolynBridgePageProps {
  content: LocaleContent;
  affiliateUrl: string;
}

export default function MitolynBridgePageClient({
  content,
  affiliateUrl,
}: MitolynBridgePageProps) {
  const {
    hero,
    thumbSection,
    scienceSection,
    socialProofSection,
    empathySection,
    finalCta,
    universityLogosSection,
  } = content.bridgePage;
  const { assets } = content;

  return (
    <>
      <FadeIn>
        <Hero title={hero.title} subtitle={hero.subtitle} />
      </FadeIn>

      <FadeIn>
        <section className="pb-12 bg-brand-bg-white">
          <Container className="text-center">
            <ThumbnailCarousel
              thumbnails={assets.carouselThumbnails}
              affiliateUrl={affiliateUrl}
            />
            <div className="mt-8">
              <Button
                href={affiliateUrl}
                className="text-xl px-10 py-4 bg-brand-action hover:bg-brand-action-dark text-white hover:animate-jiggle"
              >
                {thumbSection.ctaButtonText}
              </Button>
            </div>
          </Container>
        </section>
      </FadeIn>

      <FadeIn>
        <TextSection className="bg-brand-bg-light">
          <div className="prose prose-lg mx-auto text-center">
            <h3>{scienceSection.intro}</h3>
            <p>{scienceSection.body}</p>
          </div>
        </TextSection>
      </FadeIn>

      <FadeIn>
        <BenefitsSection
          title={socialProofSection.title}
          subtitle={socialProofSection.subtitle}
          benefits={socialProofSection.benefits}
        />
      </FadeIn>

      <FadeIn>
        <TextSection className="bg-brand-bg-light">
          <div className="prose prose-lg mx-auto text-center">
            <p className="font-semibold">{empathySection.text}</p>
            <h3 className="mt-12">{empathySection.finalQuestion}</h3>
          </div>
          <div className="mt-8 text-center">
            <Button
              href={affiliateUrl}
              className="text-xl px-10 py-4 bg-brand-success hover:bg-brand-success-dark text-white"
            >
              {finalCta.buttonText}
            </Button>
          </div>
        </TextSection>
      </FadeIn>

      <FadeIn>
        <div className="pt-12 pb-4 bg-brand-bg-light">
          <p className="text-center font-semibold text-brand-text-light uppercase tracking-wider">
            {universityLogosSection.title}
          </p>
        </div>
        <SocialProofLogos logos={assets.qualitySeals} />
      </FadeIn>
    </>
  );
}
