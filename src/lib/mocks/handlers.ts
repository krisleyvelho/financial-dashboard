import { http, HttpResponse, delay } from 'msw'
import {
  generateTransactions,
  generateDashboardSummary,
  generateInvestment,
  generateTransactionStats,
  generateCategoryBreakdown,
  generateGeographicHeatmap,
} from './generators'
import type {
  DashboardSummary,
  TransactionListResponse,
  Transaction,
  InvestmentResponse,
  InvestmentPerformance,
  SpendingTrends,
  CategoryBreakdown,
  GeographicHeatmap,
  TopLocations,
} from '../api/generated/models'

// Cache de transações para consistência
let transactionsCache: Transaction[] | null = null

function getTransactions() {
  if (!transactionsCache) {
    transactionsCache = generateTransactions(150)
  }
  return transactionsCache
}

export const handlers = [
  // Dashboard Summary
  http.get('/api/dashboard/summary', async () => {
    await delay(500)
    const summary: DashboardSummary = generateDashboardSummary()
    return HttpResponse.json(summary)
  }),

  // Transactions List
  http.get('/api/transactions', async ({ request }) => {
    await delay(600)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30d'
    const category = url.searchParams.get('category')
    const type = url.searchParams.get('type')
    const page = parseInt(url.searchParams.get('page') || '1')
    const perPage = parseInt(url.searchParams.get('perPage') || '10')

    let allTransactions = getTransactions()

    // Filtrar por período
    const periodDays: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    if (period !== 'all' && periodDays[period]) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - periodDays[period])
      allTransactions = allTransactions.filter(
        (t) => new Date(t.date) >= cutoffDate
      )
    }

    // Filtrar por categoria
    if (category) {
      allTransactions = allTransactions.filter((t) => t.category === category)
    }

    // Filtrar por tipo
    if (type) {
      allTransactions = allTransactions.filter((t) => t.type === type)
    }

    // Paginação
    const start = (page - 1) * perPage
    const paginatedData = allTransactions.slice(start, start + perPage)

    const response: TransactionListResponse = {
      data: paginatedData,
      meta: {
        total: allTransactions.length,
        page,
        perPage,
        totalPages: Math.ceil(allTransactions.length / perPage),
      },
    }

    return HttpResponse.json(response)
  }),

  // Transaction by ID
  http.get('/api/transactions/:id', async ({ params }) => {
    await delay(300)

    const { id } = params
    const transaction = getTransactions().find((t) => t.id === id)

    if (!transaction) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(transaction)
  }),

  // Transaction Stats
  http.get('/api/transactions/stats', async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30d'

    const periodDays: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    let transactions = getTransactions()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - periodDays[period])
    transactions = transactions.filter((t) => new Date(t.date) >= cutoffDate)

    const stats = generateTransactionStats(transactions)

    return HttpResponse.json(stats)
  }),

  // Investments
  http.get('/api/investments', async () => {
    await delay(500)

    const investments = Array.from({ length: 8 }, generateInvestment)
    const total = investments.reduce((sum, inv) => sum + inv.value, 0)
    const totalProfit = investments.reduce((sum, inv) => sum + inv.profit!, 0)
    const profitPercentage = (totalProfit / (total - totalProfit)) * 100

    const distribution = investments.reduce(
      (acc, inv) => {
        acc[inv.type] = (acc[inv.type] || 0) + inv.value
        return acc
      },
      {} as Record<string, number>
    )

    const response: InvestmentResponse = {
      total,
      totalProfit,
      profitPercentage,
      investments,
      distribution,
    }

    return HttpResponse.json(response)
  }),

  // Investment Performance
  http.get('/api/investments/performance', async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '1y'

    const periodMonths: Record<string, number> = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12,
      all: 36,
    }

    const months = periodMonths[period] || 12
    const data = Array.from({ length: months }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (months - i - 1))
      const baseValue = 15000
      const growth = i * 100
      const variance = (Math.random() - 0.5) * 500

      return {
        date: date.toISOString().split('T')[0],
        value: baseValue + growth + variance,
        profit: growth + variance,
      }
    })

    const response: InvestmentPerformance = {
      period,
      data,
    }

    return HttpResponse.json(response)
  }),

  // Spending Trends
  http.get('/api/analytics/spending-trends', async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '90d'

    const periodDays: Record<string, number> = {
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    const days = periodDays[period] || 90
    const groupBy = days > 90 ? 'month' : 'week'

    const trends = Array.from({ length: days > 90 ? 12 : Math.ceil(days / 7) }, (_, i) => {
      const date = new Date()
      if (groupBy === 'month') {
        date.setMonth(date.getMonth() - (12 - i - 1))
      } else {
        date.setDate(date.getDate() - (Math.ceil(days / 7) - i - 1) * 7)
      }

      return {
        date: date.toISOString().split('T')[0],
        amount: Math.random() * 3000 + 1000,
        category: 'all',
      }
    })

    const response: SpendingTrends = {
      period,
      trends,
    }

    return HttpResponse.json(response)
  }),

  // Category Breakdown
  http.get('/api/analytics/category-breakdown', async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30d'

    const periodDays: Record<string, number> = {
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    let transactions = getTransactions()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - periodDays[period])
    transactions = transactions.filter((t) => new Date(t.date) >= cutoffDate)

    const breakdown: CategoryBreakdown = generateCategoryBreakdown(transactions)

    return HttpResponse.json(breakdown)
  }),

  // Geographic Heatmap
  http.get('/api/geographic/heatmap', async ({ request }) => {
    await delay(600)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '90d'

    const periodDays: Record<string, number> = {
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    let transactions = getTransactions()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - periodDays[period])
    transactions = transactions.filter((t) => new Date(t.date) >= cutoffDate)

    const heatmap: GeographicHeatmap = generateGeographicHeatmap(transactions)

    return HttpResponse.json(heatmap)
  }),

  // Top Locations
  http.get('/api/geographic/top-locations', async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30d'
    const limit = parseInt(url.searchParams.get('limit') || '10')

    const periodDays: Record<string, number> = {
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }

    let transactions = getTransactions()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - periodDays[period])
    transactions = transactions
      .filter((t) => new Date(t.date) >= cutoffDate)
      .filter((t) => t.location && t.type === 'expense')

    const merchantGroups = transactions.reduce(
      (acc, t) => {
        if (!t.merchant || !t.location) return acc

        if (!acc[t.merchant]) {
          acc[t.merchant] = {
            merchant: t.merchant,
            location: t.location,
            totalAmount: 0,
            transactionCount: 0,
            amounts: [],
          }
        }

        acc[t.merchant].totalAmount += t.amount
        acc[t.merchant].transactionCount += 1
        acc[t.merchant].amounts.push(t.amount)

        return acc
      },
      {} as Record<
        string,
        {
          merchant: string
          location: unknown
          totalAmount: number
          transactionCount: number
          amounts: number[]
        }
      >
    )

    const locations = Object.values(merchantGroups)
      .map((group) => ({
        merchant: group.merchant,
        location: group.location,
        totalAmount: group.totalAmount,
        transactionCount: group.transactionCount,
        averageAmount:
          group.amounts.reduce((sum, a) => sum + a, 0) / group.amounts.length,
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, limit) as TopLocations['locations']

    const response: TopLocations = {
      locations,
    }

    return HttpResponse.json(response)
  }),
]
