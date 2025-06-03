"use client"; // src/components/TypeBadge.tsx
import React from "react";

interface TypeBadgeProps {
  typeName: string;
}

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

export default function TypeBadge({ typeName }: TypeBadgeProps) {
  const lower = typeName.toLowerCase();
  const colorClass = typeColors[lower] || typeColors.default;

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold uppercase drop-shadow ${colorClass}`}
    >
      {lower}
    </span>
  );
}
