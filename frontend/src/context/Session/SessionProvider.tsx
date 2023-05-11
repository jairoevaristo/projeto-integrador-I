import { ReactNode, useEffect, useMemo, useState } from "react";
import { SessionContext } from "./SessionContext";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [profileSession, setProfileSession] = useState(0);

  const values = useMemo(
    () => ({
      profileSession,
      setProfileSession
    }),
    [
      profileSession,
      setProfileSession
    ]
  );
  
  return (
    <SessionContext.Provider
      value={ values }
    >
      {children}
    </SessionContext.Provider>
  );
};