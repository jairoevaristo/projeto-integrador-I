import { ArrowLeft } from "phosphor-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

import { ControllerTextInput } from "../components/ControllerTextInput"
import { Layout } from "../components/Layout"
import { RenderConditional } from "../components/RenderConditional"
import { SpinnerLoading } from "../components/SpinnerLoading"
import { UploadAvatar } from "../components/UploadAvatar"

import { useToast } from "../hooks/useToast"

import { CreateTeam, createTeam } from "../services/team/create-team";

export const AddTeam: React.FC = () => {
    const { control, handleSubmit } = useForm();
    const { handleToast } = useToast();
    const navigate = useNavigate();

    const [selectedTeamShield, setSelectedTeamShield] = useState<File[] | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: any) => {
        setLoading(true);

        const newAbreviacao: string =  data.abreviacao.toUpperCase();
    
        const teamData = { 
            ...data,
            abreviacao: newAbreviacao,
            campeonatoId: null,
            escudo: selectedTeamShield,
        } as CreateTeam;

        createTeam(teamData)
          .then((response) => {
            handleToast(response.message);
            navigate("/app/times");
          })
          .catch((err) => {
            console.log({err})
            handleToast(err.response?.data?.message);
          })
          .finally(() => setLoading(false));
    };

    return (
        <Layout>
            <div className="mt-10 bg-zinc-900 p-8 rounded-md">
                <div className="flex flex-col border-b border-gray-700 pb-2">
                    <div className="flex items-center mb-4 gap-3">
                        <button
                            onClick={() => navigate('/app')}
                            className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white group transition-colors"
                        >
                            <ArrowLeft className="text-white w-5 h-5 group-hover:text-black transition-colors" />
                        </button>
                        <h1 className="text-3xl font-normal text-white">Crie um time</h1>
                    </div>
                    <h1 className="text-md text-white">Preencha as informações abaixo para criar um novo time.</h1>
                </div>

                <form 
                    className="mt-10 space-y-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ControllerTextInput
                        control={control}
                        autoFocus
                        name="nome"
                        label="Nome do time"
                        rules={{ required: "Este campo é obrigatório." }}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <ControllerTextInput
                            control={control}
                            name="abreviacao"
                            label="Abreviação"
                            maxLength={3}
                            rules={{ required: "Este campo é obrigatório." }}
                        />

                        <div className="p-2">
                            <UploadAvatar
                                title="Selecione um escudo para seu time"
                                onHandleSelectedAvatar={setSelectedTeamShield} 
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button text="Criar time" icon={
                            <RenderConditional condition={loading}>
                                <SpinnerLoading />
                            </RenderConditional>
                        } />
                    </div>
                </form>
            </div>
        </Layout>
    )
}
