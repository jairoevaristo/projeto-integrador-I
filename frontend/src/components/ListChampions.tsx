import { useEffect, useState } from "react"
import { useToast } from "../hooks/useToast";
import { getChampionshipByName } from "../services/championship/get-championship-by-name";
import { getAllChampionship } from "../services/championship/getAll-champions"
import { ResponseChampionship } from "../types/ReponseChampionship";
import { CardChampions } from "./CardChampions"
import { SpinnerLoading } from "./SpinnerLoading";
import { useChampionship } from "../hooks/useChampionship";

let timeoutRequest: any = null

type ListChampions = {
    searchNameChampionShip: string;
}

export const ListChampions: React.FC<ListChampions> = ({ searchNameChampionShip }) => {
    const { handleToast } = useToast();

    const { setChampionship } = useChampionship();

    const [loading, setLoading] = useState(true);
    const [champions, setChampions] = useState<ResponseChampionship[]>([]);
    const [searchChampionship, setSearchChampionship] = useState<ResponseChampionship[]>([]);

    const resultChampionship = searchChampionship?.length > 0 ? searchChampionship : champions;

    useEffect(() => {
        timeoutRequest = setTimeout(() => {
            getAllChampionship()
            .then(response => setChampions(response))
            .catch(err => handleToast(err.response?.data?.message))
            .finally(() => setLoading(false))
        }, 250)

        return () => clearTimeout(timeoutRequest)
    }, []);

    useEffect(() => {
        if (searchNameChampionShip !== "") {
            getChampionshipByName(searchNameChampionShip)
            .then((result) => {
                setSearchChampionship(result);
            })
            .catch((err) => handleToast(err.response?.data?.message));
        } else {
            setSearchChampionship([]);
        }
      }, [searchNameChampionShip]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center mt-20">
                <SpinnerLoading size="LARGE" />
            </div>
        )
    }

    if (!loading && champions.length <= 0) {
        return (
            <div className="w-full flex items-center mt-28">
                <h1 className="text-gray-300 text-center text-xl">Nenhum campeonato cadastrado...</h1>
            </div>
        )
    }

    if (searchChampionship?.length <= 0 && !!searchNameChampionShip) {
        return (
            <div className="w-full flex items-center mt-28">
                <h1 className="text-gray-300 text-center text-xl">Nenhum campeonato encontrado...</h1>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-6 py-6 h-auto overflow-auto rounded-md">
            {
                resultChampionship.map((championship) => {
                    return <CardChampions
                        key={championship.id}
                        id={championship.id}
                        description={championship.descricao}
                        name={championship.nome}
                        status={championship.situacao}
                        total_times={championship.qtdTimes}
                        onClick={() => setChampionship(championship)}
                    />
                })
            }
            
        </div>
    )
}