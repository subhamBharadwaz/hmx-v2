import { apiSlice } from "./api"

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/userdetails",
    }),
  }),
})


export const { useGetUserQuery } = userApi
