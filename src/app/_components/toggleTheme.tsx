'use client';
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { SunMoon } from "lucide-react";

export function ToggleTheme() {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="flex items-center">
      <SunMoon className="size-5" />
      <Switch onCheckedChange={() => toggleTheme()} defaultChecked={theme === 'dark'} />
    </div>
  )
}