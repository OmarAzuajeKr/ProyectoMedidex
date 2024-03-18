//Cambiar Pokemon por Medicina
import { Medicinas } from "../../domain/entities/medicinas";
import { getMedicinasById } from "./get-medicinas-by-id"

export const getMedicinasByIds = async (rxcui: number []): Promise<Medicinas[]> => {

   try {

      const medicinaPromises: Promise<Medicinas>[] = rxcui.map(rxcui => {
         return getMedicinasById(Number(rxcui)); // Convert rxcui to a number
      })

      return await Promise.all(medicinaPromises);

   } catch (error) {
      throw new Error('Error al obtener las medicinas');
   }

}