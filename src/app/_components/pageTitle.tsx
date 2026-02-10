'use client';

import { Button } from "@/components/ui/button";
import { MappedRoutes } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export function PageTitle() {
  const pathName = usePathname();
  const router = useRouter();

  const pageData = useMemo(() => {
    const page = MappedRoutes.find(({ path }) => path === pathName);
    return page;
  }, [pathName]);

  if (pathName === '/in') return null;

  return (
    <div className="flex flex-col w-fit">
      <div className="flex gap-4">

        <Button onClick={() => router.back()}><ArrowLeft className="h-8 w-8" /></Button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{pageData?.label}</h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        {pageData?.description}
      </p>
    </div>
  )
}