import { TrashIcon } from "@heroicons/react/24/outline"
import { PencilSimple } from "phosphor-react"
import { ReactNode } from "react";
import { Link } from "react-router-dom"

type TableProps = {
    labels: Array<{ id: string, name: ReactNode }>;
    data: Array<{ 
        id: string;
        name: string;
        escudo: string;
        abreviacao: string;
        campeonato: Array<{ id: string, name: string }>;
    }>;
}

export const Table: React.FC<TableProps> = ({ data, labels }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-800 shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm text-gray-800">
            <thead className="bg-zinc-900">
            <tr>
                {labels.map(item => (
                    <th scope="col" className="px-6 py-4 font-medium text-gray-300" key={item.id}>{item.name}</th>
                ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-600">
                {data.map(item => (
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
                        <span
                            className="inline-flex items-center px-2 py-1"
                        >
                            <span className="text-white font-normal text-md">
                                {item.name}
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
                            {item.campeonato.length > 0 ? (
                                <div className="flex items-center gap-2">
                                    {item.campeonato.map(campeonato => (
                                        <div className="flex items-center gap-4" key={campeonato.id}>
                                            <span
                                                className="inline-flex items-center rounded-full text-blue-50 px-2 py-1 text-xs font-semibold bg-blue-600"
                                            >
                                                {campeonato.name}
                                            </span>
                                    </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="text-white font-bold text-center ml-8">
                                        -
                                    </span>
                                </div>
                            ) }
                        </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex justify-end gap-6">
                                <Link to="/app">
                                    <TrashIcon className="text-white h-5 w-5" />
                                </Link>

                                <Link to="/app">
                                    <PencilSimple className="text-white h-5 w-5" />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}