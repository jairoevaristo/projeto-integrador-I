import { api } from "../../server/api"
import { ResponseChampionship } from "../../types/ReponseChampionship";

export const getAllChampionship = async () => {
    const result = await api.get<ResponseChampionship[]>('/campeonato/lista-campeonato');
    return result?.data;
}