import { ResponseTeam } from "../types/ResponseTeam";

export const formatTableLabels = (labels: ResponseTeam[]) => {
    return labels.map(team => {
        return {
            value: team.id,
            label: team.nome
        }
    })
}