// src/components/TypeBadge.tsx
import React from "react";

interface TypeBadgeProps {
  typeName: string;
}

const typeColors: Record<string, string> = {
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-gray-800",
  // ... füge hier alle Typenfarben hinzu, die du für dein Design brauchst
  // (z.B. ice, ground, fairy, psychic, usw.)
};

export default function TypeBadge({ typeName }: TypeBadgeProps) {
  const lower = typeName.toLowerCase();
  const colorClass = typeColors[lower] || "bg-gray-300 text-gray-800";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold uppercase ${colorClass}`}
    >
      {lower}
    </span>
  );
}
