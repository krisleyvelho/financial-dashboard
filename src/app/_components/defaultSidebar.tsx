'use client'
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { MappedRoutes } from "@/lib/utils";
import { useSessionStore } from "@/state/session";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DefaultSidebarButton = ({ children }: { children: React.ReactNode }) => {
  const { setOpen: setSidebarOpen, isMobile, setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem onClick={() => isMobile ? setOpenMobile(false) : setSidebarOpen(false)} className="list-none px-0 rounded-lg border-b border-slate-300/40">
      {children}
    </SidebarMenuItem>
  )

}

const RoutesButtons = () => {
  const { setOpen: setSidebarOpen, isMobile, setOpenMobile } = useSidebar()
  return (
    <>
      {MappedRoutes.map(({ path, label }) => (
        <DefaultSidebarButton key={path} >
          <Link key={path} href={path} className="flex justify-between w-full px-4">
            {label} <ArrowUpRight />
          </Link>
          </DefaultSidebarButton>
      ))}
    </>
  )
}


export function DefaultSidebar() {
  const {user,resetUser } = useSessionStore()
  return (
    <>
      <Sidebar className="bg-red-300">
        <SidebarHeader className="flex justify-center items-center">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        </SidebarHeader>
        <SidebarContent className="gap-1 justify-start">
          <RoutesButtons />
          <DefaultSidebarButton>
            <Button onClick={resetUser} variant={'ghost'} className="w-full hover:bg-red-300/40">Logout</Button>
          </DefaultSidebarButton>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <div className="fixed p-2 hover:bg-slate-300/30 rounded-lg">
        <SidebarTrigger className="hover:bg-transparent" />
      </div>
    </>
  )
}