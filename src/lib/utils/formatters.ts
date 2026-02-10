import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TransactionType } from '../mocks/generators'

/**
 * Formata valor monetário em Real brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata porcentagem
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Formata data em formato brasileiro
 */
export function formatDate(date: string | Date, pattern: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, pattern, { locale: ptBR })
}

/**
 * Formata data em formato relativo (ex: "há 2 dias")
 */
export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ptBR })
}

/**
 * Formata números grandes de forma abreviada
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value)
}

/**
 * Traduz categoria para português
 */
export function translateCategory(category: string): string {
  const translations: Record<string, string> = {
    food: 'Alimentação',
    transport: 'Transporte',
    housing: 'Moradia',
    entertainment: 'Entretenimento',
    health: 'Saúde',
    education: 'Educação',
    shopping: 'Compras',
    salary: 'Salário',
    investment: 'Investimento',
    other: 'Outros',
  }
  return translations[category] || category
}

/**
 * Traduz tipo de transação
 */
export function translateTransactionType(type: TransactionType): string {
  const translations: Record<TransactionType, string> = {
    income: 'Receita',
    expense: 'Despesa',
  }
  return translations[type] || type
}

/**
 * Traduz tipo de investimento
 */
export function translateInvestmentType(type: string): string {
  const translations: Record<string, string> = {
    stocks: 'Ações',
    crypto: 'Criptomoedas',
    bonds: 'Renda Fixa',
    'real-estate': 'Imóveis',
    funds: 'Fundos',
    savings: 'Poupança',
  }
  return translations[type] || type
}
