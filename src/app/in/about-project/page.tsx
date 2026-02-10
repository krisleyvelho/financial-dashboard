import { Badge } from "@/components/ui/badge";

export default function AboutProjectPage() {

  const tecnologiesList = [
    "TypeScript",
    "React Query",
    "Orval",
    "MSW",
    "Tailwind CSS",
    "shadcn/ui",
    "OpenLayers",
    "Zustand",
    "Nuqs",
    "Recharts",
    "Jest + Cypress"
  ]
  return (
    <>
      <h3>Sobre esse projeto</h3>
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-50">
          Tecnologias Utilizadas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tecnologiesList.map((tech) => (
            <Badge key={tech} className="bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300/50">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}