// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import ThemeToggle from "../components/ThemeToggle";

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
          {/* Sticky Navbar */}
          <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-2xl font-extrabold font-primary">
              <a href="/">NextDex</a>
            </h1>
            <ThemeToggle />
          </nav>

          {/* Der eigentliche Seiteninhalt */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="text-center py-4 bg-white dark:bg-gray-800 shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} NextDex – Pokédex mit Next.js
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
