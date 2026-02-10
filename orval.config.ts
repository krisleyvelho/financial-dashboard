import { defineConfig } from 'orval'

export default defineConfig({
  dashboard: {
    input: {
      target: './openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: './src/lib/api/generated',
      schemas: './src/lib/api/generated/models',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: './src/lib/api/client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'page',
          options: {
            staleTime: 300000, // 5 minutos
            refetchOnWindowFocus: false,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})
