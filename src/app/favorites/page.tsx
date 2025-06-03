// src/app/favorites/page.tsx
"use client";

import React from "react";
import PokemonCard from "../../components/PokemonCard";
import { useFavorites } from "@/context/FavoritesContent";
import Link from "next/link";

interface MinimalPokemon {
  id: string;
  name: string;
  image: string;
}

async function fetchBasicPokemonInfo(id: string): Promise<MinimalPokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const name: string = data.name;
  const image: string =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;
  return { id, name, image };
}

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [list, setList] = React.useState<MinimalPokemon[] | null>(null);

  React.useEffect(() => {
    if (favorites.length > 0) {
      Promise.all(favorites.map((id) => fetchBasicPokemonInfo(id))).then(
        (arr) => setList(arr)
      );
    } else {
      setList([]);
    }
  }, [favorites]);

  return (
    <section className="py-12 px-6 lg:px-8 max-w-5xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-white font-primary">
        Deine Favoriten
      </h2>
      {list === null ? (
        <p className="text-center text-gray-300">Lade Favoriten…</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-300">
          Du hast noch keine Favoriten ausgewählt.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {list.map((poke) => (
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
      )}
    </section>
  );
}
