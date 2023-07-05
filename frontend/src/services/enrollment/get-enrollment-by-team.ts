import { api } from "../../server/api"

export interface ResponseEnrollmentChampionshipProps {
    id: string;
    idCampeonato: string;
    nome: string;
    nomeTime: string;
}

export const getEnrollmentByTeam = async (timeId: string) => {
    const result = await api.post<ResponseEnrollmentChampionshipProps[]>('/inscricao/search-time', {
        timeId
    });
    
    return result?.data;
}