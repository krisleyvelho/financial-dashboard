import { MappedRoutes } from '@/lib/utils'
import { ArrowRight, MapPin, PieChart, TrendingUp, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const test: typeof MappedRoutes[number]['path'][] = ['/in/dashboard','/in/transactions','/in/investments','/in/geographic']
  const cardsLists = MappedRoutes.filter((route) => test.includes(route.path))
  // const cards = MappedRoutes.filter((route) => route.path !== '/in')
  return (
    <div className='flex flex-col justify-between items-center h-full gap-4 md:gap-24'>
      <div className='flex flex-col items-center justify-center'>
        <Image src="/images/logo.png" alt="Logo" width={200} height={200} /> 
        <div className="text-center">
          <h1 className="my-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Financial Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            Gestão financeira inteligente com visualização de dados, análise de investimentos e
            insights geográficos
          </p>
        </div>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardsLists.map(({ path, label, description}) => (
          <FeatureCard
            key={path}
            icon={<Wallet className="h-8 w-8" />}
            title={label}
            description={description}
            href={path}
          />
        ))}
      </div>

     
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description?: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
    >
      <div className="mb-3 text-slate-700 dark:text-slate-300">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-slate-900 group-hover:text-slate-700 dark:text-slate-50 dark:group-hover:text-slate-300">
        Acessar
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}