import { ResponseTeam } from "../types/ResponseTeam";

export interface TeamLabel {
    value: any;
    id: string;
    nome: string;
}

export const formatTableLabels = (labels: ResponseTeam[]) => {
    return labels.map(team => {
        return {
            value: team.id,
            label: team.nome
        }
    })
}