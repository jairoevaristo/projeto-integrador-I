import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { User } from "../../types/User";
import { api } from "../../server/api";

import { AuthContext } from "./AuthContext";

import { useToast } from "../../hooks/useToast";
import { loginUser } from "../../services/user/login-user";

import { currentUserData } from "../../services/user/me";
import { deleteUser } from "../../services/user/delete-user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  const { handleToast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [loadingStorage, setLoadingStorage] = useState(false);

  useEffect(() => {
    loadTokenStorageData();
    me();
  }, []);

  const signIn = async (email: string, senha: string) => {
    setLoading(true);

    try {
      const response = await loginUser({ email, senha });

      if (!response.token) {
        navigate("/");
        handleToast();
        return;
      }

      handleToast(response.message);
      localStorage.setItem("authToken", JSON.stringify(response.token));
      setUser(response.user);
      navigate("/app");
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
    setLoadingStorage(true);

    const storage = localStorage.getItem("authToken");
    if (storage) {
      const token = JSON.parse(storage) as string;
      setToken(token);
      api.defaults.headers.common["authorization"] = `Bearer ${token}`;
      setLoadingStorage(false);
    } else {
      navigate("/");
    }
  };

  const me = async () => {
    setLoading(true);

    try {
      const response = await currentUserData();
      setUser(response[0]);

      if (pathname === '/') {
        navigate('/app')
      }

    } catch (err: any) {
      console.log({ err });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount  = async () => {
    setLoading(true);

    try {
      loadTokenStorageData();
      const response = await deleteUser();
      handleToast(response.message);
      signOut();
    } catch (err: any) {
      handleToast(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: user!, signIn, signOut, loading, token, deleteUserAccount, me, loadingStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
