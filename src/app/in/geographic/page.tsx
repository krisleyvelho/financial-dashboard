'use client'

import { Suspense, useCallback, useState } from 'react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { MapPin, MoveHorizontal } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/formatters'
import { useGetTopLocationsSuspense } from '@/lib/api/generated/geographic/geographic'
import { FeatureProperties } from './_components/expense-map'
import { ExpenseMapWrapper } from './_components/expense-map-wrapper'

const PERIODS = ['30d', '90d', '1y'] as const
type Period = (typeof PERIODS)[number]

const PERIOD_LABELS: Record<Period, string> = {
  '30d': 'Últimos 30 dias',
  '90d': 'Últimos 90 dias',
  '1y': 'Último ano',
}

export default function GeographicPage() {
  return (
    <Suspense fallback={<GeographicSkeleton />}>
      <GeographicContent />
    </Suspense>
  )
}

function GeographicContent() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringLiteral(PERIODS).withDefault('30d')
  )

  const { data } = useGetTopLocationsSuspense({ period, limit: 50 })
  const [visibleFeatures, setVisibleFeatures] = useState<FeatureProperties[]>([])

  const handleVisibleFeaturesChange = useCallback((features: FeatureProperties[]) => {
    setVisibleFeatures(features)
  }, [])

  const sortedVisible = [...visibleFeatures].sort((a, b) => b.totalAmount - a.totalAmount)

  return (
    <>
      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${period === p
                ? 'bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900'
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden h-fit rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">Mapa de Gastos</h2>
            <p className="text-xs text-slate-500">
              Clique em um marcador para ver detalhes · Mova o mapa para filtrar o ranking
            </p>
          </div>
          <div className="h-[500px]">
            <ExpenseMapWrapper
              locations={data?.locations}
              className="h-full w-full"
              onVisibleFeaturesChange={handleVisibleFeaturesChange}
            />
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                  Visíveis no mapa
                </h2>
                <p className="text-xs text-slate-500">Ordenados por volume de gastos</p>
              </div>

              {sortedVisible.length > 0 && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {sortedVisible.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sortedVisible.length === 0 ? (
              <EmptySidebarState />
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[50dvh]">
                {sortedVisible.map((feature, index) => (
                  <SidebarItem key={feature.merchant} feature={feature} rank={index + 1} />
                ))}
              </ul>
            )}
          </div>

          {sortedVisible.length > 0 && (
            <SidebarFooter features={sortedVisible} />
          )}
        </div>
      </div>
    </>
  )
}

function SidebarItem({ feature, rank }: { feature: FeatureProperties; rank: number }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
        {rank}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
          {feature.merchant}
        </p>
        {feature.city && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{feature.city}</span>
          </div>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {formatCurrency(feature.totalAmount)}
        </p>
        <p className="text-xs text-slate-500">{feature.transactionCount}x</p>
      </div>
    </li>
  )
}

function SidebarFooter({ features }: { features: FeatureProperties[] }) {
  const totalAmount = features.reduce((sum, f) => sum + f.totalAmount, 0)
  const totalTransactions = features.reduce((sum, f) => sum + f.transactionCount, 0)

  return (
    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Total visível</span>
        <span>{totalTransactions} transações</span>
      </div>
      <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-slate-50">
        {formatCurrency(totalAmount)}
      </p>
    </div>
  )
}

function EmptySidebarState() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center text-slate-400">
      <MoveHorizontal className="h-8 w-8" />
      <div>
        <p className="text-sm font-medium">Nenhum local visível</p>
        <p className="mt-1 text-xs">Mova ou ajuste o zoom do mapa para ver os locais nesta área</p>
      </div>
    </div>
  )
}

function GeographicSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-9 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-[548px] animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 lg:col-span-2" />
        <div className="h-[548px] animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  )
}
