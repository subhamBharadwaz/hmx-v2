import { RootState } from "@/store"
import { authApi } from "@/store/services/auth"
import { IUser } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface IAuthState {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  user: IUser | null
  error: string | null
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
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
