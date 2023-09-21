"use client"

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  const pathname = usePathname()
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ThemeProvider
      forcedTheme={!pathname.startsWith("/admin") ? "light" : undefined}
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
