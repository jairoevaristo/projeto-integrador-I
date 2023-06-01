export interface CreateTeamDTO {
  nome: string;
  abreviacao: string;
  escudo: string | null;
  userId?: string;
  campeonatoId?: string;
  campeonato: {
    id: string;
    name: string;
  }[];
}