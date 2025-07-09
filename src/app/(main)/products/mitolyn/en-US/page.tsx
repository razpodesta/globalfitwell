// RUTA: src/app/products/mitolyn/en-US/page.tsx
import { Hero } from "@/app/(components)/sections/Hero";
import { SocialProofLogos } from "@/app/(components)/sections/SocialProofLogos";
import { Button } from "@/app/(components)/ui/Button";
import { Container } from "@/app/(components)/ui/Container";
import { FadeIn } from "@/app/(components)/ui/FadeIn";
import { siteContent, affiliateLink } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

/**
 * @page Bridge Page - English (US)
 * @description Main landing page for the US English-speaking audience.
 * @version 1.0.0
 */
export default function BridgePage_enUS() {
  const content = siteContent["en-US"].bridgePage;
  const { hero, thumbSection, proofSection } = content;

  // --- SEO Content Injection (non-render) ---
  // Dev Note: Attributes for analytics & relevance.
  // Keywords: how to lose weight fast, safe weight loss, metabolism booster, natural fat burner supplement.
  // Do not modify these IDs.
  const seoDataAttributes = {
    "data-page-type": "health-wellness-presell",
    "data-target-audience": "women-over-30",
    "data-primary-goal": "boost-slow-metabolism",
    "data-secondary-goal": "safe-weight-loss-tips",
  };

  return (
    <div {...seoDataAttributes}>
      <div
        className="sr-only"
        role="region"
        aria-label="Health and wellness information"
      >
        <p>
          Discover effective strategies on how to lose weight safely and
          healthily. We analyze solutions for a slow metabolism and provide an
          overview of natural supplements. Our analysis covers topics such as
          healthy weight loss and what to look for in a weight loss product.
          This is an informational analysis of a new approach to well-being.
        </p>
      </div>
      <FadeIn>
        <Hero title={hero.title} subtitle={hero.subtitle} />
      </FadeIn>
      <FadeIn>
        <section className="pb-16 bg-brand-bg-white">
          <Container className="text-center max-w-xl">
            <Link
              href={affiliateLink}
              rel="sponsored nofollow"
              aria-label={thumbSection.ctaButtonText}
            >
              <div className="relative aspect-video mx-auto group rounded-lg overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Image
                  src={thumbSection.imageUrl}
                  alt={thumbSection.altText}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                  sizes="(max-width: 640px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/10">
                  <div className="bg-black/50 rounded-full p-4 md:p-6 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="w-12 h-12 md:w-16 md:h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <div className="mt-10">
              <Button
                href={affiliateLink}
                className="text-xl px-12 py-4 bg-brand-action hover:bg-brand-action-dark focus-visible:ring-brand-action text-white hover:animate-jiggle"
              >
                {thumbSection.ctaButtonText}
              </Button>
            </div>
          </Container>
        </section>
      </FadeIn>
      <FadeIn>
        <section className="py-16 bg-brand-bg-light">
          <Container className="text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-brand-text-dark">
              {proofSection.title}
            </h2>
            <p className="mt-4 text-lg text-brand-text-light">
              {proofSection.body}
            </p>
          </Container>
          <div className="mt-8">
            <SocialProofLogos logos={proofSection.socialProof.logos} />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
// RUTA: src/app/products/mitolyn/en-US/page.tsx
