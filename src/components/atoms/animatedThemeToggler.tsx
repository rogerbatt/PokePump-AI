"use client";

import { Moon, SunDim } from "lucide-react";
import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeProvider";

type props = {
  className?: string;
};

// Verificar suporte à View Transition API uma vez
const supportsViewTransition =
  typeof document !== "undefined" && "startViewTransition" in document;

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Determine if current theme is dark
  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const changeTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = isDarkMode ? "light" : "dark";

    // Fallback simples se View Transition não for suportado
    if (!supportsViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Usar View Transition API com otimizações
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    try {
      await transition.ready;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Cálculo otimizado do raio máximo
      const maxRad = Math.hypot(
        Math.max(rect.left, window.innerWidth - rect.left),
        Math.max(rect.top, window.innerHeight - rect.top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400, // Reduzido de 700ms para 400ms
          easing: "ease-out", // Mudado para ease-out para melhor percepção
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch (error) {
      // Fallback em caso de erro
      console.warn("View transition failed:", error);
    }
  }, [isDarkMode, setTheme]);
  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
      {isDarkMode ? (
        <SunDim className="text-secondary h-6 w-6" />
      ) : (
        <Moon className="text-white h-5 w-5" />
      )}
    </button>
  );
};
