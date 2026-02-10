'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleTheme } from "./toggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSessionStore } from "@/state/session";

export function Header() {
  const { user, resetUser } = useSessionStore()
  return (
    <header className="flex w-full max-h-24 justify-between p-4 bg-primary-foreground shadow-sm">
      <SidebarTrigger className="hover:bg-transparent" />
      <div className="flex items-center gap-4">

        <ToggleTheme />
        <div className="rounded-3xl p-2 border-primary/50 border-[1px]">
          <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <span>{user?.name ?? "Não identificado"}</span>

              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => resetUser()}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}