import { api } from "../../server/api"

export const createEnrollment = async (campeonatoId: string, timeIds: string[]) => {
    const result = await api.post('/inscricao/cadastrar', {
        campeonatoId,
        timeIds
    });

    return result?.data;
}