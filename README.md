# 💰 Financial Dashboard

Dashboard financeiro moderno e completo desenvolvido com Next.js 15, TypeScript, React Query e OpenLayers. Projeto focado em demonstrar habilidades avançadas de desenvolvimento front-end com arquitetura escalável, tipagem forte e boas práticas.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React Query](https://img.shields.io/badge/React%20Query-5.0-red)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🎯 Objetivo

Este projeto foi desenvolvido para enriquecer meu portfólio como desenvolvedor Front-End Pleno, demonstrando:

- ✅ Arquitetura escalável com monorepo patterns
- ✅ Type-safety completo com TypeScript e Orval
- ✅ Gerenciamento de estado moderno (React Query + Zustand + Nuqs)
- ✅ Visualização de dados geográficos (OpenLayers)
- ✅ Testes unitários e E2E
- ✅ CI/CD automatizado
- ✅ Design system com shadcn/ui

## 🚀 Tecnologias Principais

### Core
- **Next.js 15** - App Router, Server Components, SSR
- **TypeScript** - Type-safety completo
- **React 19** - Última versão estável

### Data Fetching & State
- **TanStack Query (React Query)** - Server state management
- **Orval** - Geração automática de hooks e types a partir do OpenAPI
- **Zustand** - Client state management
- **Nuqs** - URL state synchronization

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Componentes acessíveis baseados em Radix UI
- **Recharts** - Visualização de dados
- **OpenLayers** - Mapas e análise geográfica
- **Lucide React** - Ícones

### Mock & Testing
- **MSW (Mock Service Worker)** - API mocking
- **Faker.js** - Geração de dados realistas
- **Jest** - Unit testing
- **Testing Library** - Component testing
- **Cypress** - E2E testing

### DevOps & Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD

## 📁 Estrutura do Projeto

```
financial-dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/           # Página principal do dashboard
│   │   ├── transactions/        # Gerenciamento de transações
│   │   ├── investments/         # Portfólio de investimentos
│   │   ├── geographic/          # Análise geográfica
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx        # React Query + MSW setup
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── dashboard/           # Componentes do dashboard
│   │   ├── charts/              # Gráficos reutilizáveis
│   │   └── maps/                # Componentes de mapas
│   ├── lib/
│   │   ├── api/
│   │   │   ├── generated/       # Código gerado pelo Orval
│   │   │   └── client.ts        # Axios instance customizada
│   │   ├── mocks/
│   │   │   ├── handlers.ts      # MSW handlers
│   │   │   ├── generators.ts    # Geradores de dados mock
│   │   │   └── browser.ts       # MSW browser setup
│   │   └── utils/
│   │       ├── cn.ts            # Class name utilities
│   │       └── formatters.ts    # Formatação de dados
│   ├── hooks/                   # Custom hooks
│   └── types/                   # TypeScript types globais
├── cypress/
│   └── e2e/                     # Testes E2E
├── __tests__/                   # Testes unitários
├── openapi.yaml                 # Especificação da API
├── orval.config.ts              # Configuração do Orval
└── package.json
```

## 🎨 Features

### ✨ Dashboard Principal
- Resumo financeiro com cards interativos
- Gráficos de tendências de gastos
- Indicadores de performance
- Fluxo de caixa mensal

### 💸 Transações
- Lista paginada e filtrável
- Filtros por período, categoria e tipo
- Busca em tempo real
- Detalhes de transações
- Exportação de dados

### 📊 Investimentos
- Portfólio completo
- Gráficos de performance
- Distribuição por tipo
- Cálculo de lucros e perdas
- Histórico de evolução

### 🗺️ Análise Geográfica (Diferencial!)
- Mapa de calor de gastos
- Top localizações por volume
- Visualização com OpenLayers
- Insights baseados em localização
- Análise de padrões geográficos

## 🛠️ Setup e Instalação

### Pré-requisitos
- Node.js 18+ 
- pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/financial-dashboard.git

# Entre no diretório
cd financial-dashboard

# Instale as dependências
pnpm install

# Gere os tipos e hooks da API com Orval
pnpm generate:api

# Inicie o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Inicia servidor de desenvolvimento
pnpm generate:api           # Gera código a partir do OpenAPI
pnpm generate:api:watch     # Gera código em modo watch

# Build e Deploy
pnpm build                  # Build de produção
pnpm start                  # Inicia servidor de produção

# Qualidade de Código
pnpm lint                   # Executa ESLint
pnpm format                 # Formata código com Prettier
pnpm type-check             # Verifica tipos TypeScript

# Testes
pnpm test                   # Executa testes unitários
pnpm test:watch             # Testes em modo watch
pnpm test:e2e               # Abre Cypress
pnpm test:e2e:headless      # Executa testes E2E headless
```

## 🏗️ Arquitetura e Decisões Técnicas

### Por que Orval?
- **Type-safety completo**: Gera tipos TypeScript a partir do OpenAPI
- **Hooks automáticos**: Cria hooks do React Query automaticamente
- **Documentação viva**: OpenAPI serve como contrato da API
- **Fácil migração**: Preparado para quando houver backend real

### Por que MSW?
- **Desenvolvimento offline**: Não depende de backend
- **Testes realistas**: Simula latência e erros
- **Interceptação de requests**: Funciona tanto no browser quanto em testes
- **Produtividade**: Desenvolve front-end independentemente

### Por que OpenLayers?
- **Performance**: Renderização eficiente de grandes volumes de dados
- **Flexibilidade**: Customização completa de camadas e controles
- **Open Source**: Sem custos de licenciamento
- **Experiência real**: Usado em aplicações de geoprocessamento profissionais

## 🧪 Testes

### Testes Unitários
```bash
pnpm test
```

### Testes E2E
```bash
# Interface interativa
pnpm test:e2e

# Headless
pnpm test:e2e:headless
```

## 🚀 Deploy

O projeto está configurado para deploy fácil em:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

```bash
# Build de produção
pnpm build

# Preview local da build
pnpm start
```

## 📈 Performance

- ⚡ Lighthouse Score: 90+ em todas as métricas
- 🎯 First Contentful Paint: < 1.5s
- 🔄 Time to Interactive: < 3.0s
- 📦 Bundle size otimizado com code splitting

## 🎓 Conceitos Demonstrados

- [x] Server Components e Client Components (Next.js 15)
- [x] Type-safe API com OpenAPI + Orval
- [x] Server State com React Query
- [x] Client State com Zustand
- [x] URL State com Nuqs
- [x] Visualização de dados com Recharts
- [x] Mapas interativos com OpenLayers
- [x] Testes unitários e E2E
- [x] Mock de APIs com MSW
- [x] Design system com shadcn/ui
- [x] Acessibilidade (WCAG)
- [x] Responsividade mobile-first
- [x] Dark mode

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Krisley Velho**
- LinkedIn: [linkedin.com/in/krisley-velho](https://linkedin.com/in/krisley-velho)
- GitHub: [@krisleyvelho](https://github.com/krisleyvelho)
- Email: krisleyvelho@gmail.com

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela!
