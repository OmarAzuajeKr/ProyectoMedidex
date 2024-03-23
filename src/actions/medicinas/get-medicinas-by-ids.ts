import { Medicinas } from "../../domain/entities/medicinas";
import { Medicinas2 } from "../../domain/entities/medicinas2";
import { getMedicinasById } from "./get-medicinas-by-id"
import { getMedicinasByIdTwo } from "./get-medicinas-by-id-term";

export const getMedicinasByIds = async (rxcui: string[]): Promise<Medicinas2[]> => {
   try {
      const medicinaPromises: Promise<Medicinas2>[] = rxcui.map(rxcui => {
         return getMedicinasByIdTwo();
      })

      return await Promise.all(medicinaPromises);
   } catch (error) {
      throw new Error('Error al obtener las medicinas');
   }
}