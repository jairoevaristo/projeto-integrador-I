import { api } from "../../server/api"

export type CreateTeam = {
  nome: string;
  abreviacao: string;
  escudo?: string;
  campeonatoId?: string;
}

export const createTeam = async (team: CreateTeam) => {
  const result = await api.post('/time/cadastrar', {
      ...team
  });

  console.log()

  return result?.data;
}