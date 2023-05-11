import { RootState } from "@/store"
import { IUser } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface IAuthState {
  token: string | null
  isAuthenticated: boolean
  user: IUser | null
}

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
} as IAuthState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
