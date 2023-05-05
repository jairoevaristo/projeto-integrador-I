import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface PrivateRouterProps {
	children: ReactElement;
}

export const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
	const { token } = useAuth();

	if (!token) {
		<Navigate to="/" replace />;	
	}

	return children; 
};
