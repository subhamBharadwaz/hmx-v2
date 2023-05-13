import authReducer from "@/store/features/auth/auth-slice"
import wishlistReducer from "@/store/features/wishlist/wishlist-slice"
import bagReducer from "@/store/features/bag/bag-slice"
import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./services/api"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    bag: bagReducer
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
