import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { ExpenseMap } from './expense-map'

const ExpenseMapDynamic = dynamic(
  () => import('./expense-map').then((mod) => mod.ExpenseMap),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
)

function MapSkeleton() {
  return (
    <div className="h-full w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  )
}

export function ExpenseMapWrapper(props: ComponentProps<typeof ExpenseMap>) {
  return <ExpenseMapDynamic {...props} />
}
