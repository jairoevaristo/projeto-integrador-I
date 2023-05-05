import { api } from "../server/api"

interface CreateUser {
    email: string;
    senha: string;
}

export const loginUser = async (user: CreateUser) => {
    const result = await api.post('/usuario/login', {
        ...user
    })

    return result.data
}