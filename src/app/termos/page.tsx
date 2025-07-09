// RUTA: src/app/termos/page.tsx
import { Container } from "@/app/(components)/ui/Container";

/**
 * Página para exibir os Termos de Uso.
 * O conteúdo aqui é um placeholder e deve ser preenchido com os termos legais reais.
 */
export default function TermosPage() {
  return (
    <main className="py-16">
      <Container className="prose lg:prose-xl">
        <h1>Termos de Uso</h1>
        <p>
          Bem-vindo! Ao acessar e usar nosso site, você concorda em cumprir e
          ficar vinculado aos seguintes termos e condições de uso.
        </p>
        <h2>1. Uso do Site</h2>
        <p>
          O conteúdo das páginas deste site é para sua informação geral e uso
          apenas. Ele está sujeito a alterações sem aviso prévio.
        </p>
        {/* Adicione o resto do seu conteúdo legal aqui... */}
      </Container>
    </main>
  );
}
// RUTA: src/app/termos/page.tsx
