// src/app/page.tsx
import React from "react";
import Link from "next/link";
import PokemonCard from "../components/PokemonCard";

// TS-Typen für die API-Antwort
type PokemonOverview = {
  name: string;
  url: string;
};
type PokemonListResponse = {
  results: PokemonOverview[];
};

export const dynamic = "force-static"; // Erzwingt SSG mit ISR

function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? matches[1] : "";
}

export default async function HomePage() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 3600 }, // ISR: alle 3600s neu bauen
  });
  const pokemonList: PokemonListResponse = await res.json();

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Die ersten 151 Pokémon
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {pokemonList.results.map((poke) => {
          const id = extractIdFromUrl(poke.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <Link key={id} href={`/pokemon/${id}`} passHref>
              <PokemonCard name={poke.name} id={id} image={imageUrl} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
