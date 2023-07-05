import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSimple } from "phosphor-react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTeam } from "../services/team/delete-team";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";
import { deleteEnrollment } from "../services/enrollment/delete-enrollment";
import { getEnrollmentByTeam } from "../services/enrollment/get-enrollment-by-team";
import { RenderConditional } from "./RenderConditional";
import { randomColor } from "../utils/random-color";

type TableProps = {
  labels: Array<{ id: string; nome: ReactNode }>;
  isEdit?: boolean
  isPop?:boolean
  isEnrollment?: boolean
  data: Array<{
    id: string;
    nome: string;
    escudo: string;
    abreviacao: string;
    nomeCampeonato?: string;
    campeonatos?: string;
  }>;
};

export interface TableDataProps {
  id: string;
  nome: string;
  escudo: string;
  abreviacao: string;
  nomeCampeonato?: string;
  campeonatos?: string;
}

export const Table: React.FC<TableProps> = ({ data, labels, isEdit = true, isPop = true, isEnrollment = false }) => {
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const { setTeam } = useTeam();
  const { handleToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const deleteTeamItem = async (id: string) => {
    console.log(id);
    if(!isEnrollment) {
      await deleteTeam(id);
      const updatedData = tableData.filter((item) => item.id !== id);
      handleToast("Time excluído com sucesso!");
      setTableData(updatedData);
      navigate("/app/times");
    } else {
      await deleteEnrollment(id);
      const updatedData = tableData.filter((item) => item.id !== id);
      handleToast("Inscrição excluída com sucesso!");
      setTableData(updatedData);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-800 shadow-md">
      <table className="w-full border-collapse text-left text-sm text-gray-800">
        <thead className="bg-zinc-900">
          <tr>
            {labels.map((item) => (
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-300"
                key={item.id}
              >
                {item.nome}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-600">
          {tableData.map((item) => (
            <tr key={item.id}>
              <th className="flex gap-3 items-center px-6 py-4 font-normal text-gray-900">
                <div className="h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src={item.escudo}
                    alt=""
                  />
                </div>
              </th>
              <td className="px-6 py-4">
                <span className="inline-flex items-center py-1">
                  <span className="text-white font-normal text-md">
                    {item.nome}
                  </span>
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-white font-normal text-md">
                  {item.abreviacao}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-4">
                      <RenderConditional condition={!!item.nomeCampeonato}>
                        <span style={{ background: `#${randomColor()}` }}  className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-semibold">
                          {item.nomeCampeonato}
                        </span>
                      </RenderConditional>
                      <RenderConditional condition={!item.nomeCampeonato && !item.campeonatos}>
                        <span className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-medium tracking-[-0.1em]">
                          ---
                        </span>
                      </RenderConditional>
                      <RenderConditional condition={!!item.campeonatos}>
                        <Fragment>
                          {item.campeonatos?.split(";").map(nome => (
                            <span style={{ background: `#${randomColor()}` }} className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-semibold">
                              {nome}
                            </span>
                          ))}
                        </Fragment>
                      </RenderConditional>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                    <div className="flex justify-end gap-6">
                      {isPop && (<div className="cursor-pointer">
                        <TrashIcon
                          onClick={() => deleteTeamItem(item.id)}
                          className="text-white h-5 w-5"
                        />
                      </div>)}
    
                      {isEdit && (<Link to="/app/atualizar-time">
                        <PencilSimple
                          onClick={() => setTeam(item)}
                          className="text-white h-5 w-5"
                        />
                      </Link>)}
                    </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
