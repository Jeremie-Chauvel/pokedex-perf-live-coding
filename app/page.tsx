import styles from "@/styles/Home.module.css";
import {
  INITIAL_MAX_POKEMON_ID,
  LAZY_LOADED_POKEMON_IDS,
} from "@/constants/pokemon";
import { getPokemon, PokemonResponse } from "@/services/api/pokemon";
import { Layout } from "@/components/Layout";
import { Pokemon, PokemonLazy } from "@/components/Pokemon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The pokedex",
  description: "A nice pokedex app",
};

export default async function Home() {
  const pokemons = await Promise.all(
    Array.from({ length: INITIAL_MAX_POKEMON_ID }, (_, index) =>
      getPokemon(index + 1)
    )
  );
  return (
    <>
      <Layout>
        <div className={styles.main}>
          <div className={styles.pokemonListing}>
            {pokemons.map((pokemon) => (
              <Pokemon key={pokemon.key} pokemon={pokemon} />
            ))}
            {LAZY_LOADED_POKEMON_IDS.map((pokemonId) => (
              <PokemonLazy key={pokemonId} pokemonId={pokemonId} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
