// src/lib/types.ts

// Übersichtseintrag (Name + URL)
export interface PokemonOverview {
  name: string;
  url: string;
}

// Basis-Struktur der Detail-Abfrage
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  // Falls du noch Fähigkeiten anzeigen möchtest:
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
}
