'use client';

import { useSidebar } from "@/components/ui/sidebar"

export function SidebarGhost({children}: {children: React.ReactNode}) {
  const {open, toggleSidebar, isMobile} = useSidebar()

  const nextedChildren = () => {
    if(open && !isMobile ) {
      return (
        <div className="p-0 m-0 w-full h-full blur-sm bg-slate-500" 
          role="button" 
          onClick={() => toggleSidebar()}>
            {children}
        </div>
      )
    }
    return children
  }

  return nextedChildren()
}