# 🎉 Próximos Passos - Financial Dashboard

Parabéns! A estrutura base do projeto foi criada com sucesso. Aqui estão os próximos passos para começar a desenvolver:

## 1️⃣ Instalar Dependências

```bash
npm install
```

## 2️⃣ Gerar Código da API

O Orval irá gerar todos os hooks do React Query e types TypeScript a partir do `openapi.yaml`:

```bash
npm run generate:api
```

Isso criará a pasta `src/lib/api/generated/` com todo o código necessário.

## 3️⃣ Instalar shadcn/ui Components

O projeto usa shadcn/ui. Você precisará inicializá-lo:

```bash
npx shadcn@latest init
```

Quando perguntado, use estas configurações:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: tailwind.config.js
- Components: @/components
- Utils: @/lib/utils
- React Server Components: Yes
- Write to app directory: Yes

Depois, instale os componentes base:

```bash
npx shadcn@latest add button card input label select skeleton table tabs toast tooltip
```

## 4️⃣ Adicionar Dependency Faltante

```bash
npm install tailwindcss-animate
```

## 5️⃣ Inicializar MSW

O MSW precisa gerar o service worker:

```bash
npx msw init public/ --save
```

## 6️⃣ Rodar o Projeto

```bash
npm run dev
```

Acesse http://localhost:3000

## 📝 Desenvolvimento

### Estrutura de Páginas a Criar

1. **`src/app/dashboard/page.tsx`**
   - Cards com resumo financeiro
   - Gráficos de tendências
   - Componentes usando hooks gerados pelo Orval

2. **`src/app/transactions/page.tsx`**
   - Tabela com transações
   - Filtros com Nuqs (URL state)
   - Paginação

3. **`src/app/investments/page.tsx`**
   - Cards de investimentos
   - Gráficos de performance
   - Distribuição por tipo

4. **`src/app/geographic/page.tsx`**
   - Mapa com OpenLayers
   - Heatmap de gastos
   - Top localizações

### Exemplos de Uso dos Hooks Gerados

```typescript
// Em qualquer componente client
'use client'

import { useGetDashboardSummary } from '@/lib/api/generated/dashboard'

export function DashboardSummary() {
  const { data, isLoading, error } = useGetDashboardSummary()

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar</div>

  return (
    <div>
      <h2>Saldo Total: R$ {data.totalBalance}</h2>
      {/* ... */}
    </div>
  )
}
```

### Filtros com Nuqs

```typescript
'use client'

import { useQueryState, parseAsStringLiteral } from 'nuqs'

export function TransactionFilters() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringLiteral(['7d', '30d', '90d', '1y']).withDefault('30d')
  )

  return (
    <Select value={period} onValueChange={setPeriod}>
      {/* ... */}
    </Select>
  )
}
```

## 🧪 Testes

### Criar Testes Unitários

Crie arquivos `*.test.tsx` ou `*.spec.tsx` em `__tests__/`:

```typescript
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Component from '@/components/Component'

describe('Component', () => {
  it('renders correctly', () => {
    const queryClient = new QueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    )
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Criar Testes E2E

Adicione arquivos em `cypress/e2e/`:

```typescript
describe('Transactions Page', () => {
  it('should filter transactions by period', () => {
    cy.visit('/transactions')
    cy.get('[data-testid="period-filter"]').click()
    cy.get('[data-value="7d"]').click()
    cy.url().should('include', 'period=7d')
  })
})
```

## 🎨 Componentização

Organize componentes seguindo esta estrutura:

```
components/
├── ui/              # shadcn/ui (gerados automaticamente)
├── dashboard/       # Componentes específicos do dashboard
│   ├── summary-card.tsx
│   ├── revenue-chart.tsx
│   └── expense-chart.tsx
├── charts/          # Componentes de gráficos reutilizáveis
│   ├── line-chart.tsx
│   └── pie-chart.tsx
└── maps/            # Componentes de mapas
    ├── expense-heatmap.tsx
    └── location-markers.tsx
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe o repositório no Vercel
3. Configure as variáveis de ambiente (se necessário)
4. Deploy!

### Outras Plataformas

O projeto está pronto para deploy em:
- Netlify
- AWS Amplify
- Railway
- Render

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Orval Docs](https://orval.dev/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [OpenLayers Docs](https://openlayers.org/)
- [MSW Docs](https://mswjs.io/)

## 💡 Dicas

1. **Use o React Query DevTools**: Já está configurado, pressione a aba no canto inferior da tela
2. **Explore o OpenAPI**: Edite `openapi.yaml` e rode `npm run generate:api` para ver mudanças
3. **MSW Handlers**: Modifique `src/lib/mocks/handlers.ts` para simular diferentes cenários
4. **Componentes UI**: Use `npx shadcn@latest add [component]` para adicionar novos componentes

## 🐛 Problemas Comuns

### Erro "Module not found"
Rode `npm run generate:api` para gerar os tipos da API

### MSW não está interceptando
Certifique-se de que rodou `npx msw init public/`

### Tipos não estão sendo reconhecidos
Rode `npm run type-check` para ver erros de tipagem

---

Boa sorte com o desenvolvimento! 🚀
