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
import { TeamLabel, formatTableLabels } from "../utils/format-select-labels";
import { useDebounce } from "../hooks/useDebounce";
import { useChampionship } from "../hooks/useChampionship";
import { UpdateChampionshipProps, updateChampionship } from "../services/championship/update-championship";
import { ResponseEnrollmentTeamProps, getEnrollmentByChampionship } from "../services/enrollment/get-enrollment-by-championship";
import { deleteChampionship } from "../services/championship/delete-championship";
import { TrashIcon } from "@heroicons/react/24/outline";
import { createEnrollment } from "../services/enrollment/create-enrollment";

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
    const [listTeams, setListTeams] = useState<ResponseEnrollmentTeamProps[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const handleSelectionTeam = (newValue: TeamLabel[], actionMeta: any) => {
        setSelectedTeams(() => newValue.map(team => team.value));
        console.log(selectedTeams);
    };

    const { championship: selectedChampionship } = useChampionship();

    const onDeleteChampionshipClick = async () => {
        if (selectedChampionship.id) {
            await deleteChampionship(selectedChampionship.id);
            handleToast("Campeonato excluído com sucesso!");
            navigate("/app");
        }
    };

    const onCreateEnrollmentClick = async () => {
        if (selectedChampionship.id) {
            await createEnrollment(selectedChampionship.id, selectedTeams);
            handleToast("Inscrição(ões) cadastrada(s) com sucesso!");
            setShowModal(false);
        }
    };

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

      setTimeout(() => {
        if (selectedChampionship.id) {
          getEnrollmentByChampionship(selectedChampionship.id)
            .then((response) => {
                const newTeams = response.map((enrollment) => ({
                    id: enrollment.id,
                    idTime: enrollment.idTime,
                    nomeCampeonato: enrollment.nomeCampeonato,
                    nome: enrollment.nome,
                    escudo: enrollment.escudo,
                    abreviacao: enrollment.abreviacao,
                  }));
                  setListTeams(newTeams);
            })
            .catch((err) => console.log(err.response?.data?.message))
            .finally(() => setLoading(false));
        }
      }, 250);    
    }, [])

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center mt-20">
                <SpinnerLoading size="LARGE" />
            </div>
        )
    }

    const onSubmit = (data: any) => {
        setLoading(true);

        console.log(selectedAward);
    
        const championshipData = {
            id: selectedChampionship.id,
            ...data,
            premiacao: selectedAward === null || selectedAward === "" ? selectedChampionship.premiacao : selectedAward,
            tipoCampeonato: selectedChampionshipType === null || selectedChampionshipType === "" ? selectedChampionship.tipoCampeonato : selectedChampionshipType,
            logo: selectedChampionshipLogo === null ? selectedChampionship.logo : selectedChampionshipLogo,
            situacao: selectedChampionship.situacao,
        } as UpdateChampionshipProps;

        console.log(championshipData);

        updateChampionship(championshipData)
          .then((response) => {
            handleToast(response.message);
          })
          .catch((err) => {
            console.log({err})
            handleToast(err.response?.data?.message);
          })
          .finally(() => setLoading(false));
    }

    return (
        <Layout>
            <div className="mt-10 bg-zinc-900 p-8 rounded-md">
                <div className="flex pb-2 items-center justify-between w-full">
                   <div className="flex items-center mb-2 gap-3">
                        <button
                            onClick={() => navigate('/app')}
                            className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white group transition-colors"
                        >
                            <ArrowLeft className="text-white w-5 h-5 group-hover:text-black transition-colors" />
                        </button>
                        <h1 className="text-3xl font-normal text-white uppercase">{selectedChampionship?.nome}</h1>
                   </div>
                   <div className="flex flex-row items-center justify-center h-full cursor-pointer hover:opacity-50" onClick={onDeleteChampionshipClick}>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-md focus:ring-2 focus:outline-none focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-red-600 hover:bg-red-700 transition-colors">
                        <TrashIcon className="text-white h-5 w-5"/>
                        <h1>Excluir</h1>
                    </button>
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
                        defaultValue={selectedChampionship?.nome}
                        name="nome"
                        label="Nome do campeonato"
                    />

                    <ControllerTextInput
                        control={control}
                        name="descricao"
                        isTextArea
                        defaultValue={selectedChampionship?.descricao}
                        label="Descrição do campeonato"
                        maxLength={500}
                    />

                    <div className="grid grid-cols-3 items-center gap-4">
                        <ControlledInputMask 
                            control={control}
                            label="Data do início do campeonato"
                            name="dataInicio"
                            mask="99/99/9999"
                            defaultValue={selectedChampionship?.dataInicio}
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <ControlledInputMask
                            control={control}
                            label="Data do fim do campeonato"
                            name="dataFim"
                            mask="99/99/9999"
                            defaultValue={selectedChampionship?.dataFim}
                            rightIcon={
                                <CalendarBlank size={20} className="text-white" />
                            }
                        />

                        <Select 
                            label="Escolher premiação"
                            placeholder={selectedAward ? selectedAward : selectedChampionship?.premiacao}
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
                            placeholder={selectedChampionshipType ? selectedChampionshipType : selectedChampionship?.tipoCampeonato}
                            options={[
                                {
                                    id: 1,
                                    name: 'Pontos corridos',
                                    onClick: () => setSelectedChampionshipType('PONTOS CORRIDOS')
                                },
                                {
                                    id: 2,
                                    name: 'PlayOff',
                                    onClick: () => setSelectedChampionshipType('PLAYOFF'),
                                }
                            ]}
                        />

                        <ControllerTextInput
                            control={control}
                            name="qtdTimes"
                            defaultValue={String(selectedChampionship?.qtdTimes)}
                            label="Quantidade de times"
                            maxLength={500}
                        />

                        <div className="p-2">
                            <UploadAvatar
                                title="Selecione uma logo para o campeonato"
                                onHandleSelectedAvatar={setSelectedChampionshipLogo}
                                value={selectedChampionship.logo}
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
                        data={listTeams}
                        labels={[
                            { id: "0", nome: "Escudo" },
                            { id: "1", nome: "Nome" },
                            { id: "2", nome: "Abreviação" },
                        ]}
                        isEdit={false}
                        isEnrollment={true}
                    />
                </section>
               </Accordion>
            </div>
            <Modal 
                visible={showModal}
                text="Inscrever um time"
                onClose={() => setShowModal(false)}
                onClickCanceled={() => setShowModal(false)}
                onClickConfirmed={onCreateEnrollmentClick}
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
                        onChange={handleSelectionTeam}
                    />
                </div>
            </Modal>
        </Layout>
    )
}