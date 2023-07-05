import { createContext } from "react";

export interface ChampionshipContextProps {
  id?: string;
  nome?: string;
  descricao?: string;
  premiacao?: string;
  dataInicio?: string;
  dataFim?: string;
  logo?: string;
  userId?: string;
  situacao?: 'ABERTO' | 'FINALIZADO' | 'INICIADO';
  qtdTimes?: number;
  tipoCampeonato?: 'PLAYOFF' | 'PONTOS CORRIDOS';
};

export type ChampionshipContextType = {
	championship: ChampionshipContextProps;
	setChampionship: React.Dispatch<React.SetStateAction<ChampionshipContextProps>>;
};

export const ChampionshipContext = createContext<ChampionshipContextType>(null!);