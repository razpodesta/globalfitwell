// RUTA: src/app/campaigns/mitolyn/(pages)/page.client.tsx
/**
 * @file Lógica y UI de la Bridge Page para Mitolyn (Componente de Cliente).
 * @description Contiene todo el JSX y la lógica interactiva para la página.
 * Puede renderizar contenido por defecto o recibirlo como props desde el laboratorio.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// CORRECCIÓN: La ruta de importación ahora es relativa al directorio padre.
import { mitolynConfig as defaultConfig } from "../config";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { CampaignConfig } from "@/lib/types/campaign.d";

export interface MitolynBridgePageProps {
  config?: CampaignConfig;
}

export default function MitolynBridgePageClient({
  config,
}: MitolynBridgePageProps) {
  const finalConfig = config || defaultConfig;
  const content = finalConfig.locales["pt-BR"];

  if (!content) {
    notFound();
  }

  const { hero, thumbSection } = content.bridgePage;
  const { assets } = content;

  return (
    <>
      <FadeIn>
        <Hero title={hero.title} subtitle={hero.subtitle} />
      </FadeIn>
      <FadeIn>
        <section className="pb-16 bg-brand-bg-white">
          <Container className="text-center max-w-xl">
            <Link
              href={finalConfig.affiliateUrl}
              rel="sponsored nofollow"
              aria-label={thumbSection.ctaButtonText}
            >
              <div className="relative aspect-video mx-auto group rounded-lg overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Image
                  src={assets.videoThumbnail}
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
                href={finalConfig.affiliateUrl}
                className="text-xl px-12 py-4 bg-brand-action hover:bg-brand-action-dark focus-visible:ring-brand-action text-white hover:animate-jiggle"
              >
                {thumbSection.ctaButtonText}
              </Button>
            </div>
          </Container>
        </section>
      </FadeIn>
    </>
  );
}
