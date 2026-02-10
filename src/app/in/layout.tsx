import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DefaultSidebar } from '../_components/defaultSidebar'
import { SidebarGhost } from '../_components/sidebarGhost'
import '../globals.css'
import { Providers } from '../providers'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { PageTitle } from '../_components/pageTitle'
import { ToggleTheme } from '../_components/toggleTheme'
import { Header } from '../_components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Financial Dashboard - Gestão Financeira Inteligente',
  description:
    'Dashboard completo para análise financeira com visualização de transações, investimentos e insights geográficos',
  keywords: [
    'finanças',
    'dashboard',
    'investimentos',
    'transações',
    'análise financeira',
  ],
  authors: [{ name: 'Krisley Velho' }],
  openGraph: {
    title: 'Financial Dashboard',
    description: 'Gestão Financeira Inteligente',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className='flex flex-col min-h-screen w-full'>
        <DefaultSidebar />
        <Header />
        <SidebarGhost>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 w-full ">
            <div className="container mx-auto p-4">
              <PageTitle />
              {children}
            </div>
          </div>
        </SidebarGhost>
      </div>
    </Providers>
  )
}
