import type { Pokemon } from "../../domain/entities/medicinas";
import { pokemonApi } from "../../api/medicinasApi";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infraestructure/interfaces/medicinasInterfaces';
import { PokemonMapper } from "../../infraestructure/mappers/medicinasMappers";

export const getPokemons = async(page:number, limit:number = 20):Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${page * 10}&limit=${limit}`
        const response = await pokemonApi.get<PokeAPIPaginatedResponse>(url);

        const PokemonPromises = response.data.results.map((info) => {
            return pokemonApi.get<PokeAPIPokemon>(info.url)
        });

        const pokeApiPokemons = await Promise.all(PokemonPromises);
        const pokemons = pokeApiPokemons.map((item)=>PokemonMapper.pokeAPiPokemonToEntity(item.data));


        return pokemons;

    } catch (error) {
        console.log(error);
        throw new Error('Error nos se pudo obtener los pokemons')
    }
}