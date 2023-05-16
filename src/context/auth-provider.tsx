"use client"

import { createContext, useState, Dispatch, SetStateAction } from "react"

interface AuthContextProps {
  auth: any;
  setAuth: Dispatch<SetStateAction<any>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: {},
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

let persistedData: string | null

if (typeof window !== "undefined") {
  persistedData = localStorage.getItem("persist")
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({})
  const [persist, setPersist] = useState(
    JSON.parse(persistedData as string) || false
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
