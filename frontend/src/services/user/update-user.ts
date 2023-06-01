import { api } from "../../server/api"
import { User } from "../../types/User";

export const updateUser = async (user: User) => {
    const result = await api.post('/usuario/atualizar', {
        ...user
    })

    return result.data;
}