import { formatCurrency } from "@/lib/utils/formatters";
import { FeatureProperties } from "./expense-map";

interface FeatureTooltipProps {
  properties: FeatureProperties
  isSelected: boolean
}

export function FeatureTooltip({ properties, isSelected }: FeatureTooltipProps) {
  if (!isSelected) {
    return (
      <div className="pointer-events-none -translate-x-1/2 -translate-y-full pb-1">
        <div className="whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white shadow-md">
          {properties.merchant}
        </div>
        <div className="mx-auto h-2 w-2 -translate-y-0.5 rotate-45 bg-slate-900/90" />
      </div>
    )
  }

  return (
    <div className="-translate-x-1/2 -translate-y-[110%] h-fit">
      <div className="w-52 rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-red-500 px-3 py-2.5">
          <p className="truncate text-sm font-semibold text-white">{properties.merchant}</p>
          {properties.city && <p className="text-xs text-red-100">{properties.city}</p>}
        </div>
        <div className="divide-y divide-slate-100 px-3">
          <TooltipRow label="Total gasto" value={formatCurrency(properties.totalAmount)} />
          <TooltipRow label="Transações" value={String(properties.transactionCount)} />
          <TooltipRow label="Ticket médio" value={formatCurrency(properties.averageAmount)} />
        </div>
      </div>
      <div className="mx-auto h-3 w-3 -translate-y-1 rotate-45 border-b border-r border-slate-200 bg-white" />
    </div>
  )
}

function TooltipRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
}