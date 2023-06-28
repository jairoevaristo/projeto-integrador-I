import { ArrowLeft, CalendarBlank, Trophy } from "phosphor-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

import { ControllerTextInput } from "../components/ControllerTextInput"
import { ControlledInputMask } from "../components/ControllerTextInputMask"
import { Layout } from "../components/Layout"
import { RenderConditional } from "../components/RenderConditional"
import { Select } from "../components/Select"
import { SpinnerLoading } from "../components/SpinnerLoading"
import { UploadAvatar } from "../components/UploadAvatar"

import { useToast } from "../hooks/useToast"

import { createChampionship, CreateChampionship } from "../services/championship/create-championship"

export const CriarCampeonato: React.FC = () => {
    const { control, handleSubmit } = useForm();
    const { handleToast } = useToast();
    const navigate = useNavigate();

    const [selectedAward, setSelectedAward] = useState('');
    const [selectedChampionshipType, setSelectedChampionshipType] = useState('');
    const [selectedChampionshipLogo, setSelectedChampionshipLogo] = useState<File[] | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: any) => {
        setLoading(true);
    
        const championshipData = { 
            ...data,
            logo: selectedChampionshipLogo,
            tipoCampeonato: selectedChampionshipType.toUpperCase(),
            premiacao: selectedAward,
            qtdTimes: Number(data?.qtdTimes)
        } as CreateChampionship;

        createChampionship(championshipData)
          .then((response) => {
            handleToast(response.message);
            navigate("/app");
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
                        <h1 className="text-3xl font-normal text-white">Crie um campenato</h1>
                    </div>
                    <h1 className="text-md text-white">Comece criando um campenato para gerenciar as partidas e os times</h1>
                </div>

                <form 
                    className="mt-10 space-y-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ControllerTextInput
                        control={control}
                        autoFocus
                        name="nome"
                        label="Nome do campeonato"
                    />

                    <ControllerTextInput
                        control={control}
                        name="descricao"
                        isTextArea
                        label="Descrição do campeonato"
                        maxLength={500}
                    />

                    <div className="grid grid-cols-3 items-center gap-4">
                        <ControlledInputMask 
                            control={control}
                            label="Data do início do campeonato"
                            name="dataInicio"
                            mask="99/99/9999"
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <ControlledInputMask 
                            control={control}
                            label="Data do fim do campeonato"
                            name="dataFim"
                            mask="99/99/9999"
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <Select 
                            label="Escolher premiação"
                            placeholder={selectedAward ? selectedAward : "Selecione a premiação"}
                            icon={<Trophy size={20} className="text-white" />}
                            options={[
                                {
                                    id: 1,
                                    name: 'Trófeu',
                                    onClick: () => setSelectedAward('Trófeu')
                                },
                                {
                                    id: 2,
                                    name: 'Medalhas',
                                    onClick: () => setSelectedAward('Medalhas'),
                                },
                                {
                                    id: 3,
                                    name: 'Trófeu e medalhas',
                                    onClick: () => setSelectedAward('Trófeu e medalhas')
                                },
                                {
                                    id: 4,
                                    name: 'Dinheiro',
                                    onClick: () => setSelectedAward('Dinheiro')
                                }
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <Select 
                            label="Escolher tipo de campeonato"
                            placeholder={selectedChampionshipType ? selectedChampionshipType : "Selecione o tipo do campeonato"}
                            options={[
                                {
                                    id: 1,
                                    name: 'Pontos corridos',
                                    onClick: () => setSelectedChampionshipType('Pontos Corridos')
                                },
                                {
                                    id: 2,
                                    name: 'PlayOff',
                                    onClick: () => setSelectedChampionshipType('PlayOff'),
                                }
                            ]}
                        />

                        <ControllerTextInput
                            control={control}
                            name="qtdTimes"
                            label="Quantidade de times"
                            maxLength={500}
                        />

                        <div className="p-2">
                            <UploadAvatar
                                title="Selecione uma logo para o campeonato"
                                onHandleSelectedAvatar={setSelectedChampionshipLogo} 
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button text="Criar campeonato" icon={
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