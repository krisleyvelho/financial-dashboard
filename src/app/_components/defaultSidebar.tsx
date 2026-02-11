'use client'
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
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
  const { resetUser } = useSessionStore()
  return (
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
  )
}