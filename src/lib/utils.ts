import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MappedRoutes  = [
  { path: '/in', label: 'Home', description: '' },
  { path: '/in/dashboard', label: 'Dashboard',  description: 'Visão completa das suas finanças'},
  { path: '/in/transactions', label: 'Transações', description: 'Histórico detalhado de movimentações' },
  { path: '/in/investments', label: 'Investimentos', description: 'Acompanhe seu portfólio' },
  { path: '/in/geographic', label: 'Análise Geográfica', description: 'Onde você mais gasta' },
  { path: '/in/about-project', label: 'Sobre esse projeto' },
] as const
