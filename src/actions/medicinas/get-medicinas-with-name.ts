//Cambiar Pokemon por Medicina

import { pokemonApi } from "../../api/medicinasApi";
import { PokeAPIPaginatedResponse } from "../../infraestructure/interfaces/medicinasInterfaces";

export const getPokemonNamesWithId = async (limit: number = 150) => {

    const url = `pokemon?limit=1000`; //url de la api
    const { data } = await pokemonApi.get<PokeAPIPaginatedResponse>(url); //peticion get a la api

    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]),
        name: info.name,
    }));
}