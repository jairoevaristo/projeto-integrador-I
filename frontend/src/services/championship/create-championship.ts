import { api } from "../../server/api"

export type CreateChampionship = {
    nome: string
    descricao: string
    premiacao: string
    dataInicio: string
    dataFim: string
    logo: string | null
    situacao?: 'ABERTO' | 'FINALIZADO' | 'INICIADO'
    qtdTimes: number
    tipoCampeonato: 'PLAYOFF' | 'PONTOS CORRIDOS'
}

export const createChampionship = async (championship: CreateChampionship) => {
    const result = await api.post('/campeonato/cadastrar', {
        ...championship
    });

    return result?.data;
}