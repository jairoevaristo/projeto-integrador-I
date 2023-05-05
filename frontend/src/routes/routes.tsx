import { Routes, Route } from "react-router-dom";

import { PrivateRouter } from "../components/PrivateRouter";
import { Home } from "../pages/Home";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<SignIn />} />
			<Route path="/cadastro" element={<SignUp />} />
			
			<Route path="/app"  element={
				<PrivateRouter>
					<Home />
				</PrivateRouter>
			} />
		</Routes>
	);
};

export default Router;
