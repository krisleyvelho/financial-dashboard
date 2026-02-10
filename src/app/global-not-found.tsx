import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className='bg-slate-600 flex justify-center items-center h-screen'>
        <div className='text-slate-100 text-center w-1/3 flex flex-col gap-4 items-center'>

        <h1 className="text-xl">Ops, houve um problema com a navegação</h1>
        <p>Aparentemente a página que você está procurando não existe ou está indisponível no momento.</p>
        <Link href="/in" className="text-md">Voltar para a página inicial</Link>
        </div>
      </body>
    </html>
  )
}