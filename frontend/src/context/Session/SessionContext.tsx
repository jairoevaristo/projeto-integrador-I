import { createContext } from "react";

export type SessionContextType = {
	profileSession: number;
	setProfileSession: React.Dispatch<React.SetStateAction<number>>;
};

export const SessionContext = createContext<SessionContextType>(null!);