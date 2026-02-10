'use client'

import { Suspense } from 'react'
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, Wallet, CreditCard, PiggyBank } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/formatters'
import { useGetDashboardSummary, useGetDashboardSummarySuspense } from '@/lib/api/generated/dashboard/dashboard'
import {DashboardChart} from './_components/DashboardChart'

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {
  const { data } = useGetDashboardSummarySuspense()

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Saldo Total"
          value={formatCurrency(data.totalBalance)}
          icon={<Wallet className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <SummaryCard
          title="Receita Mensal"
          value={formatCurrency(data.monthlyIncome)}
          icon={<ArrowUpIcon className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <SummaryCard
          title="Despesas Mensais"
          value={formatCurrency(data.monthlyExpenses)}
          icon={<ArrowDownIcon className="h-5 w-5" />}
          trend={{ value: 3.1, isPositive: false }}
        />
        <SummaryCard
          title="Investimentos"
          value={formatCurrency(data.investments)}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Indicadores */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Fluxo de Caixa
            </h3>
            <CreditCard className="h-5 w-5 text-slate-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(data.cashFlow)}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Receita menos despesas do mês
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Taxa de Poupança
            </h3>
            <PiggyBank className="h-5 w-5 text-slate-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {(data.savingsRate * 100).toFixed(1)}%
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Percentual economizado mensalmente
          </p>
        </div>
      </div>

      {/* Placeholder para gráficos */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
          Tendência de Gastos
        </h3>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <DashboardChart />
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend?: { value: number; isPositive: boolean }
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
        <div className="text-slate-500 dark:text-slate-400">{icon}</div>
      </div>
      <div className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          {trend.isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          )}
          <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
            {trend.value}%
          </span>
          <span className="text-slate-500">vs mês anterior</span>
        </div>
      )}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
    </div>
  )
}
