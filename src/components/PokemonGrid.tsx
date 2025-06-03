// src/components/PokemonGrid.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

// Typ definition für die Props
interface PokemonGridProps {
  initialList: {
    id: string;
    name: string;
    image: string;
  }[];
}

export default function PokemonGrid({ initialList }: PokemonGridProps) {
  // Client-Seite: Suche und Filter
  const [filterText, setFilterText] = useState("");

  // Filterfunktion: nach Name (case‐insensitive) oder nach ID (ganzzahlig)
  const filtered = initialList.filter((poke) => {
    const lowerName = poke.name.toLowerCase();
    const query = filterText.toLowerCase().replace(/^#?/, "");
    return lowerName.includes(query) || poke.id.includes(query);
  });

  return (
    <div>
      {/* Suche */}
      <SearchBar onSearch={(q) => setFilterText(q)} />

      {/* Grid der Pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {filtered.map((poke) => (
          <Link key={poke.id} href={`/pokemon/${poke.id}`} passHref>
            <PokemonCard
              name={poke.name}
              id={poke.id}
              image={poke.image}
              primaryType="default"
              allTypes={[]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
