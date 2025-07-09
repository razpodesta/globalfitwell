// RUTA: src/config/site.ts
import { type Metadata } from "next";

/**
 * @file Contiene la configuración centralizada y todo el contenido textual del sitio.
 * @description Este archivo es la "fuente única de verdad" para el proyecto. La arquitectura está
 * diseñada para que cualquier cambio de contenido (textos, links, SEO) se realice únicamente aquí.
 * La estructura soporta múltiples idiomas de forma estática, donde cada idioma tiene su
 * propio objeto de contenido.
 */

// --- TIPOS Y ESTRUCTURAS DE DATOS ---

/**
 * Define la estructura completa del contenido para una sola página o locale.
 * Cada página estática del proyecto obtendrá sus datos de un objeto que sigue esta interfaz.
 */
export type PageContent = {
  metadata: Metadata;
  layout: {
    lang: "pt-BR" | "en-US" | "en-CA" | "es-ES" | "fr-CA";
    scrollingBannerText: string;
    header: {
      slogan: string;
      navLinks: { label: string; href: string }[];
      buttonText: string;
    };
    footer: {
      copyright: string;
      links: { label: string; href: string }[];
      disclaimer: string;
    };
  };
  bridgePage: {
    hero: { title: string; subtitle: string };
    thumbSection: { imageUrl: string; altText: string; ctaButtonText: string };
    proofSection: {
      title: string;
      body: string;
      socialProof: { logos: { src: string; alt: string }[] };
    };
  };
  reviewPage: {
    intro: {
      openingQuestion: string;
      paragraphs: string[];
      benefits: string[];
      cta: { buttonText: string };
    };
    author: { name: string; credentials: string; imageUrl: string };
    problemSection: { title: string; paragraphs: string[] };
    doubleScrollingBannerSection: {
      testimonials: {
        imageSrc: string;
        altText: string;
        name: string;
        rating: number;
      }[];
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
        imageSrc: string;
      }[];
    };
    guaranteeSection: { title: string; text: string; imageUrl: string };
    faqSection: { title: string; faqs: { question: string; answer: string }[] };
    finalCta: { title: string; buttonText: string };
  };
};

// --- OBJETO VACÍO PARA PLACEHOLDERS ---

/**
 * @description Un objeto vacío que cumple con la estructura de `reviewPage`.
 * Se utiliza como placeholder para los idiomas que aún no tienen el contenido
 * de la página de review traducido, evitando así errores de TypeScript durante el build.
 */
const emptyReviewPage: PageContent["reviewPage"] = {
  intro: {
    openingQuestion: "Review Coming Soon",
    paragraphs: [],
    benefits: [],
    cta: { buttonText: "Check Offer" },
  },
  author: { name: "", credentials: "", imageUrl: "" },
  problemSection: { title: "", paragraphs: [] },
  doubleScrollingBannerSection: { testimonials: [], logos: [] },
  ingredientSection: { title: "", ingredients: [] },
  testimonialSection: { title: "", testimonials: [] },
  guaranteeSection: { title: "", text: "", imageUrl: "" },
  faqSection: { title: "", faqs: [] },
  finalCta: { title: "", buttonText: "" },
};

/**
 * @description Objeto principal que contiene todo el contenido del sitio, organizado por idioma.
 * Para añadir un nuevo idioma o traducir contenido, este es el único lugar a modificar.
 */
