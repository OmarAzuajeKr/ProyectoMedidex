import { pokemonApi } from "../../api/medicinasApi";
import { Pokemon } from "../../domain/entities/medicinas";
import { PokeAPIPokemon } from "../../infraestructure/interfaces/medicinasInterfaces"
import { PokemonMapper } from "../../infraestructure/mappers/medicinasMappers";

export const getPokemonById = async(id:number):Promise<Pokemon> => {
 try{
    const {data} = await pokemonApi.get<PokeAPIPokemon>(`/pokemon/${id}`)

const pokemon = await PokemonMapper.pokeAPiPokemonToEntity(data);

return pokemon;

 } catch (error) {
     throw new Error('Error en la petición')
 }

}