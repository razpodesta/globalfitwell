// src/lib/types/campaign.d.ts
import { type Metadata } from "next";

type NavLink = { label: string; href: string };

/**
 * Define la estructura para los activos localizados de una campaña.
 */
type LocalizedAssets = {
  authorPhoto: string;
  videoThumbnail: string;
  testimonialPhotos: string[];
  guaranteeSeal: string;
  qualitySeals: string[];
};

/**
 * Define la estructura para el contenido localizado de una campaña.
 */
export type LocaleContent = {
  metadata: Metadata;
  assets: LocalizedAssets;
  layout: {
    lang: string;
    scrollingBannerText: string;
    header: {
      brandName: string;
      slogan: string;
      navLinks: NavLink[];
      buttonText: string;
    };
    footer: {
      copyright: string;
      links: NavLink[];
      disclaimer: string;
    };
  };
  bridgePage: {
    hero: { title: string; subtitle: string };
    thumbSection: {
      altText: string;
      ctaButtonText: string;
    };
  };
  reviewPage: {
    intro: {
      openingQuestion: string;
      paragraphs: string[];
      benefits: string[];
      cta: { buttonText: string };
    };
    author: { name: string; credentials: string };
    problemSection: { title: string; paragraphs: string[] };
    doubleScrollingBannerSection: {
      testimonials: { name: string; rating: number }[];
      logos: { imageSrc: string; altText: string }[];
    };
    ingredientSection: {
      title: string;
      ingredients: { name: string; description: string }[];
    };
    testimonialSection: {
      title: string;
      testimonials: {
        quote: string;
        author: string;
        location: string;
      }[];
    };
    guaranteeSection: { title: string; text: string };
    faqSection: {
      title: string;
      faqs: { question: string; answer: string }[];
    };
    finalCta: { title: string; buttonText: string };
  };
};

/**
 * Define la estructura de una única campaña.
 */
export type CampaignConfig = {
  name: string;
  affiliateUrl: string;
  locales: Record<string, LocaleContent>;
};
