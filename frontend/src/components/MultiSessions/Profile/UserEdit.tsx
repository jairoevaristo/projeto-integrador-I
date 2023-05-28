import React, { useState } from "react";
import { ControllerTextInput } from "../../ControllerTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchemaValidator } from "../../../validations/user";
import { useForm } from "react-hook-form";
import { UploadAvatar } from "../../UploadAvatar";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../Button";
import { useToast } from "../../../hooks/useToast";
import { updateUser } from "../../../services/user/update-user";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSession } from "../../../hooks/useSession";

export const UserEdit: React.FC = () => {
  const { user, me } = useAuth();
  const { handleToast } = useToast();
  const { setProfileSession } = useSession();
  
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File[] | null>(
    user?.imagem ? [new File([user.imagem], 'avatar')] : null
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(profileSchemaValidator),
  });

  const onSubmit = (data: any) => {
    setLoading(true);

    const userData = { ...user, ...data, avatar };
    delete userData.confirmar_senha;

    updateUser(userData)
      .then((response) => {
        handleToast(response.message);
        me();
      })
      .catch((err) => {
        handleToast(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControllerTextInput
          control={control}
          name="nome"
          label="Nome"
          placeholder="Digite seu nome"
          autoFocus
          defaultValue={user?.nome}
        />
        <ControllerTextInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Digite seu email"
          defaultValue={user?.email}
        />
        <div className="mt-4">
          <UploadAvatar title="Selecione um foto para o seu perfil" onHandleSelectedAvatar={setAvatar} />
        </div>
        <Button text="Salvar alterações" className="mt-4" isLoading={loading} />
      </form>
      <div className="flex items-center justify-end my-6">
        <div className="flex items-center hover:border-b gap-2 transition-all">
          <ArrowLeftIcon className="text-white aspect-square h-6" />
          <label className="cursor-pointer text-white" onClick={() => setProfileSession(0)}>
            Voltar para perfil
          </label>
        </div>
      </div>
    </div>
  );
};