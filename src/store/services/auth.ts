import { CreateUserLoginInput } from "@/lib/validations/auth"
import { apiSlice } from "@/store/services/api"

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: CreateUserLoginInput) => ({
        url: "login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
