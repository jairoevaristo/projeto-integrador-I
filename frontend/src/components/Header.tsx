import { DribbbleLogo, Users } from "phosphor-react"
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Menu } from "./Menu"
import { ProfileAvatar } from "./ProfileAvatar";

export const Header: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="bg-zinc-900 h-28 w-full rounded-lg flex items-center justify-between px-8 mt-2">
            <div className="flex items-center gap-8">
                <Link to="/app" className="text-white text-lg flex gap-2 items-center hover:border-b-blue-300 hover:border-b-2 transition-all">
                    <Users className="text-white" size={26} />
                    Times
                </Link>

                <Link to="/app" className="text-white text-lg flex gap-2 items-center hover:border-b-blue-300 hover:border-b-2 transition-all">
                    <DribbbleLogo className="text-white" size={26} />
                    Partidas
                </Link>

            </div>

            <div className="flex items-center gap-4">
               <ProfileAvatar name={user?.nome} avatar_url={user?.imagem}  />
                <span className="text-white text-md tracking-wider w-38 truncate ...">Olá, Jairo Evaristo</span>
                
                <div>
                    <Menu />
                </div>
            </div>
        </div>
    )
}