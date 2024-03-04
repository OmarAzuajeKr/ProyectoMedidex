import { pokemonApi } from "../../api/medicinasApi"
import { Medicinas } from "../../domain/entities/medicinas";
//import { medicinas } from "../../domain/entities/medicinas";
//import { PokeAPIPokemon } from "../infraestructure/interfaces/pokeApi.interfaces"
//import { PokemonMapper } from "../infraestructure/mappers/pokemon.mapper";

export const getPokemonById = async(id:number):Promise<Medicinas> => {
 try{

    //Sustituir el /pokemon por /medicinas pues es donde se llama el api
    const {data} = await pokemonApi.get<PokeAPIPokemon>(`/pokemon/${id}`)

const pokemon = await PokemonMapper.pokeAPiPokemonToEntity(data);

return pokemon;

 } catch (error) {
     throw new Error('Error en la petición')
 }

}