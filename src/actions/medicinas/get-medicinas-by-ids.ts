import { Pokemon } from "../../domain/entities/medicinas";
import { getPokemonById } from "./get-medicinas-by-id";


export const getPokemonByIds = async (ids: number[]): Promise<Pokemon[]> => {

try {

const pokemonPromises: Promise<Pokemon>[] = ids.map( id => {
return getPokemonById(id);})

return await Promise.all(pokemonPromises);

} catch (error) {
   throw new Error('Error al obtener las medicinas');}

}