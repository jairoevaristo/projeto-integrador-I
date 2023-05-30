import { api } from "../../server/api"
import { ResponseChampionship } from "../../types/ReponseChampionship";

export const getChampionshipByName = async (name: string) => {
    const result = await api.post<ResponseChampionship[]>('/campeonato/search', {
        name
    });
    
    return result?.data;
}