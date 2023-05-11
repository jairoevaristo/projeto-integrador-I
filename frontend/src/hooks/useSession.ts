import { useContext } from "react";
import { SessionContext } from "../context/Session/SessionContext";

export const useSession = () => {
	return useContext(SessionContext);
};
