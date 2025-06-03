// src/app/pokemon/[id]/page.tsx
import React from "react";
import { getPokemonById } from "../../../lib/api";
import { PokemonDetail } from "../../../lib/types";
import StatsChart from "../../../components/StatsChart";
import TypeBadge from "../../../components/TypeBadge";

interface Props {
  params: { id: string };
}

export const dynamic = "force-static"; // SSG + ISR

export default async function PokemonDetailPage({ params }: Props) {
  const { id } = params;
  const pokemon: PokemonDetail = await getPokemonById(id);

  const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const artworkUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "";

  return (
    <section className="p-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        #{pokemon.id} – {displayName}
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Bild & Typen */}
        <div className="flex flex-col items-center">
          <img
            src={artworkUrl}
            alt={displayName}
            className="w-56 h-56 object-contain"
          />
          <div className="mt-4 flex gap-2">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.slot} typeName={t.type.name} />
            ))}
          </div>
        </div>

        {/* Stats-Chart & weitere Infos */}
        <div className="flex-1">
          <StatsChart
            stats={pokemon.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            }))}
          />

          <div className="mt-6 text-gray-700 dark:text-gray-200">
            <p className="mb-2">Größe: {pokemon.height / 10} m</p>
            <p className="mb-2">Gewicht: {pokemon.weight / 10} kg</p>
          </div>

          {/* Fähigkeiten auflisten */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Fähigkeiten</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
              {pokemon.abilities.map((a) => {
                // Name mit erstem Buchstaben groß
                const abilityName =
                  a.ability.name.charAt(0).toUpperCase() +
                  a.ability.name.slice(1);
                return <li key={a.ability.name}>{abilityName}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
