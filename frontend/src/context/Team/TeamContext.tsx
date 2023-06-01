import { createContext } from "react";

export interface TeamContextProps {
  id?: string;
  nome?: string;
  escudo?: string;
  abreviacao?: string;
  campeonatoId?: string;
}

export type TeamContextType = {
	team: TeamContextProps;
	setTeam: React.Dispatch<React.SetStateAction<TeamContextProps>>;
};

export const TeamContext = createContext<TeamContextType>(null!);