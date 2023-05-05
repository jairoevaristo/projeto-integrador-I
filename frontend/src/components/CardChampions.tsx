import { Users } from "phosphor-react";

export const CardChampions: React.FC = () => {
  const description = 'Campeonato de pontos corridos que envolvem 19 times onde os 4 primeiros se classificam para a libertadores da america enquando os quatros ultimos sao rebaixados para a segunda divisao.';
  const formatedDescripton = description.length > 70 ? description.slice(0, 85) + '...' : description;

  return (
    <div className="bg-zinc-900 rounded-md px-4 pt-3 w-full h-52 hover:translate-y-[-10px] cursor-pointer transition-all hover:bg-zinc-800">
        <div className="flex flex-col gap-3">
            <h1 className="text-white font-semibold text-xl">Campeonato Brasileiro</h1>
            
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
              </span><span className="text-white font-semibold">
                19
              </span>
            </div>
            <span className="uppercase text-right font-semibold text-emerald-500">Aberto</span>
        </div>
    </div>
  );
};