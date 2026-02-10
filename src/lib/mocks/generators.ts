import { faker } from '@faker-js/faker'
import type {
  Transaction,
  Investment,
  Location,
  DashboardSummary,
  TransactionStats,
  CategoryBreakdown,
  GeographicHeatmap,
} from '../api/generated/models'


export type User = {
  id: string
  name: string
  type: 'admin' | 'user'
}

const CATEGORIES = [
  'food',
  'transport',
  'housing',
  'entertainment',
  'health',
  'education',
  'shopping',
  'salary',
  'investment',
  'other',
] as const

const TRANSACTION_TYPES = ['income', 'expense'] as const
export type TransactionType = typeof TRANSACTION_TYPES[number]

const INVESTMENT_TYPES = [
  'stocks',
  'crypto',
  'bonds',
  'real-estate',
  'funds',
  'savings',
] as const

// Coordenadas base de Florianópolis, SC para simular localidades próximas
export const BASE_LAT = -27.5969
export const BASE_LNG = -48.5495

export function generateUser() {
  const names = ["Lucas", "Ana", "Marcos", "Beatriz", "Rafael"]
  const types: User['type'][] = ["admin", "user"]

  return {
    name: names[Math.floor(Math.random() * names.length)],
    type: types[Math.floor(Math.random() * types.length)],
  }
}


export function generateLocation(): Location {
  // Gera coordenadas próximas a Florianópolis, SC	
  const latOffset = (Math.random() - 0.5) * 0.1
  const lngOffset = (Math.random() - 0.5) * 0.1

  return {
    latitude: BASE_LAT + latOffset,
    longitude: BASE_LNG + lngOffset,
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement([
      'São José',
      'Palhoça',
      'Biguaçu',
      'Florianópolis',
    ]),
    state: 'SC',
  }
}

export function generateTransaction(): Transaction {
  const type = faker.helpers.arrayElement(TRANSACTION_TYPES)
  const isIncome = type === 'income'

  const category = isIncome
    ? faker.helpers.arrayElement(['salary', 'investment'])
    : faker.helpers.arrayElement([
        'food',
        'transport',
        'housing',
        'entertainment',
        'health',
        'education',
        'shopping',
        'other',
      ])

  const merchants = {
    food: ['Supermercado ABC', 'Restaurante DelÍcia', 'Padaria Pão Quente', 'Açougue Central'],
    transport: ['Posto Ipiranga', 'Uber', '99 Taxi', 'Auto Peças Orleans'],
    housing: ['Imobiliária Lar Doce Lar', 'Construtora Brasil', 'Elétrica Central'],
    entertainment: ['Cinema Orleans', 'Netflix', 'Spotify', 'Steam'],
    health: ['Farmácia Popular', 'Clínica Saúde +', 'Drogaria São Paulo'],
    education: ['Livraria Cultura', 'Udemy', 'Coursera'],
    shopping: ['Magazine Luiza', 'Americanas', 'Mercado Livre'],
    salary: ['Empresa XYZ Ltda'],
    investment: ['Corretora XP', 'NuInvest'],
    other: ['Diversos'],
  }

  const merchant =
    faker.helpers.arrayElement(merchants[category as keyof typeof merchants]) ||
    faker.company.name()

  return {
    id: faker.string.uuid(),
    date: faker.date.recent({ days: 90 }).toISOString(),
    description: merchant,
    amount: parseFloat(
      faker.finance.amount({
        min: isIncome ? 1000 : 10,
        max: isIncome ? 8000 : 500,
        dec: 2,
      })
    ),
    category,
    type,
    merchant,
    location: Math.random() > 0.3 ? generateLocation() : undefined,
    tags: faker.helpers.arrayElements(
      ['recurring', 'essential', 'leisure', 'urgent'],
      { min: 0, max: 2 }
    ),
    notes: Math.random() > 0.7 ? faker.lorem.sentence() : undefined,
  }
}

