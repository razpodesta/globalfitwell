// RUTA: src/app/campaigns/mitolyn/config.ts
/**
 * @file Fuente de Verdad para la Campaña "Mitolyn"
 * @description Contiene toda la configuración, textos y rutas de activos para la campaña
 * Mitolyn. Es un módulo autocontenido y todos los activos se sirven desde /public.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 * En caso de modificar completamente este archivo, estas secciones de documentación deben
 * ser preservadas, implementadas y mejoradas, respetando siempre los avances ya realizados.
 */
import { type CampaignConfig } from "@/lib/types/campaign.d";

export const mitolynConfig: CampaignConfig = {
  name: "mitolyn",
  affiliateUrl: process.env.NEXT_PUBLIC_MITOLYN_AFFILIATE_URL || "/#",

  locales: {
    "pt-BR": {
      metadata: {
        title: "Mitolyn (PT-BR) - Análise Oficial 2025",
        description:
          "Descubra se Mitolyn funciona: análise completa de ingredientes, benefícios e opiniões de clientes.",
      },
      assets: {
        // CORRECCIÓN: Rutas apuntan ahora a la carpeta /public
        authorPhoto: "/campaigns/mitolyn/pt-BR/images/author-photo.jpg",
        videoThumbnail: "/campaigns/mitolyn/pt-BR/images/video-thumbnail.svg",
        testimonialPhotos: [
          "/images/testimonials/person-2.jpeg",
          "/images/testimonials/person-3.jpeg",
          "/images/testimonials/person-4.jpeg",
          "/images/testimonials/person-5.jpeg",
          "/images/testimonials/person-6.jpeg",
        ],
        guaranteeSeal: "/images/seals/sello-2_png.png",
        qualitySeals: [
          "/images/seals/sello-1_png.png",
          "/images/seals/sello-3_png.png",
          "/images/seals/sello-4_png.png",
          "/images/seals/sello-5_png.png",
        ],
      },
      layout: {
        lang: "pt-BR",
        scrollingBannerText:
          "OFERTA POR TEMPO LIMITADO: DESCONTO EXCLUSIVO HOJE",
        header: {
          brandName: "MITOLYN",
          slogan: "A ciência do bem-estar",
          navLinks: [{ label: "Análise Completa", href: "review" }],
          buttonText: "GARANTIR OFERTA",
        },
        footer: {
          copyright: `© ${new Date().getFullYear()} Mitolyn`,
          links: [
            { label: "Termos", href: "/termos" },
            { label: "Privacidade", href: "/privacidade" },
            { label: "Cookies", href: "/cookies" },
          ],
          disclaimer:
            "Os resultados podem variar. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte um médico antes de iniciar qualquer suplemento.",
        },
      },
      bridgePage: {
        hero: {
          title: "A Descoberta de Harvard Sobre a Causa Raiz da Gordura",
          subtitle:
            "Ative o 'interruptor' metabólico para queima de gordura contínua e sem esforço.",
        },
        thumbSection: {
          altText: "Vídeo de apresentação do Mitolyn",
          ctaButtonText: "ASSISTIR APRESENTAÇÃO OFICIAL",
        },
      },
      reviewPage: {
        intro: {
          openingQuestion:
            "Análise Sincera: Mitolyn Realmente Funciona ou é Apenas Marketing?",
          paragraphs: [
            "Investigamos a fundo a fórmula, os resultados de clientes reais e a ciência por trás da promessa de reativar o metabolismo adormecido.",
            "Esta é a análise definitiva que você precisa ler antes de decidir.",
          ],
          benefits: [
            "Acelera o metabolismo em repouso",
            "Aumenta os níveis de energia diária",
            "Auxilia na queima de gordura teimosa",
            "Fórmula com ingredientes naturais e seguros",
          ],
          cta: { buttonText: "IR PARA A OFERTA OFICIAL COM 90% OFF" },
        },
        author: {
          name: "Dra. Ana Beatriz Silva",
          credentials: "Nutricionista e Pesquisadora em Metabolismo",
        },
        problemSection: {
          title: "Por Que Dietas e Exercícios Falham Para Tantas Pessoas?",
          paragraphs: [
            "A frustração de lutar contra a balança é real. Anos de pesquisa indicam que, para muitos, o problema não é falta de esforço, mas sim um metabolismo lento que trabalha contra você. Mitolyn foi desenvolvido para atacar essa causa raiz.",
            "A fórmula visa 'religar' as mitocôndrias, as usinas de energia de suas células, para que voltem a queimar gordura eficientemente.",
          ],
        },
        doubleScrollingBannerSection: {
          testimonials: [
            { name: "Maria C.", rating: 5 },
            { name: "Joana F.", rating: 5 },
            { name: "Carlos P.", rating: 4 },
            { name: "Sofia A.", rating: 5 },
          ],
          logos: [],
        },
        ingredientSection: {
          title: "Análise Detalhada dos Ingredientes",
          ingredients: [
            {
              name: "Cromo Picolinato",
              description:
                "Ajuda a regular os níveis de açúcar no sangue e a reduzir a vontade por doces, um fator chave no controle de peso.",
            },
            {
              name: "L-Carnitina",
              description:
                "Essencial para o transporte de ácidos graxos para as mitocôndrias, onde são queimados para gerar energia.",
            },
            {
              name: "Café Verde",
              description:
                "Rico em ácido clorogênico, que tem demonstrado apoiar o metabolismo da gordura e a saúde geral.",
            },
          ],
        },
        testimonialSection: {
          title: "O Que Pessoas Reais Estão Dizendo",
          testimonials: [
            {
              quote:
                "Perdi 7kg em 6 semanas sem sentir fome ou cansaço. Mitolyn mudou minha vida!",
              author: "Fernanda Lima",
              location: "São Paulo, SP",
            },
            {
              quote:
                "Finalmente venci o efeito platô. Minha energia está nas alturas e as roupas estão mais largas.",
              author: "Ricardo Mendes",
              location: "Rio de Janeiro, RJ",
            },
            {
              quote:
                "Eu era cética, mas os resultados falam por si. Recomendo para todas as minhas amigas.",
              author: "Carla Souza",
              location: "Belo Horizonte, MG",
            },
          ],
        },
        guaranteeSection: {
          title: "Garantia Blindada de 90 Dias: Risco Zero Para Você",
          text: "Temos tanta confiança na fórmula de Mitolyn que oferecemos uma garantia incondicional. Você tem 90 dias completos para testar o produto. Se por qualquer motivo não ficar 100% satisfeito com os resultados, basta entrar em contato e devolveremos cada centavo do seu investimento, sem perguntas.",
        },
        faqSection: {
          title: "Perguntas Frequentes",
          faqs: [
            {
              question: "Mitolyn é seguro? Tem efeitos colaterais?",
              answer:
                "Sim, Mitolyn é 100% seguro. Sua fórmula é composta por ingredientes naturais, testados e aprovados. Não possui efeitos colaterais conhecidos quando utilizado conforme as instruções.",
            },
            {
              question: "Como devo tomar o Mitolyn?",
              answer:
                "A recomendação é tomar duas cápsulas por dia, uma pela manhã e outra à noite. Para melhores resultados, mantenha o uso contínuo por no mínimo 3 meses.",
            },
            {
              question: "Em quanto tempo verei os resultados?",
              answer:
                "Muitos usuários relatam sentir mais energia já na primeira semana. Resultados mais significativos na balança e nas medidas geralmente são observados a partir da terceira semana de uso contínuo.",
            },
            {
              question: "Preciso de receita médica para comprar?",
              answer:
                "Não, por ser um suplemento natural, Mitolyn não exige receita médica.",
            },
          ],
        },
        finalCta: {
          title:
            "Pronta para Reativar Seu Metabolismo e Começar Sua Transformação?",
          buttonText: "SIM, QUERO MEU DESCONTO AGORA!",
        },
      },
    },
  },
};

// RUTA: src/app/campaigns/mitolyn/config.ts
