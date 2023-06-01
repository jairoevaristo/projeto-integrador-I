import { MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { TextInput } from "../components/TextInput";
import { useDebounce } from "../hooks/useDebounce";
import { TableTeams } from "../components/TableTeams";

export const Teams: React.FC = () => {
  const navigate = useNavigate();

  const [searchTeam, setSearchTeam] = useState('');

  const searchTeamDebounce = useDebounce(searchTeam);

  return (
    <Layout>
      <div className="flex items-center justify-end mt-6">
        <Button
          onClick={() => navigate('/app/criar-time')}
          text="Novo time"
          icon={<Plus className="text-white" size={20} />}
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-5 border-b-2 pb-2 border-zinc-900">
          <h1 className="text-2xl font-normal text-left text-white">
            Lista de Times
          </h1>

          <div className="flex-1 flex items-center justify-end">
            <div className="w-96">
              <TextInput
                onChange={(e) => setSearchTeam(e.target.value)}
                placeholder="Buscar time..."
                rightIcon={<MagnifyingGlass className="text-white" size={20} />}
              />
            </div>
          </div>
              
        </div>
        <TableTeams searchNameTeam={searchTeamDebounce}/>
      </div>
    </Layout>
  );
};
