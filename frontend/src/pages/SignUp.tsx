import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeClosed } from "phosphor-react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../components/Button";
import { ControllerTextInput } from "../components/ControllerTextInput";
import { UploadAvatar } from "../components/UploadAvatar";
import { signUpSchemaValidator } from "../validations/user";
import { createUser } from "../services/create-user";
import { useToast } from "../hooks/useToast";

export const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchemaValidator),
  });

  const { handleToast } = useToast();

  const [avatar, setAvatar] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    senha: false,
    confirmar_senha: false,
  });

  const onSubmit = (data: any) => {
    setLoading(true);

    const userData = { ...data, avatar };
    delete userData.confirmar_senha;

    createUser(userData)
      .then((response) => {
        handleToast(response.message);
      })
      .catch((err) => {
        handleToast(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center container mx-auto p-4">
      <div className="bg-zinc-900 p-6 w-[30vw] min-h-[84vh] rounded-md">
        <h1 className="text-white text-3xl text-center">Criar minha conta</h1>

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
          />

          <ControllerTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
          />

          <ControllerTextInput
            control={control}
            name="senha"
            label="Senha"
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
            label="Confirmar Senha"
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

          <div className="mt-4">
            <UploadAvatar onHandleSelectedAvatar={setAvatar} />
          </div>

          <Button text="Fazer cadastro" className="mt-4" isLoading={loading} />
        </form>

        <div className="flex items-center justify-end mt-6">
          <div className="flex items-center hover:border-b gap-2 transition-all">
            <ArrowLeft className="text-white" size={20} />
            <Link className="text-white" to="/">
              Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
