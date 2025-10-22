import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface StateContextType {
  user: string | null;
  token: string | null;
  setUser: (user: string | null) => void;
  setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, _setToken] = useState<string | null>(
    null
  );

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
