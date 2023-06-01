export interface TeamDTO {
  id: string;
  abreviacao: string;
  escudo?: string;
  userId?: string;
  campeonatoId?: string;
  campeonato: {
    id: string;
    name: string;
  }[];
}