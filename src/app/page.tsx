// src/app/page.tsx
import React from "react";
import PokemonGrid from "@/components/PokemonGrid";
// Typen für die API-Antwort
type PokemonOverview = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: PokemonOverview[];
};

export const dynamic = "force-static"; // Erzwingt SSG + ISR

/**
 * Extrahiert die ID aus der URL (z.B. ".../pokemon/25/" → "25")
 */
function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? matches[1] : "";
}

export default async function HomePage() {
  // 1. Server‐Seite: Hole die ersten 151 Pokémon
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 3600 }, // ISR: 1× pro Stunde neu generieren
  });
  const data: PokemonListResponse = await res.json();

  // 2. Extrahiere Name, URL und ID, übergebe an die Client-Komponente
  const minimalList = data.results.map((poke) => {
    const id = extractIdFromUrl(poke.url);
    return {
      id,
      name: poke.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      // Für den Typ greifen wir hier noch nicht zu – Client holt die Details später.
    };
  });

  return (
    <section className="py-12 px-6 lg:px-8 max-w-5xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-white font-primary">
        Die ersten 151 Pokémon
        <p className="mt-2 text-lg font-normal text-gray-300">
          Suche oder klicke ein Pokémon an für Details!
        </p>
      </h2>

      {/* Übergib die minimalen Daten in eine Client-Komponente */}
      <PokemonGrid initialList={minimalList} />
    </section>
  );
}
