import { api } from "../../server/api"

export type UpdateTeamProps = {
  id: string;
  nome: string;
  abreviacao: string;
  escudo: string;
}

export const updateTeam = async (team: UpdateTeamProps) => {
    const result = await api.post('/time/atualizar', {
        ...team
    })

    return result.data;
}