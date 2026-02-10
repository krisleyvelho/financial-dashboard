import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen w-full dark:bg-slate-800">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] border-r bg-sidebar p-4 flex-col gap-4 dark:bg-slate-800">
        {/* Logo */}
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />

        {/* Menu items */}
        <div className="flex flex-col gap-3 mt-6 dark:bg-slate-600">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>

        {/* Logout */}
        <Skeleton className="h-9 w-full rounded-md mt-auto" />
      </aside>

      {/* Main */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b dark:bg-slate-800">
          <Skeleton className="h-8 w-8 rounded-md" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-10 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </header>

        {/* Content */}
        {/* <main className="flex-1 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-900 dark:to-slate-800"> */}
        <main className="flex-1 dark:bg-slate-800">

          <div className="container mx-auto px-4 py-16">
            {/* Hero */}
            <div className="flex flex-col items-center gap-6 mb-16">
              <Skeleton className="h-48 w-48 rounded-full" />
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-6 w-[500px] max-w-full" />
            </div>

            {/* Cards grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border dark:bg-slate-800 p-6 space-y-4 "
                >
                  <Skeleton className="dark:bg-slate-500/10 h-8 w-8" />
                  <Skeleton className="dark:bg-slate-500/10 h-5 w-32" />
                  <Skeleton className="dark:bg-slate-500/10 h-4 w-full" />
                  <Skeleton className="dark:bg-slate-500/10 h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
