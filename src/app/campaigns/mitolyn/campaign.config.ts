// RUTA: src/app/campaigns/mitolyn/campaign.config.ts
/**
 * @file Campaign Configuration for "Mitolyn"
 * @description Serves as the single source of truth for all content, assets, and
 * theme settings for the Mitolyn campaign across all supported locales.
 * This modular approach allows for easy scaling and management of multilingual content.
 *
 * @author Your Name
 * @version 2.4.0
 */

import {
  type CampaignConfig,
  type LocaleContent,
} from "@/lib/types/campaign.d";

/**
 * @description A placeholder for the review page content.
 * This ensures type safety for locales where the review page is not yet translated,
 * preventing build errors by providing a valid, empty structure.
 */
const emptyReviewPage: LocaleContent["reviewPage"] = {
  intro: {
    openingQuestion: "",
    paragraphs: [],
    benefits: [],
    cta: { buttonText: "" },
  },
  author: { name: "", credentials: "" },
  problemSection: { title: "", paragraphs: [] },
  doubleScrollingBannerSection: { testimonials: [], logos: [] },
  ingredientSection: { title: "", ingredients: [] },
  testimonialSection: { title: "", testimonials: [] },
  guaranteeSection: { title: "", text: "" },
  faqSection: { title: "", faqs: [] },
  finalCta: { title: "", buttonText: "" },
};

/**
 * @description Base content in English (US). This object is used as a template
 * and is spread into other locale configurations to minimize repetition and
 * ensure a consistent structure.
 */
