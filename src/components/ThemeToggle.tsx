// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle‐Button: Umschalten zwischen Light und Dark
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // resolvedTheme ist nützlich, weil theme="system" sein kann;
  // resolvedTheme gibt dann "light" oder "dark" zurück.
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  // Da `useTheme()` client‐seitig arbeitet, prüfen wir, ob wir schon im Browser sind:
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        setTheme(currentTheme === "light" ? "dark" : "light")
      }
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Theme umschalten"
    >
      {currentTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
