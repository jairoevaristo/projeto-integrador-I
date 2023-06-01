import { api } from "../../server/api"
import { ResponseTeam } from "../../types/ResponseTeam";

export const getTeamByName = async (name: string) => {
  const result = await api.post<ResponseTeam[]>('/time/search', {
    name
  });
  
  return result?.data;
}