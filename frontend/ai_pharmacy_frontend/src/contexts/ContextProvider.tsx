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
  const [user, setUser] = useState<string | null>(localStorage.getItem('USER_USERNAME'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken: updateToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
