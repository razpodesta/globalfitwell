// src/app/go/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Este es el link de afiliado REAL, guardado de forma segura en el servidor.
// ¡Asegúrate de configurar esta variable de entorno en Vercel!
const AFFILIATE_URL_TARGET = process.env.AFFILIATE_URL_TARGET;

export async function GET(request: NextRequest) {
  // Verificación de seguridad: si el link no está configurado, no redirigir a un lugar roto.
  if (!AFFILIATE_URL_TARGET) {
    console.error(
      "CRÍTICO: AFFILIATE_URL_TARGET no está definido en las variables de entorno."
    );
    // Redirigir a la página de inicio como fallback seguro.
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Usamos una redirección 307 (Temporary Redirect). Es ideal para el cloaking
  // de afiliados, ya que le dice a los buscadores que el contenido final está en otro lugar,
  // pero que esta URL de "/go" debe ser usada para futuras peticiones.
  return NextResponse.redirect(new URL(AFFILIATE_URL_TARGET), 307);
}