export const siteContent: Record<string, PageContent> = {
  "pt-BR": {
    metadata: {
      title: "Mitolyn (PT) - Análise Completa e Sincera",
      description:
        "Descubra se o Mitolyn funciona. Análise dos ingredientes, benefícios e onde comprar.",
    },
    layout: {
      lang: "pt-BR",
      scrollingBannerText:
        "OFERTA ESPECIAL HOJE: RESULTADOS VISÍVEIS OU SEU DINHEIRO DE VOLTA.",
      header: {
        slogan: "Sua Jornada Para o Bem-Estar",
        navLinks: [
          { label: "Benefícios", href: "#" },
          { label: "Ingredientes", href: "#" },
        ],
        buttonText: "PEÇA AGORA",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} Mitolyn. Todos os direitos reservados.`,
        links: [
          { label: "Termos", href: "/termos" },
          { label: "Privacidade", href: "/privacidade" },
          { label: "Cookies", href: "/cookies" }, // ENLACE CORREGIDO
        ],
        disclaimer:
          "Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença.",
      },
    },
    bridgePage: {
      hero: {
        title:
          "Cientistas de Harvard Descobrem a Verdadeira Causa do Metabolismo Lento",
        subtitle:
          "Um simples 'interruptor' celular pode forçar o corpo a queimar gordura 24h por dia.",
      },
      thumbSection: {
        imageUrl: "/images/mitolyn-thumb.svg",
        altText: "Apresentação do método Mitolyn",
        ctaButtonText: "ASSISTA AO VÍDEO",
      },
      proofSection: {
        title: "Uma Abordagem Comprovada Cientificamente",
        body: "Baseado em pesquisas de instituições de renome, focado na saúde metabólica para resultados reais.",
        socialProof: { logos: [] },
      },
    },
    reviewPage: {
      intro: {
        openingQuestion: "Mitolyn Funciona? Minha Análise Sincera",
        paragraphs: [
          "Se você chegou até aqui, provavelmente está cansada de promessas vazias. Eu também estava.",
          "Nesta análise, vou te mostrar os resultados, os ingredientes e responder se vale a pena.",
        ],
        benefits: [
          "Metabolismo Acelerado",
          "Mais Energia e Disposição",
          "Resultados Sustentáveis",
        ],
        cta: { buttonText: "VER OFERTA COM DESCONTO" },
      },
      author: {
        name: "Dra. Ana Silva",
        credentials: "Nutricionista",
        imageUrl: "/images/author-ana.jpg",
      },
      problemSection: {
        title: "A Luta Contra a Balança é Real (Mas a Culpa Não é Sua)",
        paragraphs: [
          "Dietas, exercícios... e a frustração continua. A ciência recente mostra que o problema pode estar a nível celular.",
        ],
      },
      doubleScrollingBannerSection: {
        testimonials: [
          {
            imageSrc: "/images/testimonials/person1.jpg",
            altText: "Foto de Maria S.",
            name: "Maria S.",
            rating: 5,
          },
          {
            imageSrc: "/images/testimonials/person2.jpg",
            altText: "Foto de João P.",
            name: "João P.",
            rating: 4,
          },
          {
            imageSrc: "/images/testimonials/person3.jpg",
            altText: "Foto de Beatriz L.",
            name: "Beatriz L.",
            rating: 5,
          },
        ],
        logos: [
          { imageSrc: "/images/logos/logo-harvard.svg", altText: "Harvard" },
          { imageSrc: "/images/logos/logo-yale.svg", altText: "Yale" },
          { imageSrc: "/images/logos/logo-stanford.svg", altText: "Stanford" },
        ],
      },
      ingredientSection: {
        title: "A Ciência Por Trás da Fórmula",
        ingredients: [
          {
            name: "Cromo Picolinato",
            description: "Ajuda a controlar o apetite.",
          },
          { name: "Guaraná em Pó", description: "Acelera o metabolismo." },
          { name: "Psyllium", description: "Promove saciedade." },
        ],
      },
      testimonialSection: {
        title: "Resultados Reais de Pessoas Reais",
        testimonials: [
          {
            quote: "Perdi 8kg em 2 meses!",
            author: "Carla M.",
            location: "São Paulo, SP",
            imageSrc: "/images/testimonial-1.jpg",
          },
        ],
      },
      guaranteeSection: {
        title: "Seu Risco é Absolutamente ZERO",
        text: "Garantia incondicional de 90 dias. Se não estiver 100% satisfeita, receba seu dinheiro de volta. Sem perguntas.",
        imageUrl: "/images/guarantee-seal.png",
      },
      faqSection: {
        title: "Dúvidas Frequentes",
        faqs: [
          {
            question: "Tem contraindicações?",
            answer: "Não, exceto para gestantes e lactantes.",
          },
          { question: "Como devo tomar?", answer: "2 cápsulas ao dia." },
        ],
      },
      finalCta: {
        title: "É a Sua Vez de Mudar de Vida",
        buttonText: "QUERO MEU MITOLYN COM DESCONTO!",
      },
    },
  },
  "en-US": {
    metadata: {
      title: "Mitolyn (US) - Honest Review & Analysis",
      description:
        "Does Mitolyn work? Analysis of ingredients, benefits, and where to buy.",
    },
    layout: {
      lang: "en-US",
      scrollingBannerText:
        "SPECIAL OFFER TODAY: VISIBLE RESULTS OR YOUR MONEY BACK.",
      header: {
        slogan: "Your Wellness Journey",
        navLinks: [
          { label: "Benefits", href: "#" },
          { label: "Ingredients", href: "#" },
        ],
        buttonText: "ORDER NOW",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} Mitolyn. All rights reserved.`,
        links: [
          { label: "Terms", href: "/termos" },
          { label: "Privacy", href: "/privacidade" },
          { label: "Cookies", href: "/cookies" },
        ],
        disclaimer:
          "This product is not intended to diagnose, treat, cure, or prevent any disease.",
      },
    },
    bridgePage: {
      hero: {
        title:
          "Harvard Scientists Discover The True Cause of a Slow Metabolism",
        subtitle:
          "A simple cellular 'switch' can force the body to burn fat 24/7.",
      },
      thumbSection: {
        imageUrl: "/images/mitolyn-thumb.svg",
        altText: "Presentation of the Mitolyn method",
        ctaButtonText: "WATCH THE VIDEO",
      },
      proofSection: {
        title: "A Scientifically Proven Approach",
        body: "Based on research from renowned institutions, focused on metabolic health for real results.",
        socialProof: { logos: [] },
      },
    },
    reviewPage: emptyReviewPage,
  },
  "en-CA": {
    metadata: {
      title: "Mitolyn (CA) - Honest Review & Analysis",
      description:
        "Does Mitolyn work? Analysis of ingredients, benefits, and where to buy.",
    },
    layout: {
      lang: "en-CA",
      scrollingBannerText:
        "SPECIAL OFFER TODAY: VISIBLE RESULTS OR YOUR MONEY BACK.",
      header: {
        slogan: "Your Wellness Journey",
        navLinks: [
          { label: "Benefits", href: "#" },
          { label: "Ingredients", href: "#" },
        ],
        buttonText: "ORDER NOW",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} Mitolyn. All rights reserved.`,
        links: [
          { label: "Terms", href: "/termos" },
          { label: "Privacy", href: "/privacidade" },
          { label: "Cookies", href: "/cookies" },
        ],
        disclaimer:
          "This product is not intended to diagnose, treat, cure, or prevent any disease.",
      },
    },
    bridgePage: {
      hero: {
        title:
          "Harvard Scientists Discover The True Cause of a Slow Metabolism",
        subtitle:
          "A simple cellular 'switch' can force the body to burn fat 24/7.",
      },
      thumbSection: {
        imageUrl: "/images/mitolyn-thumb.svg",
        altText: "Presentation of the Mitolyn method",
        ctaButtonText: "WATCH THE VIDEO",
      },
      proofSection: {
        title: "A Scientifically Proven Approach",
        body: "Based on research from renowned institutions, focused on metabolic health for real results.",
        socialProof: { logos: [] },
      },
    },
    reviewPage: emptyReviewPage,
  },
  "es-ES": {
    metadata: {
      title: "Mitolyn (ES) - Análisis Completo y Sincero",
      description:
        "Descubre si Mitolyn funciona. Análisis de ingredientes, beneficios y dónde comprar.",
    },
    layout: {
      lang: "es-ES",
      scrollingBannerText:
        "OFERTA ESPECIAL HOY: RESULTADOS VISIBLES O TE DEVOLVEMOS TU DINERO.",
      header: {
        slogan: "Tu Viaje Hacia el Bienestar",
        navLinks: [
          { label: "Beneficios", href: "#" },
          { label: "Ingredientes", href: "#" },
        ],
        buttonText: "PÍDELO AHORA",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} Mitolyn. Todos los derechos reservados.`,
        links: [
          { label: "Términos", href: "/termos" },
          { label: "Privacidad", href: "/privacidade" },
          { label: "Cookies", href: "/cookies" },
        ],
        disclaimer:
          "Este producto no está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.",
      },
    },
    bridgePage: {
      hero: {
        title:
          "Científicos de Harvard Descubren la Verdadera Causa del Metabolismo Lento",
        subtitle:
          "Un simple 'interruptor' celular puede forzar al cuerpo a quemar grasa 24/7.",
      },
      thumbSection: {
        imageUrl: "/images/mitolyn-thumb.svg",
        altText: "Presentación del método Mitolyn",
        ctaButtonText: "VER EL VÍDEO",
      },
      proofSection: {
        title: "Un Enfoque Científicamente Probado",
        body: "Basado en investigaciones de instituciones de renombre, centrado en la salud metabólica para resultados reales.",
        socialProof: { logos: [] },
      },
    },
    reviewPage: emptyReviewPage,
  },
  "fr-CA": {
    metadata: {
      title: "Mitolyn (FR) - Analyse Complète et Honnête",
      description:
        "Découvrez si Mitolyn fonctionne. Analyse des ingrédients, avantages et où acheter.",
    },
    layout: {
      lang: "fr-CA",
      scrollingBannerText:
        "OFFRE SPÉCIALE AUJOURD'HUI : RÉSULTATS VISIBLES OU ARGENT REMIS.",
      header: {
        slogan: "Votre Voyage vers le Bien-être",
        navLinks: [
          { label: "Avantages", href: "#" },
          { label: "Ingrédients", href: "#" },
        ],
        buttonText: "COMMANDER",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} Mitolyn. Tous les droits sont réservés.`,
        links: [
          { label: "Termes", href: "/termos" },
          { label: "Confidentialité", href: "/privacidade" },
          { label: "Cookies", href: "/cookies" },
        ],
        disclaimer:
          "Ce produit n'est pas destiné à diagnostiquer, traiter, guérir ou prévenir une maladie.",
      },
    },
    bridgePage: {
      hero: {
        title:
          "Des Scientifiques de Harvard Découvrent la Vraie Cause du Métabolisme Lent",
        subtitle:
          "Un simple 'interrupteur' cellulaire peut forcer le corps à brûler les graisses 24/7.",
      },
      thumbSection: {
        imageUrl: "/images/mitolyn-thumb.svg",
        altText: "Présentation de la méthode Mitolyn",
        ctaButtonText: "REGARDER LA VIDÉO",
      },
      proofSection: {
        title: "Une Approche Scientifiquement Prouvée",
        body: "Basé sur des recherches d'institutions renommées, axé sur la santé métabolique pour des résultats réels.",
        socialProof: { logos: [] },
      },
    },
    reviewPage: emptyReviewPage,
  },
};

/**
 * @description Enlace de afiliado global que se utiliza en todo el sitio.
 * Se lee desde las variables de entorno para mayor seguridad y flexibilidad.
 */
export const affiliateLink = process.env.NEXT_PUBLIC_AFFILIATE_LINK || "/go";
// RUTA: src/config/site.ts
