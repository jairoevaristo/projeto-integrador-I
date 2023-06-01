import { api } from "../../server/api"

export const deleteTeam = async (id: string) => {
  const result = await api.post('/time/delete', {
    id
  });

  console.log(result.data);
  
  return result?.data;
}