<div align="center">

# Finanças+

**Sistema de finanças pessoais fullstack** — controle receitas, despesas, parcelamentos, investimentos e metas em um só lugar.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

[**🔗 Acessar o projeto**](https://financas-pessoais-hdcq.vercel.app/) · [Reportar bug](https://github.com/RaferaX/financas-pessoais/issues)

</div>

---

## Sobre o projeto

O **Finanças+** é uma plataforma completa para organizar a vida financeira: do lançamento simples de uma despesa até o acompanhamento de compras parceladas com projeção de saldo futuro, metas de economia com progresso automático, e uma visão clara de patrimônio separando dinheiro do dia a dia de investimentos.

Construído do zero com Next.js (App Router) e TypeScript, com autenticação real (verificação de e-mail, recuperação de senha), banco de dados relacional via Prisma, e instalável como aplicativo (PWA) no celular.

## Capturas de tela

<div align="center">
  <img src="./docs/Dashboard.png" alt="Dashboard" width="80%" />
  <br /><br />
  <img src="./docs/patrimonio.png" alt="Patrimônio" width="80%" />
</div>

## Funcionalidades

- 🔐 **Autenticação completa** — cadastro, login, verificação de e-mail, recuperação de senha, troca de e-mail com confirmação
- 📁 **Categorias** — criação livre, com cor personalizada e marcação de investimento
- 💰 **Transações** — lançamento de receitas e despesas, com filtros por mês, categoria, tipo e valor
- 🧾 **Compras parceladas** — cadastra uma vez, o sistema gera todas as parcelas automaticamente
- 📊 **Dashboard mensal** — navegação entre meses, gráfico de despesas por categoria e evolução (passado + projeção futura com base em parcelamentos)
- 🏦 **Patrimônio** — visão acumulada, separando saldo do dia a dia de total investido
- 🎯 **Metas de economia** — objetivo com progresso calculado automaticamente
- 🎨 **Tema claro/escuro** — com identidade visual própria
- 📱 **PWA** — instalável na tela inicial do celular, funciona como app nativo
- 🧩 **Interface responsiva** — desktop e mobile

## Tecnologias

| Categoria | Stack |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) + TypeScript |
| Estilização | [Tailwind CSS](https://tailwindcss.com/) |
| Banco de dados | [PostgreSQL](https://neon.tech/) + [Prisma ORM](https://www.prisma.io/) |
| Autenticação | [NextAuth.js](https://next-auth.js.org/) |
| E-mails transacionais | [Resend](https://resend.com/) |
| Gráficos | [Recharts](https://recharts.org/) |
| PWA | [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa) |
| Deploy | [Vercel](https://vercel.com/) |

## Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/RaferaX/financas-pessoais.git
cd financas-pessoais

# Instale as dependências
npm install

# Configure as variáveis de ambiente (crie um .env na raiz)
DATABASE_URL="sua_connection_string_do_postgresql"
NEXTAUTH_SECRET="uma_string_aleatoria_segura"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="sua_chave_do_resend"

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto
