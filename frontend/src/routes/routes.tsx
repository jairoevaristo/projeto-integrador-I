import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRouter } from "../components/PrivateRouter";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />

      <Route
        path="/app"
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};

export default Router;
