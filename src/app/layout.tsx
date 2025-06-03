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
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class">
          <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
            <h1 className="text-2xl font-bold">
              <a href="/">NextDex</a>
            </h1>
            <ThemeToggle />
          </nav>
          <main>{children}</main>
          <footer className="text-center py-4 bg-white dark:bg-gray-800 shadow">
            © {new Date().getFullYear()} NextDex – Pokédex mit Next.js
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
