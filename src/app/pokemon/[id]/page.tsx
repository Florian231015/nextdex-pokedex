// src/app/pokemon/[id]/page.tsx
import React from "react";
import { getPokemonById } from "../../../lib/api";
import { PokemonDetail } from "../../../lib/types";
import StatsChart from "../../../components/StatsChart";
import TypeBadge from "../../../components/TypeBadge";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export const dynamic = "force-static"; // SSG + ISR

export default async function PokemonDetailPage({ params }: Props) {
  const { id } = params;
  const pokemon: PokemonDetail = await getPokemonById(id);

  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const artworkUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "";

  const allTypes = pokemon.types.map((t) => t.type.name.toLowerCase());
  const primaryType = allTypes[0] || "default";

  return (
    <section className="relative py-12 px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Dezentes Raster im Hintergrund */}
      <div className="absolute inset-0 bg-pattern"></div>

      {/* 
        Wir erhöhen das Padding-top im Container, damit das Bild nicht mehr so stark herausragt.
        Anstatt "-mt-20" nutzen wir ein entsprechendes Padding: "pt-20" (80px).
        Außerdem machen wir das Bild etwas kleiner (w-48 h-48 statt w-56 h-56).
      */}
      <div className="relative z-10 bg-gradient-to-t from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden pt-20 pb-8 px-8">
        {/* Zurück-Button */}
        <div className="mb-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            &larr; Zurück zum Pokédex
          </Link>
        </div>

        {/* Überschrift */}
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white font-primary">
          #{pokemon.id} – {displayName}
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Pokémon-Bild */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={artworkUrl}
                alt={displayName}
                className="w-48 h-48 object-contain rounded-full border-4 border-white shadow-xl bg-white"
              />
              {/* Wenn du möchtest, kann hier ein farbiger Rand um das Bild je nach Typ erscheinen */}
            </div>
            <div className="mt-4 flex gap-2">
              {allTypes.map((t) => (
                <TypeBadge key={t} typeName={t} />
              ))}
            </div>
          </div>

          {/* StatsChart & Infos */}
          <div className="flex-1">
            <StatsChart
              stats={pokemon.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
              }))}
            />

            <div className="mt-6 text-gray-300">
              <p className="mb-2">
                <span className="font-semibold">Größe:</span>{" "}
                {(pokemon.height / 10).toFixed(1)} m
              </p>
              <p className="mb-2">
                <span className="font-semibold">Gewicht:</span>{" "}
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>

            {/* Fähigkeiten */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Fähigkeiten
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {pokemon.abilities.map((a) => {
                  const abilityName =
                    a.ability.name.charAt(0).toUpperCase() +
                    a.ability.name.slice(1);
                  return <li key={a.ability.name}>{abilityName}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
