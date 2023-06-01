export interface ResponseTeam {
  id: string;
  nome: string;
  escudo: string;
  abreviacao: string;
  campeonatoId: string;
  campeonato: {
    id: string;
    name: string;
  }[];
}