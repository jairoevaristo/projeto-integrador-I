import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

import { ControllerTextInput } from "../components/ControllerTextInput"
import { Layout } from "../components/Layout"
import { RenderConditional } from "../components/RenderConditional"
import { SpinnerLoading } from "../components/SpinnerLoading"
import { UploadAvatar } from "../components/UploadAvatar"

import { useToast } from "../hooks/useToast"

import { UpdateTeamProps, updateTeam } from "../services/team/update-team";
import { useTeam } from "../hooks/useTeam";

let timeoutRequest: any = null

export const UpdateTeam: React.FC = () => {
    const { control, handleSubmit, watch } = useForm();
    const { handleToast } = useToast();
    const navigate = useNavigate();

    const { team }  = useTeam();
    const [selectedTeamShield, setSelectedTeamShield] = useState<File[] | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: any) => {
        setLoading(true);

        const newAbreviacao: string =  data.abreviacao.toUpperCase();
    
        const teamData = {
            id: team.id,
            ...data,
            abreviacao: newAbreviacao,
            escudo: selectedTeamShield === null ? team.escudo : selectedTeamShield,
        } as UpdateTeamProps;

        updateTeam(teamData)
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
                    <h1 className="text-3xl mb-2 font-normal text-white">Atualizar time</h1>
                    <h1 className="text-md text-white">Atualize as informações do time abaixo.</h1>
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
                        defaultValue={team.nome}
                        rules={{ required: "Este campo é obrigatório." }}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <ControllerTextInput
                            control={control}
                            name="abreviacao"
                            label="Abreviação"
                            maxLength={3}
                            defaultValue={team.abreviacao}
                            rules={{ required: "Este campo é obrigatório." }}
                        />

                        <div className="p-2">
                            <UploadAvatar
                                title="Selecione um escudo para seu time"
                                onHandleSelectedAvatar={setSelectedTeamShield}
                                value={team.escudo}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button text="Atualizar time" icon={
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
