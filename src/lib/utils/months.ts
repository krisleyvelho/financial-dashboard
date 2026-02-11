import { format } from "date-fns"



export function getNextSixMonths(date: Date) {
  const monthList = []
  for (let i = 0; i < 6; i++) {
    const nativeMonth = new Date(date.getFullYear(), date.getMonth() + i, 1)
    const formatted = format(nativeMonth, 'yyyy-MM')
    const month = {
      name: nativeMonth.toLocaleString('pt-BR', { month: 'long' }),
      jsDateObj: nativeMonth,
      fnsDataObj: formatted
    }
    monthList.push(month)
  }
  return monthList
}