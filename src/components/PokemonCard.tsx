// src/components/PokemonCard.tsx
import React from "react";

interface PokemonCardProps {
  name: string;
  id: string;
  image: string;
  primaryType: string;   // z.B. "fire", "water" oder "default"
  allTypes: string[];    // z.B. ["grass", "poison"] oder []
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
  default: "bg-gray-400 text-gray-800",
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

  return (
    <div className="relative">
      {/* Typ-Badges oben rechts */}
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

      {/* Haupt-Card */}
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
