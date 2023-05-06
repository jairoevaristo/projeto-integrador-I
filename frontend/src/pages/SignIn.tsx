import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { signInSchemaValidator } from "../validations/user";

import { Button } from "../components/Button";
import { ControllerTextInput } from "../components/ControllerTextInput";

import { useAuth } from "../hooks/useAuth";

export const SignIn: React.FC = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signInSchemaValidator),
  });

  const { signIn, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const onSumit = (data: any) => {
    signIn(data.email, data.senha);
  };

  return (
    <div className="flex items-center justify-center container mx-auto p-4">
      <div className="bg-zinc-900 p-6 w-[30vw] min-h-[54vh] rounded-md">
        <h1 className="text-white text-3xl text-center">Login</h1>

        <form
          className="flex flex-col gap-6 mt-8"
          onSubmit={handleSubmit(onSumit)}
        >
          <ControllerTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            autoFocus
          />

          <ControllerTextInput
            control={control}
            name="senha"
            label="Senha"
            isPassword
            type={!showPassword ? "password" : "text"}
            placeholder="Digite sua senha"
            onClickRightIcon={() => setShowPassword((prevState) => !prevState)}
            rightIcon={
              !showPassword ? (
                <Eye className="ml-2 text-white" size={24} />
              ) : (
                <EyeClosed className="ml-2 text-white" size={24} />
              )
            }
          />

          <Button text="Fazer login" className="mt-4" isLoading={loading} />
        </form>

        <span className="text-center block mt-4 font-normal text-gray-300">
          Ainda não tem uma conta?&nbsp;
          <Link className="hover:underline text-white" to="/cadastro">
            Crie uma agora.
          </Link>
        </span>
      </div>
    </div>
  );
};
