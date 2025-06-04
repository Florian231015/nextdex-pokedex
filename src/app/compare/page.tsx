"use client";
// src/app/compare/page.tsx
import React from "react";
import { getPokemonById } from "../../lib/api";
import { PokemonDetail } from "../../lib/types";
import StatsChart from "../../components/StatsChart";
import TypeBadge from "../../components/TypeBadge";

import { useSearchParams } from 'next/navigation'
 




export default  function ComparePage() {
  const searchParams = useSearchParams()
  const id1 = searchParams.get("id1")
  const id2 = searchParams.get("id2")

  // Wenn beide IDs vorhanden sind, hole die Details beider Pokémon
  const [first, setFirst] = React.useState<PokemonDetail | null>(null);
  const [second, setSecond] = React.useState<PokemonDetail | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      if (id1) {
        try {
          const data = await getPokemonById(id1);
          if (!cancelled) setFirst(data);
        } catch (e) {
          console.error("Fehler beim Laden von Pokémon ID 1:", e);
          if (!cancelled) setFirst(null);
        }
      } else {
        setFirst(null);
      }
      if (id2) {
        try {
          const data = await getPokemonById(id2);
          if (!cancelled) setSecond(data);
        } catch (e) {
          console.error("Fehler beim Laden von Pokémon ID 2:", e);
          if (!cancelled) setSecond(null);
        }
      } else {
        setSecond(null);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [id1, id2]);

  return (
    <section className="py-12 px-6 lg:px-8 max-w-5xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center text-white font-primary">
        Vergleichsmodus
      </h2>

      {/* 1. Formular zum Eingeben der beiden IDs */}
      <form
        className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        method="get"
      >
        <input
          type="text"
          name="id1"
          defaultValue={id1 || ""}
          placeholder="ID 1 (z.B. 25)"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="id2"
          defaultValue={id2 || ""}
          placeholder="ID 2 (z.B. 150)"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Vergleichen
        </button>
      </form>

      {/* 2. Wenn keine ID-Eingaben vorhanden sind, Hinweis anzeigen */}
      {!id1 && !id2 ? (
        <p className="text-center text-gray-300">
          Gib zwei Pokémon‐IDs ein, um sie zu vergleichen.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 3. Erste Pokémon-Spalte */}
          <div>
            {first ? (
              <PokemonDetailCard pokemon={first} />
            ) : id1 ? (
              <p className="text-center text-red-400">
                Pokémon mit ID {id1} nicht gefunden.
              </p>
            ) : (
              <p className="text-center text-gray-300">
                Keine ID 1 eingegeben.
              </p>
            )}
          </div>

          {/* 4. Zweite Pokémon-Spalte */}
          <div>
            {second ? (
              <PokemonDetailCard pokemon={second} />
            ) : id2 ? (
              <p className="text-center text-red-400">
                Pokémon mit ID {id2} nicht gefunden.
              </p>
            ) : (
              <p className="text-center text-gray-300">
                Keine ID 2 eingegeben.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Komponente, die das Pokémon‐Detail im Vergleichsmodus anzeigt
 * (fast identisch zur Detailseite, aber etwas kompakter)
 */
function PokemonDetailCard({ pokemon }: { pokemon: PokemonDetail }) {
  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const artworkUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "";
  const allTypes = pokemon.types.map((t) => t.type.name.toLowerCase());

  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden p-6">
      {/* Header mit Nummer und Name */}
      <h3 className="text-2xl font-extrabold text-center mb-4 text-white font-primary">
        #{pokemon.id} – {displayName}
      </h3>

      {/* Bild & Typen */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={artworkUrl}
          alt={displayName}
          className="w-40 h-40 object-contain rounded-full border-4 border-white shadow-lg bg-white"
        />
        <div className="mt-2 flex gap-2">
          {allTypes.map((t) => (
            <TypeBadge key={t} typeName={t} />
          ))}
        </div>
      </div>

      {/* StatsChart */}
      <StatsChart
        stats={pokemon.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        }))}
      />

      {/* Basis‐Infos */}
      <div className="mt-4 text-gray-300">
        <p className="mb-1">
          <span className="font-semibold">Größe:</span>{" "}
          {(pokemon.height / 10).toFixed(1)} m
        </p>
        <p className="mb-1">
          <span className="font-semibold">Gewicht:</span>{" "}
          {(pokemon.weight / 10).toFixed(1)} kg
        </p>
      </div>

      {/* Fähigkeiten */}
      <div className="mt-4">
        <h4 className="text-xl font-semibold text-white mb-1">Fähigkeiten</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          {pokemon.abilities.map((a) => {
            const abilityName =
              a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1);
            return <li key={a.ability.name}>{abilityName}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
function async() {
    throw new Error("Function not implemented.");
}