export function generateTransactions(count: number = 50): Transaction[] {
  return Array.from({ length: count }, generateTransaction).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function generateInvestment(): Investment {
  const averagePrice = parseFloat(faker.finance.amount({ min: 10, max: 200, dec: 2 }))
  const quantity = faker.number.int({ min: 10, max: 1000 })
  const currentPrice = averagePrice * faker.number.float({ min: 0.8, max: 1.3 })
  const value = currentPrice * quantity
  const profit = (currentPrice - averagePrice) * quantity
  const profitPercentage = ((currentPrice - averagePrice) / averagePrice) * 100

  const stockNames = [
    'Ações PETR4',
    'Ações VALE3',
    'Ações ITUB4',
    'Ações BBDC4',
    'Ações MGLU3',
  ]
  const cryptoNames = ['Bitcoin', 'Ethereum', 'Cardano', 'Solana']
  const bondNames = ['Tesouro Selic', 'Tesouro IPCA+', 'CDB Banco XYZ']
  const fundNames = ['Fundo Imobiliário HGLG11', 'Fundo XP Malls', 'Fundo Dividendos']

  const type = faker.helpers.arrayElement(INVESTMENT_TYPES)
  let name: string

  switch (type) {
    case 'stocks':
      name = faker.helpers.arrayElement(stockNames)
      break
    case 'crypto':
      name = faker.helpers.arrayElement(cryptoNames)
      break
    case 'bonds':
      name = faker.helpers.arrayElement(bondNames)
      break
    case 'funds':
      name = faker.helpers.arrayElement(fundNames)
      break
    default:
      name = `Investimento ${type}`
  }

  return {
    id: faker.string.uuid(),
    name,
    type,
    value,
    quantity,
    averagePrice,
    currentPrice,
    profit,
    profitPercentage,
    lastUpdate: faker.date.recent({ days: 7 }).toISOString(),
  }
}

export function generateDashboardSummary(): DashboardSummary {
  const randomFloat = (min: number, max: number) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2))

  const monthlyIncome = randomFloat(4000, 12000)
  const monthlyExpenses = randomFloat(2000, monthlyIncome * 0.8)
  const investments = randomFloat(5000, monthlyIncome - monthlyExpenses)
  const totalBalance = monthlyIncome * 6 - monthlyExpenses * 6 + investments
  const savingsRate = (monthlyIncome - monthlyExpenses) / monthlyIncome
  const cashFlow = monthlyIncome - monthlyExpenses

  return {
    totalBalance: parseFloat(totalBalance.toFixed(2)),
    monthlyIncome,
    monthlyExpenses,
    investments,
    savingsRate: parseFloat(savingsRate.toFixed(2)),
    cashFlow,
  }
}

export function generateTransactionStats(transactions: Transaction[]): TransactionStats {
  const incomeTransactions = transactions.filter((t) => t.type === 'income')
  const expenseTransactions = transactions.filter((t) => t.type === 'expense')

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0)

  const categoryCounts = transactions.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'other'

  return {
    totalIncome,
    totalExpenses,
    averageTransaction: transactions.length > 0 ? totalExpenses / expenseTransactions.length : 0,
    largestExpense: expenseTransactions.sort((a, b) => b.amount - a.amount)[0],
    largestIncome: incomeTransactions.sort((a, b) => b.amount - a.amount)[0],
    topCategory,
    transactionCount: transactions.length,
  }
}

export function generateCategoryBreakdown(transactions: Transaction[]): CategoryBreakdown {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense')
  const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0)

  const categoryData = expenseTransactions.reduce(
    (acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { amount: 0, count: 0 }
      }
      acc[t.category].amount += t.amount
      acc[t.category].count += 1
      return acc
    },
    {} as Record<string, { amount: number; count: number }>
  )

  const categories = Object.entries(categoryData).map(([category, data]) => ({
    category,
    amount: data.amount,
    percentage: (data.amount / total) * 100,
    transactionCount: data.count,
  }))

  return { categories }
}

export function generateGeographicHeatmap(transactions: Transaction[]): GeographicHeatmap {
  const transactionsWithLocation = transactions.filter((t) => t.location && t.type === 'expense')

  const locationGroups = transactionsWithLocation.reduce(
    (acc, t) => {
      if (!t.location) return acc

      const key = `${t.location.latitude.toFixed(3)},${t.location.longitude.toFixed(3)}`
      if (!acc[key]) {
        acc[key] = {
          latitude: t.location.latitude,
          longitude: t.location.longitude,
          amount: 0,
        }
      }
      acc[key].amount += t.amount
      return acc
    },
    {} as Record<string, { latitude: number; longitude: number; amount: number }>
  )

  const points = Object.values(locationGroups)
  const maxAmount = Math.max(...points.map((p) => p.amount))

  return {
    points: points.map((p) => ({
      ...p,
      intensity: p.amount / maxAmount,
    })),
  }
}
