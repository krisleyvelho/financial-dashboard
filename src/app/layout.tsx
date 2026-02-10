import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-gradient-to-br from-slate-50 to-slate-100')}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
