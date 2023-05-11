"use client"

import { ReactNode, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { store } from "@/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { apiSlice } from "@/store/services/api"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
      </ApiProvider>
    </ThemeProvider>
  )
}