const en_US_Content: LocaleContent = {
  metadata: {
    title: "Mitolyn - A Simple Solution for Real Results",
    description:
      "Feeling frustrated trying to lose weight? Discover a science-backed way to kickstart your metabolism.",
  },
  assets: {
    authorPhoto: "/campaigns/mitolyn/brand/author-photo.jpg", // Asumiendo una estructura de marca centralizada
    carouselThumbnails: [
      {
        src: "/campaigns/mitolyn/thumbnails/thumb-1.png",
        alt: "Woman on a beach at sunrise, feeling healthy and energetic.",
      },
      {
        src: "/campaigns/mitolyn/thumbnails/thumb-2.png",
        alt: "A microscopic view of a mitochondria cell being energized.",
      },
      {
        src: "/campaigns/mitolyn/thumbnails/thumb-3.png",
        alt: "Natural oil capsules with green leaves, representing science-backed ingredients.",
      },
    ],
    testimonialPhotos: [],
    guaranteeSeal: "/images/seals/sello-2_png.png",
    qualitySeals: [
      { src: "/images/seals/sello-1_png.png", alt: "Harvard Research" },
      {
        src: "/images/seals/sello-2_png.png",
        alt: "University of Illinois Research",
      },
      { src: "/images/seals/sello-3_png.png", alt: "Stanford Medicine" },
    ],
    universityLogos: [],
  },
  layout: {
    lang: "en-US",
    scrollingBannerText: "LIMITED TIME OFFER: 75% OFF TODAY ONLY!",
    header: {
      logoUrl: "/campaigns/mitolyn/brand/logo-change-your-life.png",
      ctaText: "Start Now",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Mitolyn. All rights reserved.`,
      links: [
        { label: "Terms of Use", href: "/termos" },
        { label: "Privacy Policy", href: "/privacidade" },
        { label: "Contact", href: "/#contact" },
      ],
      disclaimer:
        "Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.",
    },
  },
  bridgePage: {
    hero: {
      title: "Feeling Totally Frustrated Trying to Lose Weight?",
      subtitle: "Complicated diets and brutal workouts just not cutting it?",
    },
    thumbSection: {
      altText: "A simple solution for real results",
      ctaButtonText: "Simple Solution, Real Results – Start Now!",
    },
    scienceSection: {
      intro:
        "What if there was a natural, science-backed way to give your metabolism a real kickstart?",
      body: "Researchers at Harvard and the University of Illinois found the real secret sauce might be optimizing your mitochondria – y'know, your body's little cellular powerhouses. Get those humming, and you torch fat way more efficiently.",
    },
    socialProofSection: {
      title:
        "Thousands of folks have already used our approach to get their confidence and mojo back – no crazy lifestyle overhaul needed.",
      subtitle: "Here's what you can expect:",
      benefits: [
        "Fire up your metabolism naturally",
        "Get that 'let's go!' energy feeling healthier",
        "Keep it off for good, no crash diets or head-scratchers",
      ],
    },
    empathySection: {
      text: "Seriously, the weight loss industry makes this stuff way harder than it needs to be. We're all about keeping it simple, clear, and actually doable.",
      finalQuestion: "Curious how it works?",
    },
    finalCta: {
      buttonText: "Click here and find out how to kickstart your change!",
    },
    universityLogosSection: {
      title: "AS MENTIONED IN RESEARCH FROM",
    },
  },
  reviewPage: emptyReviewPage,
};

export const mitolynConfig: CampaignConfig = {
  name: "mitolyn",
  affiliateUrl: `/api/go/mitolyn`,
  theme: {
    colors: {
      headerBg: "#0d40b8",
      footerBg: "#1F2937",
      scrollingBannerBg: "#FF4500",
      buttonActionBg: "#1e3a8a",
      buttonActionText: "#FFFFFF",
    },
    typography: {},
  },
  locales: {
    "en-US": en_US_Content,
    "en-CA": {
      ...en_US_Content,
    },
    "fr-CA": {
      ...en_US_Content,
      layout: {
        lang: "fr-CA",
        scrollingBannerText:
          "OFFRE À DURÉE LIMITÉE : 75 % DE RABAIS AUJOURD'HUI SEULEMENT!",
        header: {
          ...en_US_Content.layout.header,
          ctaText: "Commencez Maintenant",
        },
        footer: {
          ...en_US_Content.layout.footer,
          copyright: `© ${new Date().getFullYear()} Mitolyn. Tous droits réservés.`,
          links: [
            { label: "Conditions d'utilisation", href: "/termos" },
            { label: "Politique de confidentialité", href: "/privacidade" },
            { label: "Contact", href: "/#contact" },
          ],
        },
      },
      bridgePage: {
        hero: {
          title: "Totalement frustré(e) d'essayer de perdre du poids ?",
          subtitle:
            "Les régimes compliqués et les entraînements brutaux ne suffisent pas ?",
        },
        thumbSection: {
          altText: "Une solution simple pour de vrais résultats",
          ctaButtonText:
            "Solution Simple, Vrais Résultats – Commencez Maintenant !",
        },
        scienceSection: {
          intro:
            "Et s'il existait un moyen naturel, soutenu par la science, de vraiment relancer votre métabolisme ?",
          body: "Des chercheurs de Harvard et de l'Université de l'Illinois ont découvert que le vrai secret pourrait être d'optimiser vos mitochondries – vous savez, les petites centrales énergétiques de votre corps. Faites-les vibrer, et vous brûlerez les graisses beaucoup plus efficacement.",
        },
        socialProofSection: {
          title:
            "Des milliers de personnes ont déjà utilisé notre approche pour retrouver leur confiance et leur énergie – sans nécessiter de changement de vie radical.",
          subtitle: "Voici à quoi vous pouvez vous attendre :",
          benefits: [
            "Activez votre métabolisme naturellement",
            "Retrouvez une énergie débordante et sentez-vous en meilleure santé",
            "Maintenez votre poids pour de bon, sans régimes yo-yo ni casse-tête",
          ],
        },
        empathySection: {
          text: "Sérieusement, l'industrie de la perte de poids rend les choses bien plus compliquées qu'elles ne devraient l'être. Notre objectif est de garder les choses simples, claires et réalisables.",
          finalQuestion: "Curieux(se) de savoir comment ça marche ?",
        },
        finalCta: {
          buttonText:
            "Cliquez ici et découvrez comment démarrer votre changement !",
        },
        universityLogosSection: {
          title: "COMME MENTIONNÉ DANS LES RECHERCHES DE",
        },
      },
      reviewPage: emptyReviewPage,
    },
    "pt-BR": {
      ...en_US_Content,
      layout: {
        lang: "pt-BR",
        scrollingBannerText: "OFERTA LIMITADA: 75% DE DESCONTO SÓ HOJE!",
        header: { ...en_US_Content.layout.header, ctaText: "Comece Agora" },
        footer: {
          ...en_US_Content.layout.footer,
          copyright: `© ${new Date().getFullYear()} Mitolyn. Todos os direitos reservados.`,
          links: [
            { label: "Termos de Uso", href: "/termos" },
            { label: "Política de Privacidade", href: "/privacidade" },
            { label: "Contato", href: "/#contact" },
          ],
        },
      },
      bridgePage: {
        hero: {
          title: "Sentindo-se Totalmente Frustrado Tentando Perder Peso?",
          subtitle:
            "Dietas complicadas e treinos brutais simplemente não estão funcionando?",
        },
        thumbSection: {
          altText: "Uma solução simples para resultados reais",
          ctaButtonText: "Solução Simples, Resultados Reais – Comece Agora!",
        },
        scienceSection: {
          intro:
            "E se houvesse uma forma natural e com respaldo científico para dar um verdadeiro impulso ao seu metabolismo?",
          body: "Pesquisadores de Harvard e da Universidade de Illinois descobriram que o verdadeiro segredo pode ser otimizar suas mitocôndrias - sabe, as pequenas usinas de energia do seu corpo. Faça-as funcionar bem, e você queima gordura de forma muito mais eficiente.",
        },
        socialProofSection: {
          title:
            "Milhares de pessoas já usaram nossa abordagem para recuperar a confiança e a energia – sem precisar de uma mudança radical no estilo de vida.",
          subtitle: "Veja o que você pode esperar:",
          benefits: [
            "Acelere seu metabolismo naturalmente",
            "Sinta aquela energia de 'vamos lá!' e mais saúde",
            "Mantenha o peso para sempre, sem dietas radicais ou confusas",
          ],
        },
        empathySection: {
          text: "Sério, a indústria do emagrecimento torna as coisas muito mais difíceis do que precisam ser. Nós focamos em manter tudo simples, claro e realmente factível.",
          finalQuestion: "Curioso para saber como funciona?",
        },
        finalCta: {
          buttonText: "Clique aqui e descubra como iniciar sua mudança!",
        },
        universityLogosSection: { title: "COMO MENCIONADO EM PESQUISAS DE" },
      },
      reviewPage: emptyReviewPage,
    },
  },
};
