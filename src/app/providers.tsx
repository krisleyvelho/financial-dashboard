'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useEffect, useMemo } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useSessionStore } from '@/state/session'
import { redirect, usePathname } from 'next/navigation'
import { DashboardSkeleton } from './_components/skeleton'
import { useTheme } from '@/hooks/use-theme'

async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('@/lib/mocks/browser')
    return worker.start({
      onUnhandledRequest: 'warn', // Mudei de 'bypass' para 'warn' para debug
    })
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const { handleTheme } = useTheme();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    handleTheme();
    initMocks()
      .then(() => {
        console.log('✅ MSW initialized') // Log para debug
        setMswReady(true)
      })
      .catch((error) => {
        console.error('❌ MSW initialization failed:', error)
        setMswReady(true) // Mesmo com erro, libera a UI
      })
  }, [])

  if (!mswReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        {/* <SessionProvider> */}
          <NuqsAdapter>{children}</NuqsAdapter>
        {/* </SessionProvider> */}
      </SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}


export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useSessionStore()
  const pathName = usePathname();

  const session = useMemo(() => ({ user }), [user]);
  if (!session.user && pathName !== '/') redirect('/')

  return (
    <>
      {children}
    </>

  )
}