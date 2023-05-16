"use client"

import { ReactNode, useState } from "react"
import {SessionProvider} from 'next-auth/react'
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProviderProps {
  children: ReactNode,
  session: any
}

export function Providers({ children,session }: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
