import { DribbbleLogo, House, Power, User, Users } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { Menu } from "./Menu";
import { ProfileAvatar } from "./ProfileAvatar";
import { RenderConditional } from "./RenderConditional";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="bg-zinc-900 h-28 w-full rounded-lg flex items-center justify-between px-8 mt-2">
      <div className="flex items-center gap-8">
        <RenderConditional condition={pathname !== "/app"}>
          <Link
            to="/app"
            className="text-white text-lg flex gap-2 items-center hover:border-b-blue-300 hover:border-b-2 transition-all"
          >
            <House className="text-white" size={26} />
            Início
          </Link>
        </RenderConditional>

        <Link
          to="/app/times"
          className="text-white text-lg flex gap-2 items-center hover:border-b-blue-300 hover:border-b-2 transition-all"
        >
          <Users className="text-white" size={26} />
          Times
        </Link>

        <Link
          to="/app"
          className="text-white text-lg flex gap-2 items-center hover:border-b-blue-300 hover:border-b-2 transition-all"
        >
          <DribbbleLogo className="text-white" size={26} />
          Partidas
        </Link>
      </div>

      <div className="flex items-center">
        <ProfileAvatar name={user?.nome} avatar_url={user?.imagem} />
        <span className="text-white text-md tracking-wider ml-4 w-38 truncate ...">
          Olá, {user?.nome}
        </span>

        <div>
          <Menu
            items={[
              {
                id: 1,
                name: "Minha conta",
                icon: <User className="text-white" size={20} />,
                href: "/app/profile",
                onClick: () => {}
              },
              {
                id: 2,
                name: "Sair",
                icon: <Power className="text-white" size={20} />,
                onClick: signOut,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
