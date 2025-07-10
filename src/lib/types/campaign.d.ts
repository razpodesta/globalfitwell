// RUTA: src/lib/types/campaign.d.ts
/**
 * @file Type Definitions for Campaign Configuration
 * @description This file contains all TypeScript interfaces and types that define the
 * structure of the campaign configuration objects. It acts as a strict contract
 * to ensure type safety across the application.
 *
 * @author Your Name
 * @version 2.3.0
 */

import { type Metadata } from "next";

/**
 * @interface NavLink
 * @description Defines the structure for a single navigation link.
 */
type NavLink = { label: string; href: string };

/**
 * @interface LocalizedAssets
 * @description Defines the paths to all localized assets for a campaign.
 * Paths should be absolute from the /public directory.
 */
type LocalizedAssets = {
  authorPhoto: string;
  carouselThumbnails: { src: string; alt: string }[];
  testimonialPhotos: string[];
  guaranteeSeal: string;
  qualitySeals: { src: string; alt: string }[];
  universityLogos: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
};

/**
 * @interface CampaignTheme
 * @description Defines the customizable theme properties for a campaign,
 * including colors and typography settings.
 */
export type CampaignTheme = {
  colors: {
    headerBg: string;
    footerBg: string;
    scrollingBannerBg: string;
    buttonActionBg: string;
    buttonActionText: string;
  };
  typography: {
    fontSize?: number;
  };
};

/**
 * @interface LocaleContent
 * @description Defines the complete content structure for a single locale within a campaign.
 * It includes metadata, asset paths, and all page-specific content.
 */
export type LocaleContent = {
  metadata: Metadata;
  assets: LocalizedAssets;
  layout: {
    lang: string;
    scrollingBannerText: string;
    header: {
      logoUrl: string;
      ctaText: string;
    };
    footer: {
      copyright: string;
      links: NavLink[];
      disclaimer: string;
    };
  };
  bridgePage: {
    hero: { title: string; subtitle: string };
    thumbSection: { altText: string; ctaButtonText: string };
    scienceSection: {
      intro: string;
      body: string;
    };
    socialProofSection: {
      title: string;
      subtitle: string;
      benefits: string[];
    };
    empathySection: {
      text: string;
      finalQuestion: string;
    };
    finalCta: { buttonText: string };
    universityLogosSection: { title: string };
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
 * @interface CampaignConfig
 * @description The root configuration structure for a single campaign.
 */
export type CampaignConfig = {
  name: string;
  affiliateUrl: string;
  theme: CampaignTheme;
  locales: Record<string, LocaleContent>;
};
