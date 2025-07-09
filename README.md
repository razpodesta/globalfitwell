# RUTA: README.md
# Projeto de Landing Page de Alta Performance com Next.js

Este repositório contém um template de projeto otimizado para a construção de uma landing page e "review page" de alta performance. Ele é construído com Next.js 15 (App Router) e segue as melhores práticas da indústria em performance, SEO e experiência do desenvolvedor (DX).

## 🚀 Filosofia do Projeto

O objetivo principal deste template é fornecer uma base sólida e escalável que prioriza:

-   **Performance Web (Core Web Vitals):** Otimizado desde o núcleo com `next/image`, `next/font`, Server Components e um `bundle size` mínimo.
-   **SEO Técnico:** Geração automática de `sitemap.xml` e `robots.txt`, além de uma gestão centralizada de metadatos.
-   **Manutenibilidade e Escalabilidade:** Uma arquitetura de componentes clara (`ui/`, `sections/`, `layout/`) e um arquivo de configuração centralizado (`src/config/site.ts`) que desacopla o conteúdo da lógica de apresentação.
-   **Experiência do Desenvolvedor (DX):** Configurado com TypeScript estrito, ESLint e aliases de importação para um desenvolvimento rápido e seguro.

## 🧠 Arquitetura e Lógica de Negócio

Este boilerplate foi pensado para resolver problemas comuns em projetos de marketing de afiliados e infoprodutos.

### A Rota `/go` e a Estratégia de "Cloaking"

-   **O Problema:** Expor seu link de afiliado diretamente no código-fonte é arriscado. Ele pode ser roubado, substituído ou bloqueado por ad-blockers.
-   **A Solução:** Implementamos uma rota de "cloaking" (camuflagem) em `src/app/go/route.ts`.
    1.  Todos os botões e CTAs (Call-to-Action) no site apontam para uma URL interna e limpa: `/go`.
    2.  Quando o usuário clica, o servidor Next.js intercepta essa requisição.
    3.  A rota `/go` busca o seu link de afiliado **real** de uma variável de ambiente segura no servidor (`AFFILIATE_URL_TARGET`).
    4.  O servidor então redireciona o usuário para o link de afiliado final.
-   **Vantagens:** Seu link de afiliado nunca é exposto no lado do cliente, aumentando a segurança e a taxa de entrega.

### O Arquivo `src/config/site.ts`: O Centro de Controle

-   **O Problema:** Modificar textos, títulos, links ou descrições de SEO geralmente exige que o desenvolvedor edite múltiplos arquivos de componentes (`.tsx`), um processo lento e propenso a erros.
-   **A Solução:** Centralizamos **TODO** o conteúdo do site em um único arquivo: `src/config/site.ts`.
    -   **Textos e Títulos:** Todos os textos das seções Hero, Review, etc., estão lá.
    -   **Links:** O link de afiliado público (`/go`), links do footer, etc.
    -   **SEO:** Metadados como `title` e `description` para todas as páginas.
-   **Vantagens:** Para atualizar qualquer conteúdo, você só precisa editar um único arquivo. Isso torna a gestão de conteúdo extremamente rápida e desacopla o trabalho de "copywriting" do trabalho de programação.

## 🛠️ Stack Tecnológico

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes de UI:** [Lucide React](https://lucide.dev/) (para ícones) e [React Fast Marquee](https://www.react-fast-marquee.com/)
-   **Linting:** ESLint
-   **Hospedagem Recomendada:** [Vercel](https://vercel.com/)

---

## ⚙️ Como Começar

Siga estes passos para executar o projeto em seu ambiente local.

### 1. Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
-   [npm](https://www.npmjs.com/)

### 2. Clonar o Repositório

```bash
git clone [URL_DO_SEU_REPO]
cd landing-pages