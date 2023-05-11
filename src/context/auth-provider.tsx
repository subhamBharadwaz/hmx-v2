"use client"

import { createContext, useState } from "react"

const AuthContext = createContext({})

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
