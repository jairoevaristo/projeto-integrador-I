import { ArrowLeft, CalendarBlank, Trophy } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import SelectComponent from 'react-select';
import makeAnimated from 'react-select/animated';
import Accordion from "../components/Accordion";

import { Button } from "../components/Button";
import { ControllerTextInput } from "../components/ControllerTextInput";
import { ControlledInputMask } from "../components/ControllerTextInputMask";

import { Layout } from "../components/Layout"
import { Modal } from "../components/Modal";
import { RenderConditional } from "../components/RenderConditional";
import { Select } from "../components/Select";
import { SpinnerLoading } from "../components/SpinnerLoading";
import { Table } from "../components/Table";
import { UploadAvatar } from "../components/UploadAvatar";
import { useToast } from "../hooks/useToast";
import { getChampionshipById } from "../services/championship/get-championship-by-id";
import { getAllTeam } from "../services/team/get-all-team";
import { ResponseChampionship } from '../types/ReponseChampionship'
import { ResponseTeam } from "../types/ResponseTeam";
import { formatTableLabels } from "../utils/format-select-labels";

const animatedComponents = makeAnimated();

export const ChampionshipDetails = () => {
    const { id } = useParams();
    const { handleToast } = useToast();
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();

    const [championship, setChampionship] = useState<ResponseChampionship | null>(null)
    const [loading, setLoading] = useState(true);
    const [selectedAward, setSelectedAward] = useState('');
    const [selectedChampionshipType, setSelectedChampionshipType] = useState('');
    const [selectedChampionshipLogo, setSelectedChampionshipLogo] = useState<File[] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [teams, setTeams] = useState<ResponseTeam[]>([]);

    useEffect(() => {
       setTimeout(() => {
        getChampionshipById(id)
        .then((response) => setChampionship(response))
        .catch((err) => {
            handleToast(err)
        })
        .finally(() => setLoading(false))
       }, 250)

       setTimeout(() => {
        getAllTeam()
          .then((response) => setTeams(response))
          .catch((err) => handleToast(err.response?.data?.message))
          .finally(() => setLoading(false));
      }, 250);
    }, [])

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center mt-20">
                <SpinnerLoading size="LARGE" />
            </div>
        )
    }

    const onSubmit = (data: any) => {}

    return (
        <Layout>
            <div className="mt-10 bg-zinc-900 p-8 rounded-md">
                <div className="flex pb-2 items-center">
                   <div className="flex items-center mb-2 gap-3">
                        <button
                            onClick={() => navigate('/app')}
                            className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white group transition-colors"
                        >
                            <ArrowLeft className="text-white w-5 h-5 group-hover:text-black transition-colors" />
                        </button>
                        <h1 className="text-3xl font-normal text-white uppercase">{championship?.nome}</h1>
                   </div>
                </div>

               <Accordion
                    text="Editar Campeonato"
               >
                <section>
                    <form 
                    className="mt-10 space-y-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ControllerTextInput
                        control={control}
                        autoFocus
                        defaultValue={championship?.nome}
                        name="nome"
                        label="Nome do campeonato"
                    />

                    <ControllerTextInput
                        control={control}
                        name="descricao"
                        isTextArea
                        defaultValue={championship?.descricao}
                        label="Descrição do campeonato"
                        maxLength={500}
                    />

                    <div className="grid grid-cols-3 items-center gap-4">
                        <ControlledInputMask 
                            control={control}
                            label="Data do início do campeonato"
                            name="dataInicio"
                            mask="99/99/9999"
                            defaultValue={championship?.dataInicio}
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <ControlledInputMask
                            control={control}
                            label="Data do fim do campeonato"
                            name="dataFim"
                            mask="99/99/9999"
                            defaultValue={championship?.dataFim}
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <Select 
                            label="Escolher premiação"
                            placeholder={selectedAward ? selectedAward : championship?.premiacao}
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
                            placeholder={selectedChampionshipType ? selectedChampionshipType : championship?.tipoCampeonato}
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
                            defaultValue={String(championship?.qtdTimes)}
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
                        <Button text="Editar campeonato" icon={
                            <RenderConditional condition={loading}>
                                <SpinnerLoading />
                            </RenderConditional>
                        } />
                    </div>
                </form>
                </section>
               </Accordion>

               <Accordion
                    text="Times inscritos"
               >
                <section className="py-8">
                    <div className="flex items-center justify-end mb-8">
                        <button
                            onClick={() => setShowModal(true)}
                        >
                            <span className="text-blue-600 text-md hover:text-blue-700 transition-colors">Adcionar time ao campeonato</span>
                        </button>
                    </div>

                    <Table
                        data={[
                            {
                                abreviacao: 'RFE',
                                campeonatoId: 'd',
                                escudo: 'https://github.com/jairoevaristo.png',
                                id: 'ds',
                                nome: 'Vasco'
                            },
                            {
                                abreviacao: 'RFE',
                                campeonatoId: 'd',
                                escudo: 'https://github.com/jairoevaristo.png',
                                id: 'dws',
                                nome: 'Vasco'
                            },
                            {
                                abreviacao: 'RFE',
                                campeonatoId: 'd',
                                escudo: 'https://github.com/jairoevaristo.png',
                                id: 'ds3',
                                nome: 'Vasco'
                            }
                        ]}
                        labels={[
                            { id: "0", nome: "Escudo" },
                            { id: "1", nome: "Nome" },
                            { id: "2", nome: "Abreviação" },
                        ]}
                        isEdit={false}
                    />
                </section>
               </Accordion>
            </div>
            <Modal 
                visible={showModal}
                text="Inscrever um time"
                onClose={() => setShowModal(false)}
                onClickCanceled={() => setShowModal(false)}
                icon={<></>}
            >
                <div className="p-4 w-full">
                    <SelectComponent
                        components={animatedComponents}
                        isMulti
                        options={formatTableLabels(teams)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Times cadastros"
                    />
                </div>
            </Modal>
        </Layout>
    )
}