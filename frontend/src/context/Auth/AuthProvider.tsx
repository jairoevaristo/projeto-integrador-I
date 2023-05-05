import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { api } from "../../server/api";
import { loginUser } from "../../services/login-user";
import { currentUserData } from "../../services/me";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { handleToast } = useToast();
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [token , setToken] = useState("");

	useEffect(() => {
		loadTokenStorageData();
		me();
	}, [])


	const signIn = async (email: string, senha: string) => {
		setLoading(true);

		try {
			const response = await loginUser({ email, senha })
			handleToast(response.message);
			localStorage.setItem("authToken", JSON.stringify(response.token));
			setUser(response.user);
			navigate('/app');
		} catch (err: any) {
			handleToast(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	const signOut = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		setToken("");
		navigate("/");
	};

	const loadTokenStorageData = () => {
		const storage = localStorage.getItem("authToken");
		if (storage) {
		  const token = JSON.parse(storage) as string;
		  setToken(token);
		  api.defaults.headers.common["authorization"] = `Bearer ${token}`;
		}
	}

	const me = async () => {
		setLoading(true);

		try {
			const response = await currentUserData();
			setUser(response[0]);
		} catch (err: any) {
			console.log({err})
			navigate('/');
		} finally {
			setLoading(false);
		}
	}

	return (
		<AuthContext.Provider value={{ user: user!, signIn, signOut, loading, token }}>
			{children}
		</AuthContext.Provider>
	);
};
