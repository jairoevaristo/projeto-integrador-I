import { api } from "../server/api"

interface ProfileUser {
    email: string;
    imagem: string;
    nome: string;}

export const updateUser = async (user: ProfileUser) => {
    const result = await api.post('/usuario/atualizar', {
        ...user
    })

    return result.data;
}