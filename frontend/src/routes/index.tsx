import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRouter } from "../components/PrivateRouter";
import { useAuth } from "../hooks/useAuth";
import { CriarCampeonato } from "../pages/CriarCampeonato";
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
        path="/app/profile"
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />

      <Route
        path="/app/criar-campeonato"
        element={
          <PrivateRouter>
            <CriarCampeonato />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};

export default Router;
