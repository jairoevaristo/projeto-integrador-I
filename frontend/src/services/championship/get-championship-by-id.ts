import { api } from "../../server/api"
import { ResponseChampionship } from "../../types/ReponseChampionship";

export const getChampionshipById = async (id: string | undefined) => {
    const result = await api.post<ResponseChampionship>('/campeonato/search-id', {
        id
    });
    
    return result?.data;
}