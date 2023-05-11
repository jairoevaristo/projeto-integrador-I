import { api } from "../server/api"

export const deleteUser = async () => {
  const result = await api.get('/usuario/apagar-conta')
  return result.data;
}