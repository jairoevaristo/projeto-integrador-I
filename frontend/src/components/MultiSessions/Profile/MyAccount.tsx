import React from "react";
import { ProfileAvatar } from "../../ProfileAvatar";
import { Button } from "../../Button";
import { useAuth } from "../../../hooks/useAuth";

export const MyAccount: React.FC = () => {
  const { user, loading, deleteUserAccount } = useAuth();

  return (
    <div className="flex flex-col gap-5 mt-8 w-full">
      <div className="flex justify-center w-full">
        <ProfileAvatar name={user?.nome} avatar_url={user?.imagem} size="LARGE" />
      </div>
      <div className="flex flex-col justify-start w-ful">
        <label className="font-semibold text-gray-400 text-sm">Nome</label>
        <label className="w-full px-1 py-2 overflow-hidden placeholder-gray-400 text-white">{user?.nome}</label>
      </div>
      <div className="flex flex-col justify-start w-ful">
        <label className="font-semibold text-gray-400 text-sm">Email</label>
        <label className="w-full px-1 py-2 overflow-hidden placeholder-gray-400 text-white">{user?.email}</label>
      </div>
      <Button onClick={deleteUserAccount} text="Excluir conta" className="mt-4" isLoading={loading}/>
    </div>
  );
};