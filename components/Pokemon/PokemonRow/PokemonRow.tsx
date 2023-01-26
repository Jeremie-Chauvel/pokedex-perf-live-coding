import { PokemonResponse } from "@/services/api/pokemon";
import { getPokemonId } from "@/services/format/pokemon";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import styles from "./PokemonRow.module.css";

export default function PokemonRow({
  index,
  data,
  style,
}: {
  index: number;
  data: PokemonResponse[][];
  style?: CSSProperties;
}) {
  const pokemons = data[index];
  return (
    <div className={styles.row} style={style}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.key} href={`pokemon/${pokemon.id}`}>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={pokemon.sprite}
                alt={pokemon.name}
                width={150}
                height={150}
              />
            </div>
            <p className={styles.pokemonId}>{getPokemonId(pokemon)}</p>
            <p className={styles.pokemonName}>{pokemon.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
