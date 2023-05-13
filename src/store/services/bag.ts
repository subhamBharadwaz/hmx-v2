import { CreateBagInput } from "@/lib/validations/bag"
import { apiSlice } from "./api"

export const bagApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBag: builder.query({
      query: () => "/bag",
      providesTags: ['Bag']
    }),
    createBagItem: builder.mutation({
      query: (data: CreateBagInput)=>({
        url: 'bag',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Bag']   
    }),
    removeBagItem: builder.mutation({
      query: (id: string)=>({
        url: `bag/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bag']   
    })
  }),
})

export const { useGetBagQuery, useCreateBagItemMutation, useRemoveBagItemMutation} = bagApi
