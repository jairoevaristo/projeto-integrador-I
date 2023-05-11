import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
	user: User;
	signIn: (email: string, senha: string) => Promise<void>;
	signOut: () => void;
	loading: boolean;
	token: string;
	deleteUserAccount: () => void;
	me: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);
