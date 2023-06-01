import { ReactNode, useMemo, useState } from "react";
import { TeamContext, TeamContextProps } from "./TeamContext";

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<TeamContextProps>({});

  const values = useMemo(
    () => ({
      team,
      setTeam
    }),
    [
      team,
      setTeam
    ]
  );
  
  return (
    <TeamContext.Provider
      value={ values }
    >
      {children}
    </TeamContext.Provider>
  );
};