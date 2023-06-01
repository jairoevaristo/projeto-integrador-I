import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>
	signIn: (email: string, senha: string) => Promise<void>;
	signOut: () => void;
	loading: boolean;
	token: string;
	deleteUserAccount: () => void;
	me: () => void;
	loadingStorage: boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);
