import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { SpinnerLoading } from "./SpinnerLoading";
import { ResponseTeam } from "../types/ResponseTeam";
import { getAllTeam } from "../services/team/get-all-team";
import { getTeamByName } from "../services/team/get-team-by-name";
import { Table } from "./Table";

let timeoutRequest: any = null;

type TableTeams = {
  searchNameTeam: string;
};

export const TableTeams: React.FC<TableTeams> = ({ searchNameTeam }) => {
  const { handleToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<ResponseTeam[]>([]);
  const [searchTeam, setSearchTeam] = useState<ResponseTeam[]>([]);

  const resultTeams = searchTeam.length > 0 ? searchTeam : teams;

  const labels = [
    { id: "0", nome: "Escudo" },
    { id: "1", nome: "Nome" },
    { id: "2", nome: "Abreviação" },
    { id: "3", nome: "Campeonato" },
    { id: "4", nome: "" },
  ];

  useEffect(() => {
    timeoutRequest = setTimeout(() => {
      getAllTeam()
        .then((response) => setTeams(response))
        .catch((err) => handleToast(err.response?.data?.message))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeoutRequest);
  }, []);

  useEffect(() => {
    if (searchNameTeam !== "") {
        getTeamByName(searchNameTeam)
        .then((result) => {
          setSearchTeam(result);
        })
        .catch((err) => handleToast(err.response?.data?.message));
    } else {
        setSearchTeam([]);
    }
  }, [searchNameTeam]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <SpinnerLoading size="LARGE" />
      </div>
    );
  }

  if (!loading && teams.length <= 0) {
    return (
      <div className="w-full flex items-center mt-28">
        <h1 className="text-gray-300 text-center text-xl">
          Nenhum time cadastrado...
        </h1>
      </div>
    );
  }

  if (searchTeam?.length <= 0 && !!searchNameTeam) {
    return (
      <div className="w-full flex items-center mt-28">
        <h1 className="text-gray-300 text-center text-xl">
          Nenhum time encontrado...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex gap-6 py-6 h-auto overflow-auto rounded-md">
      <Table
        labels={labels}
        data={resultTeams}
      />
    </div>
  );
};
