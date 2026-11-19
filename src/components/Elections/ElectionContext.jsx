import { createContext, useContext } from "react";
import { ELECTIONS } from "../../lib/electionsRegistry";

/** The election the surrounding screens are showing (NUESA unless a provider says otherwise). */
export const ElectionContext = createContext(ELECTIONS.nuesa);

export const useElection = () => useContext(ElectionContext);
