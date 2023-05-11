import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ControllerTextInput } from "../../ControllerTextInput";
import { useState } from "react";
import { passwordSchemaValidator } from "../../../validations/user";
import { useAuth } from "../../../hooks/useAuth";
import { updateUser } from "../../../services/update-user";
import { useToast } from "../../../hooks/useToast";
import { Button } from "../../Button";
import { useSession } from "../../../hooks/useSession";

export const PasswordEdit: React.FC = () => {
  const { user, me } = useAuth();
  const { handleToast } = useToast();
  const [showPassword, setShowPassword] = useState({
    senha: false,
    confirmar_senha: false,
  });
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(passwordSchemaValidator),
  });
  const { setProfileSession } = useSession();

  const onSubmit = (data: any) => {
    setLoading(true);

    const userData = { ...user, ...data };
    delete userData.confirmar_senha;

    console.log(user);

    updateUser(userData)
      .then(() => {
        handleToast("Senha atualizada com sucesso!");
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
          name="senha"
          label="Nova Senha"
          isPassword
          type={!showPassword.senha ? "password" : "text"}
          placeholder="Digite sua senha"
          onClickRightIcon={() => {
            setShowPassword((prevState) => ({
              ...prevState,
              senha: !prevState.senha,
            }));
          }}
          rightIcon={
            !showPassword.senha ? (
              <Eye className="ml-2 text-white" size={24} />
            ) : (
              <EyeClosed className="ml-2 text-white" size={24} />
            )
          }
        />

        <ControllerTextInput
          control={control}
          name="confirmar_senha"
          label="Confirmar Nova Senha"
          isPassword
          type={!showPassword.confirmar_senha ? "password" : "text"}
          placeholder="Digite sua senha"
          onClickRightIcon={() => {
            setShowPassword((prevState) => ({
              ...prevState,
              confirmar_senha: !prevState.confirmar_senha,
            }));
          }}
          rightIcon={
            !showPassword.confirmar_senha ? (
              <Eye className="ml-2 text-white" size={24} />
            ) : (
              <EyeClosed className="ml-2 text-white" size={24} />
            )
          }
        />
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