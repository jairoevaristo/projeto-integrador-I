import { useContext } from "react";
import { TeamContext } from "../context/Team/TeamContext";

export const useTeam = () => {
	return useContext(TeamContext);
};
