import { api } from "../../server/api"

export const deleteChampionship = async (id: string) => {
  const result = await api.post('/campeonato/delete', {
    id
  });
  
  return result?.data;
}