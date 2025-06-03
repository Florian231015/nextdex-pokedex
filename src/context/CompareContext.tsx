// src/context/CompareContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type CompareContextType = {
  firstId: string | null;
  secondId: string | null;
  setFirstId: (id: string | null) => void;
  setSecondId: (id: string | null) => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [firstId, setFirstId] = useState<string | null>(null);
  const [secondId, setSecondId] = useState<string | null>(null);

  return (
    <CompareContext.Provider value={{ firstId, secondId, setFirstId, setSecondId }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
