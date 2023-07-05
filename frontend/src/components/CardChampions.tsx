import { Users } from "phosphor-react";
import clsx from 'clsx'
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useToast } from "../hooks/useToast";
import { deleteChampionship } from "../services/championship/delete-championship";

type CardChampionsProps = {
  name: string;
  id: string;
  description: string;
  total_times: number;
  status: "ABERTO" | "FINALIZADO" | "INICIADO";
  onClick?: () => void;
}

export const CardChampions: React.FC<CardChampionsProps> = ({
  description,
  name,
  status,
  total_times,
  id,
  onClick
}) => {
  const formatedDescripton = description.length > 70 ? description.slice(0, 85) + '...' : description;
  const { handleToast } = useToast();
  const navigate = useNavigate();

  const onDeleteChampionshipClick = async () => {
    await deleteChampionship(id);
    handleToast("Time excluído com sucesso!");
    navigate("/app");
  };

  return (
    <Link to={`/app/detalhe-campeonato/${id}`}>
      <div className="bg-zinc-900 rounded-md px-4 pt-3 w-full h-52 hover:translate-y-[-4px] cursor-pointer transition-all hover:bg-zinc-800" onClick={onClick}>
          <div className="flex flex-col gap-3">
              <h1 className="text-white font-semibold text-xl">{name}</h1>
              <div className="flex flex-col">
                <span className="text-white mr-2">DESCRIÇÃO</span>
                <span className="text-white font-bold">
                  {formatedDescripton}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="text-white" size={26} />
                <span className="text-white">
                  TOTAL DE TIMES:
                </span>
                
                <span className="text-white font-semibold">
                  {total_times}
                </span>
              </div>
              <span className={clsx(
                'uppercase text-right font-semibold',
                {
                  'text-emerald-500': status === 'ABERTO', 
                  'text-yellow-500': status === 'INICIADO', 
                  'text-red-500': status === 'FINALIZADO', 
                })}>
                {status}
              </span>
          </div>
      </div>
    </Link>
  );
};