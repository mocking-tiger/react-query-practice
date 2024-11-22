import { createContext, useState } from "react";
import { LoginContextType } from "../types";

const initialLoginContext = {
  currentUsername: "",
  setCurrentUsername: () => {},
};

export const LoginContext =
  createContext<LoginContextType>(initialLoginContext);

export function LoginContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUsername, setCurrentUsername] = useState("");

  return (
    <LoginContext.Provider value={{ currentUsername, setCurrentUsername }}>
      {children}
    </LoginContext.Provider>
  );
}
