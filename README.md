# Sucudex 🌵

Bem-vindo ao **Sucudex**! Este é um projeto de catálogo de suculentas inspirado na clássica Pokédex. O objetivo é registrar, visualizar e gerenciar as "151 originais" (e além!) do mundo das suculentas.

Este guia foi preparado para ajudar novos colaboradores a entenderem a arquitetura e as tecnologias utilizadas no projeto.

## 🚀 Tecnologias Utilizadas

O projeto foi construído sobre uma stack moderna focada em performance e experiência de desenvolvimento (DX):

- **Next.js 14+** (App Router): Framework React principal.
- **TypeScript**: Tipagem estática para segurança e intellisense.
- **Prisma**: ORM para interação com o banco de dados.
- **Material UI (MUI)**: Biblioteca de componentes visuais.
- **React Hook Form**: Gerenciamento de formulários performático.
- **Zod**: Validação de esquemas (Schemas) e inferência de tipos.

## 📂 Estrutura do Projeto

A organização de pastas segue o padrão do Next.js App Router, com uma separação clara de responsabilidades:

```
src/
├── actions/          # Server Actions (Lógica de Backend / Mutações)
│   └── succulent-actions.ts
├── app/              # Rotas e Páginas (Next.js App Router)
│   ├── layout.tsx    # Layout global (Providers, Navbar, etc)
│   └── page.tsx      # Página inicial (Server Component)
├── components/       # Componentes React Reutilizáveis
│   ├── feedback/     # Contexto de Feedback (Snackbars, Modais)
│   ├── SucculentCard/# Card de exibição individual
│   └── SucculentForm/# Formulário de Criação/Edição (Client Component)
├── lib/              # Utilitários e Configurações
│   ├── constants.ts  # Constantes globais (Tipos de suculentas, Cores)
│   ├── prisma.ts     # Instância do cliente Prisma (Singleton)
│   └── schemas.ts    # Schemas de validação Zod
```

## 🛠️ Guia de Desenvolvimento

### 1. Server Actions vs API Routes
Neste projeto, optamos por **Server Actions** em vez de rotas de API tradicionais. Isso permite chamar funções assíncronas do servidor diretamente dos componentes (Client ou Server), simplificando o fluxo de dados.
*   Veja `src/actions/succulent-actions.ts` para exemplos de `create`, `update` e `get`.

### 2. Validação com Zod
A validação é compartilhada entre o Frontend e o Backend.
*   Definimos o schema em `src/lib/schemas.ts`.
*   O **React Hook Form** usa esse schema no frontend para feedback visual imediato.
*   A **Server Action** usa o mesmo schema para garantir a integridade dos dados antes de salvar no banco.

### 3. Banco de Dados (Prisma)
Utilizamos o Prisma como ORM. O arquivo `schema.prisma` (na raiz do projeto) define a estrutura do banco.

## 🏁 Como Rodar o Projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure o Banco de Dados:**
    Certifique-se de ter um arquivo `.env` configurado com a `DATABASE_URL`. Para sincronizar o schema com o banco (dev):
    ```bash
    npx prisma db push
    ```

3.  **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
