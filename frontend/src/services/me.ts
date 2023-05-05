import { api } from "../server/api"

export const currentUserData = async () => {
    const response = await api.get('/usuario/me')
    return response.data;
}