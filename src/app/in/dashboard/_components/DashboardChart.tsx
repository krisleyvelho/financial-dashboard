import { generateDashboardSummary } from '@/lib/mocks/generators';
import { formatCurrency } from '@/lib/utils/formatters';
import { getNextSixMonths } from '@/lib/utils/months';
import { useMemo } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Scatter, Tooltip, TooltipContentProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

function generateChartData() {
  const months = getNextSixMonths(new Date()).map((month) => month.name);
  const data = []

  for (let i = 0; i < months.length; i++) {
    const tempTendency = generateDashboardSummary()
    const tempData = {
      month: months[i],
      mi: tempTendency.monthlyIncome,
      me: tempTendency.monthlyExpenses,
      inv: tempTendency.investments,
      sav: tempTendency.savingsRate,
    }
    data.push(tempData)
  }

  return data
}

function ChartTooltipContent(props: TooltipContentProps<ValueType, NameType>) { 
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip ease-linear bg-slate-400/50 p-4 rounded-lg " style={{ color: 'black' }}>
        <p className='w-full flex justify-between text-primary'>{label}</p>
        <p className='w-full flex justify-between text-primary' >Receita Mensal: {formatCurrency(payload[0].payload.mi)}</p>
        <p className='w-full flex justify-between text-primary'>Despesas Mensais: {formatCurrency(payload[0].payload.me)}</p>
        <p className='w-full flex justify-between text-primary'>Investimentos: {formatCurrency(payload[0].payload.inv)}</p>
        <p className='w-full flex justify-between text-primary'>Taxa de Poupança: {payload[0].payload.sav.toFixed(2)}%</p>
     
      </div>
    );
  }

  return null;
}
export function DashboardChart(){

  const data = useMemo(() => generateChartData(), [])
  

  return (
    <ComposedChart
      style={{ width: '100%', maxHeight: '40vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="month" scale="band" name='Mes' />
      <YAxis  />
      <Tooltip content={ChartTooltipContent}/>
      <Legend />
      <Area type="monotone" dataKey="mi" fill="#8884d8" stroke="#8884d8" name='Receita Mensal' />
      <Bar dataKey="me" barSize={20} fill="#413ea0" name='Despesas Mensais' />
      <Line type="monotone" dataKey="inv" stroke="#ff7300" name='Investimentos' />
      <Scatter dataKey="sav" fill="red" name='Taxa de Poupança' />
      
    </ComposedChart>
  );
};
