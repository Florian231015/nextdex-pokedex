// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import { FavoritesProvider } from "@/context/FavoritesContent";
// Falls du CompareContext client‐seitig brauchst, importiere ihn hier:
// import { CompareProvider } from "../context/CompareContext";

export const metadata = {
  title: "NextDex – Interaktiver Pokédex",
  description: "Entdecke alle Pokémon mit Next.js 15 und React 19",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-gray-100">
        <ThemeProvider attribute="class">
          {/* Wrappe die App mit FavoritesProvider, damit alle Komponenten useFavorites() nutzen können */}
          <FavoritesProvider>
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Links‐Bereich */}
                  <div className="flex space-x-8">
                    {/* Logo oder Home‐Link */}
                    <Link href="/" className="flex items-center text-2xl font-extrabold font-primary text-gray-800 dark:text-gray-100">
                      NextDex
                    </Link>
                    {/* Navigationslinks */}
                    <Link
                      href="/"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/favorites"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      Favoriten
                    </Link>
                    <Link
                      href="/compare"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      Vergleich
                    </Link>
                  </div>

                  {/* ThemeToggle‐Button auf der rechten Seite */}
                  <div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>

            {/* Hauptinhalt der Seite */}
            <main className="min-h-screen">{children}</main>

            {/* Footer */}
            <footer className="text-center py-4 bg-white dark:bg-gray-800 shadow-inner">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} NextDex – Pokédex mit Next.js
              </p>
            </footer>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
