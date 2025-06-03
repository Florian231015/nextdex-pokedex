// src/lib/api.ts
import axios from "axios";
import { PokemonDetail, PokemonOverview } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Holt die Übersicht der ersten n Pokémon (Name + URL)
 */
export async function getAllPokemons(limit = 151): Promise<PokemonOverview[]> {
  const response = await axios.get<{ results: PokemonOverview[] }>(
    `${BASE_URL}/pokemon?limit=${limit}`
  );
  return response.data.results;
}

/**
 * Holt die Detaildaten zu einem einzelnen Pokémon nach ID
 */
export async function getPokemonById(id: string): Promise<PokemonDetail> {
  const response = await axios.get<PokemonDetail>(`${BASE_URL}/pokemon/${id}`);
  return response.data;
}
