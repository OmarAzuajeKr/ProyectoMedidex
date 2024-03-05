export interface Pokemon {
    id: number;
    name: string;
    types: string[];
avatar: string;
sprites: string[];


games: string[];
stats: Stat[];
abilities: string[];
moves: Move[];
}
export interface Stat {
    name: string;
value: number;


}

export interface PokemonDetail {
    id: number;
    name: string;
    types: string[];
    avatar: string;
    sprites: string[];
    abilities: string[];
    height: number;
    weight: number;
    stats: Stat[];
}
export interface Move {
    name: string;
    level: number;
}