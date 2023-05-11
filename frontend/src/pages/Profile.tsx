import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { RenderConditional } from "../components/RenderConditional";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useSession } from "../hooks/useSession";
import { UserEdit } from "../components/MultiSessions/Profile/UserEdit";
import { MyAccount } from "../components/MultiSessions/Profile/MyAccount";
import { PasswordEdit } from "../components/MultiSessions/Profile/PasswordEdit";

export const Profile: React.FC = () => {
  const { profileSession, setProfileSession } = useSession();
  const { user, loading, token } = useAuth();

  useEffect(() => {
    setProfileSession(0);
  }, []);

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between mt-6 mb-5 border-b-2 pb-2 border-zinc-900">
          <h1 className="cursor-pointer text-2xl font-normal text-left text-white" onClick={() => setProfileSession(0)} >Perfil</h1>
          <div className="flex flex-row justify-center items-center">
            <PencilSquareIcon className="cursor-pointer text-white aspect-square h-6 hover:opacity-50" onClick={() => setProfileSession(1)} />
            <Button className="ml-3 px-3 py-2 text-sm" text="Mudar senha" onClick={() => setProfileSession(2)}  />
          </div>
        </div>
        <div>
          <RenderConditional condition={profileSession === 0}>
            <MyAccount/>
          </RenderConditional>
          <RenderConditional condition={profileSession === 1}>
            <UserEdit/>
          </RenderConditional>
          <RenderConditional condition={profileSession === 2}>
            <PasswordEdit/>
          </RenderConditional>
        </div>
      </div>
    </Layout>
  );
};
