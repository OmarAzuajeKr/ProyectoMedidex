import { Medicinas } from "../../domain/entities/medicinas";
import { Medicinas2 } from "../../domain/entities/medicinas2";
import { getMedicinasById } from "./get-medicinas-by-id"

export const getMedicinasByIds = async (rxcui: string[]): Promise<Medicinas[]> => {
   try {
      const medicinaPromises: Promise<Medicinas>[] = rxcui.map(rxcui => {
         return getMedicinasById(rxcui);
      })

      return await Promise.all(medicinaPromises);
   } catch (error) {
      throw new Error('Error al obtener las medicinas');
   }
}