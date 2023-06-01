import { api } from "../../server/api"
import { ResponseTeam } from "../../types/ResponseTeam";

export const getAllTeam = async () => {
  const result = await api.get<ResponseTeam[]>('/time/lista-time');
  return result?.data;
}