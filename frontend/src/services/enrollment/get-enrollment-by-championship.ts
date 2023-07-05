import { api } from "../../server/api"

export interface ResponseEnrollmentTeamProps {
    id: string;
    idTime: string;
    nome: string;
    nomeCampeonato: string;
    escudo: string;
    abreviacao: string;
}

export const getEnrollmentByChampionship = async (campeonatoId: string) => {
    const result = await api.post<ResponseEnrollmentTeamProps[]>('/inscricao/search-campeonato', {
        campeonatoId
    });
    
    return result?.data;
}