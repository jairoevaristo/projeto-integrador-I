import { MagnifyingGlass, Plus } from "phosphor-react"

import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { ListChampions } from "../components/ListChampions"
import { TextInput } from "../components/TextInput"

export const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <Header />

            <div className="flex items-center justify-end mt-6">
                <Button
                    text="Novo campeonato"
                    icon={<Plus className="text-white" size={20} />}
                />
            </div>

            <div className="mt-10">
                <div className="flex items-center justify-between mb-5 border-b-2 pb-2 border-zinc-900">
                    <h1 className="text-2xl font-normal text-left text-white">
                        Lista de Campeonatos
                    </h1>

                    <div className="flex-1 flex items-center justify-end">
                        <div className="w-96">
                            <TextInput
                                placeholder="Buscar campeonato..."
                                rightIcon={<MagnifyingGlass className="text-white" size={20} />}
                            />
                        </div>
                    </div>
                </div>
                <ListChampions />
            </div>

        </div>
    )
}