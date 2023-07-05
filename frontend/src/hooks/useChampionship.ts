import { useContext } from "react";
import { ChampionshipContext } from "../context/Championship/ChampionshipContext";

export const useChampionship = () => {
	return useContext(ChampionshipContext);
};
