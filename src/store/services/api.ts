import { RootState } from "@/store"
import { logout, setCredentials } from "@/store/features/auth/auth-slice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    console.log("sending refresh token")
    // send refresh token to get new access token

    const refreshResult = await baseQuery("/refresh", api, extraOptions)
    console.log(refreshResult)

    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Wishlist', 'Bag'],
  endpoints: (builder) => ({
    noop: builder.query({
      query: () => {},
    }),
  }),
})
