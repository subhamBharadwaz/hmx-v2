import { apiSlice } from "./api"

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ['Wishlist']
    }),
    createWishlistItem: builder.mutation({
      query: (id: {productId: string})=>({
        url: 'wishlist',
        method: 'PUT',
        body: id
      }),
      invalidatesTags: ['Wishlist']   
    }),
    removeWishlistItem: builder.mutation({
      query: (id: string)=>({
        url: `wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist']   
    })
  }),
})

export const { useGetWishlistQuery, useCreateWishlistItemMutation, useRemoveWishlistItemMutation} = wishlistApi
