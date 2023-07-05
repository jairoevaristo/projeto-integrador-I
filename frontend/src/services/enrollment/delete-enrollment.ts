import { api } from "../../server/api"

export const deleteEnrollment = async (enrollmentId: string) => {
  const result = await api.post('/inscricao/delete', {
    enrollmentId
  });
  
  return result?.data;
}