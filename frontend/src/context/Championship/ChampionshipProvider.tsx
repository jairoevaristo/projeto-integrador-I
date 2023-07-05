import { ReactNode, useMemo } from "react";
import { ChampionshipContext, ChampionshipContextProps } from "./ChampionshipContext";
import { useStorage } from "../../hooks/useStorage";

export const ChampionshipProvider = ({ children }: { children: ReactNode }) => {
  const [championship, setChampionship] = useStorage("championship", {});

  const values = useMemo(
    () => ({
      championship,
      setChampionship
    }),
    [championship, setChampionship]
  );

  return (
    <ChampionshipContext.Provider value={values}>
      {children}
    </ChampionshipContext.Provider>
  );
};
