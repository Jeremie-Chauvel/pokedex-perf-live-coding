import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Test.module.css";
import { MAX_POKEMON_ID } from "@/constants/pokemon";
import {
  getPokemon,
  multiplicatePokemonListSize,
  PokemonResponse,
} from "@/services/api/pokemon";
import { Layout } from "@/components/Layout";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { PokemonRow } from "@/components/Pokemon";
import { useMediaQuery } from "@/styles/useMediaQuery";
const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const pokemons = [];
  try {
    for (let pokemonId = 1; pokemonId <= MAX_POKEMON_ID; pokemonId++) {
      pokemons.push(getPokemon(pokemonId));
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      pokemons: multiplicatePokemonListSize(await Promise.all(pokemons), 100),
    },
  };
}

export default function Home({ pokemons }: { pokemons: PokemonResponse[] }) {
  const isMobile = useMediaQuery("(max-width: 768px)", true);
  const pokemonsList = isMobile
    ? pokemons.map((pokemon) => [pokemon])
    : pokemons.reduce<PokemonResponse[][]>(
        (acc, _, index, pokemons: PokemonResponse[]) =>
          index % 3 === 0
            ? [...acc, [...pokemons.slice(index, index + 3)]]
            : acc,

        [] satisfies PokemonResponse[][]
      );
  return (
    <>
      <Head>
        <title>The pokedex</title>
        <meta name="description" content="A nice pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.main}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={styles.pokemonListing}
                itemData={pokemonsList}
                height={height}
                itemCount={pokemonsList.length}
                itemSize={300}
                width={width}
              >
                {PokemonRow}
              </List>
            )}
          </AutoSizer>
        </div>
      </Layout>
    </>
  );
}
