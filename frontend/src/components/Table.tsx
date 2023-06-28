import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSimple } from "phosphor-react";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTeam } from "../services/team/delete-team";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";

type TableProps = {
  labels: Array<{ id: string; nome: ReactNode }>;
  isEdit?: boolean
  data: Array<{
    id: string;
    nome: string;
    escudo: string;
    abreviacao: string;
    campeonatoId: string;
  }>;
};

export interface TableDataProps {
  id: string;
  nome: string;
  escudo: string;
  abreviacao: string;
  campeonatoId: string;
}

export const Table: React.FC<TableProps> = ({ data, labels, isEdit = true }) => {
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const { setTeam } = useTeam();
  const { handleToast } = useToast();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const deleteTeamItem = async (teamId: string) => {
    await deleteTeam(teamId);
    const updatedData = tableData.filter((item) => item.id !== teamId);
    handleToast("Time excluído com sucesso!");
    setTableData(updatedData);
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
                      {item.campeonatoId === null || item.campeonatoId ? (
                        <span className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-medium tracking-[-0.1em]">
                          ---
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-semibold bg-blue-600">
                          {item.campeonatoId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {
                  isEdit && (
                    <div className="flex justify-end gap-6">
                      <Link to="/app/times">
                        <TrashIcon
                          onClick={() => deleteTeamItem(item.id)}
                          className="text-white h-5 w-5"
                        />
                      </Link>
    
                      <Link to="/app/atualizar-time">
                        <PencilSimple
                          onClick={() => setTeam(item)}
                          className="text-white h-5 w-5"
                        />
                      </Link>
                    </div>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
