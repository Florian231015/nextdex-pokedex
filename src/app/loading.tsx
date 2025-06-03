// src/app/loading.tsx
"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <img
        src="/icons/pokeball.svg"
        alt="Lade..."
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
}
