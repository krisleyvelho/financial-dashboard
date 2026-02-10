'use client'

import { Button } from '@/components/ui/button'
import { useActionState, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  useSessionStore } from '@/state/session'
import { redirect } from 'next/navigation'
import { type User, generateUser } from '@/lib/mocks/generators'
interface LoginState {
  success: boolean
  message?: string
}

export default function LoginPage() {
  const { setUser: setUserSession} = useSessionStore()

  const [user, setUser] = useState<{ name: string; type: User['type'] } | null>(
    null
  )

  async function loginAction(
    _prevState: LoginState,
    formData: FormData
  ): Promise<LoginState> {
    const name = formData.get("name")
    const type = formData.get("type")
  
    if (!name || !type) {
      return { success: false, message: "Gere um usuário antes de logar." }
    }

    setUserSession({ id: Math.random().toString(), name, type })  
  
    redirect('/in')
  }

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
  })

  function handleGenerateUser() {
    setUser(generateUser())
  }

  return (
    <div className="flex min-h-screen items-center justify-center w-full bg-primary-foreground">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={user?.name ?? ""}
                readOnly
                placeholder="Gere um usuário"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="type">Tipo</Label>
              <Input
                id="type"
                name="type"
                value={user?.type ?? ""}
                readOnly
                placeholder="admin | user"
              />
            </div>

            {state.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-600" : "text-red-500"
                }`}
              >
                {state.message}
              </p>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Entrando..." : "Logar-se"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateUser}
              >
                Gerar usuário aleatório
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
