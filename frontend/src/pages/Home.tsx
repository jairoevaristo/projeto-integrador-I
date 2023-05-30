import { MagnifyingGlass, Plus } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { ListChampions } from "../components/ListChampions";
import { Table } from "../components/Table";
import { TextInput } from "../components/TextInput";
import { useDebounce } from "../hooks/useDebounce";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [searchChampionship, setSearchChampionship] = useState('');

  const searchChampionshipDebounce = useDebounce(searchChampionship);

  return (
    <Layout>
      <div className="flex items-center justify-end mt-6">
        <Button
          onClick={() => navigate('/app/criar-campeonato')}
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
                onChange={(e) => setSearchChampionship(e.target.value)}
                placeholder="Buscar campeonato..."
                rightIcon={<MagnifyingGlass className="text-white" size={20} />}
              />
            </div>
          </div>
              
        </div>
        <ListChampions searchNameChampionShip={searchChampionshipDebounce} />
      </div>
    </Layout>
  );
};
