// src/components/PokemonCard.tsx
import React from "react";

interface PokemonCardProps {
  name: string;
  id: string;
  image: string;
}

export default function PokemonCard({ name, id, image }: PokemonCardProps) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="p-4 flex justify-center">
        <img
          src={image}
          alt={displayName}
          className="w-24 h-24 object-contain"
        />
      </div>
      <div className="px-4 pb-4 text-center">
        <span className="block text-gray-800 dark:text-gray-100 font-semibold">
          #{id}
        </span>
        <span className="block text-gray-600 dark:text-gray-300">
          {displayName}
        </span>
      </div>
    </div>
  );
}
