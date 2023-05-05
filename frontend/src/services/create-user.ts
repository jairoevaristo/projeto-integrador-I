import { api } from "../server/api"

interface CreateUser {
    nome: string;
    email: string;
    senha: string;
    imagem: string;
}

export const createUser = async (user: CreateUser) => {
    const result = await api.post('/usuario/cadastrar', {
        ...user
    })

    return result.data
}