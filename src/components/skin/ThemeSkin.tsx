"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export interface ThemeSkinProps {
  round?: number;
}

export function ThemeSkin({ round = 0 }: ThemeSkinProps) {
  const pathname = usePathname();

  useEffect(() => {
    const skinEnv = process.env.NEXT_PUBLIC_SKIN ?? "classic";
    if (skinEnv === "off") {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.removeAttribute("data-round");
      return;
    }

    // Never style admin routes
    if (pathname && pathname.startsWith("/admin")) {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.removeAttribute("data-round");
      return;
    }

    const safeRound = Math.min(5, Math.max(0, Math.floor(round)));
    document.documentElement.setAttribute("data-theme", "classic");
    document.documentElement.setAttribute("data-round", String(safeRound));

    return () => {
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.removeAttribute("data-round");
      }
    };
  }, [round, pathname]);

  return null;
}
