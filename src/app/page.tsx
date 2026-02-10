'use client'

import { Button } from '@/components/ui/button'
import { User, useSessionStore } from '@/state/session'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const { setUser} = useSessionStore()

  function execLogin() {
    const tempUser: User = {
      id: '123',
      name: 'Krisley',
      type: "admin"
    }
    setUser(tempUser)
    redirect('/in')
  }
  return (
    <div>login

      <Button onClick={() => execLogin()}>Login temporario</Button>
    </div>
  )
}