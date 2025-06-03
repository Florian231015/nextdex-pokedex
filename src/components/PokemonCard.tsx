// src/components/PokemonCard.tsx
"use client";

import React from "react";
import { Star } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContent";


interface PokemonCardProps {
  name: string;
  id: string;
  image: string;
  primaryType: string; // z.B. "fire", "water" oder "default"
  allTypes: string[]; // z.B. ["grass", "poison"] oder []
}

const typeBgClasses: Record<string, string> = {
  fire: "bg-red-900 hover:bg-red-800",
  water: "bg-blue-900 hover:bg-blue-800",
  grass: "bg-green-900 hover:bg-green-800",
  electric: "bg-yellow-900 hover:bg-yellow-800",
  ice: "bg-cyan-900 hover:bg-cyan-800",
  ground: "bg-yellow-800 hover:bg-yellow-700",
  fairy: "bg-pink-900 hover:bg-pink-800",
  psychic: "bg-purple-900 hover:bg-purple-800",
  default: "bg-gray-800 hover:bg-gray-700",
};

const typeColors: Record<string, string> = {
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-gray-800",
  ice: "bg-cyan-300 text-gray-800",
  ground: "bg-yellow-600 text-gray-100",
  fairy: "bg-pink-400 text-gray-800",
  psychic: "bg-purple-500 text-white",
  normal: "bg-gray-400 text-gray-800",
  flying: "bg-indigo-300 text-gray-800",
  rock: "bg-yellow-700 text-gray-100",
  bug: "bg-lime-500 text-gray-900",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-700 text-gray-100",
  steel: "bg-gray-500 text-gray-100",
  ghost: "bg-purple-700 text-white",
  poison: "bg-purple-600 text-white",
  fighting: "bg-red-600 text-white",
  default: "bg-gray-300 text-gray-800",
};

export default function PokemonCard({
  name,
  id,
  image,
  primaryType,
  allTypes,
}: PokemonCardProps) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  const bgClass = typeBgClasses[primaryType] || typeBgClasses.default;

  // Favoriten‐Context nutzen
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  return (
    <div className="relative">
      {/* ⭐ Favoriten‐Button oben links */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Verhindert, dass der Link ausgelöst wird
          toggleFavorite(id);
        }}
        className="absolute top-2 left-2 z-20 text-yellow-400 hover:text-yellow-300"
        aria-label={isFavorite ? "Favorit entfernen" : "Zu Favoriten hinzufügen"}
      >
        {isFavorite ? <Star fill="yellow" size={20} /> : <Star size={20} />}
      </button>

      {/* Typ‐Badges oben rechts */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1 z-10">
        {allTypes.map((t) => {
          const lower = t.toLowerCase();
          const badgeClass = typeColors[lower] || typeColors.default;
          return (
            <span
              key={t}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${badgeClass}`}
            >
              {lower}
            </span>
          );
        })}
      </div>

      {/* Haupt‐Card */}
      <div
        className={`${bgClass} rounded-2xl border border-gray-200 dark:border-gray-700 shadow transform hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 cursor-pointer`}
      >
        <div className="p-4 flex justify-center">
          <img
            src={image}
            alt={displayName}
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="px-4 pb-4 text-center">
          <span className="block text-gray-100 font-bold">#{id}</span>
          <span className="block text-gray-200">{displayName}</span>
        </div>
      </div>
    </div>
  );
}
