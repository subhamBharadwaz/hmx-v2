import authReducer from "@/store/features/auth/auth-slice"
import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./services/api"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
