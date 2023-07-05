import { api } from "../../server/api"

export type UpdateChampionshipProps = {
  id: string
  nome: string
  descricao: string
  premiacao: string
  dataInicio: string
  dataFim: string
  logo?: string
  situacao: 'ABERTO' | 'FINALIZADO' | 'INICIADO'
  qtdTimes: number
  tipoCampeonato: 'PLAYOFF' | 'PONTOS CORRIDOS'
}

export const updateChampionship = async (campeonato: UpdateChampionshipProps) => {
    const result = await api.post('/campeonato/atualizar', {
        ...campeonato
    })

    return result.data;
}