import { createContext, useContext } from "react";

import useDispatcher from "hooks";

const appContext = createContext();

export function AppContextProvider({ children }) {
  const context = useAuth();
  return (
    <appContext.Provider value={context}>{children}</appContext.Provider>
  );
}

export function useApp() {
  return useContext(appContext);
}

function useAuth() {
  const [state, dispatch] = useDispatcher();

  return {
    state,
    updateContext: dispatch,
  };
}
