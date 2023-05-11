import { IWishlist } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IWishlistState {
  wishlist: IWishlist | null
  loading: boolean
}

const initialState: IWishlistState = {
  wishlist: null,
  loading: false,
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlist: (state, { payload }) => {
      ;(state.loading = false), (state.wishlist = payload)
    },
  },
})

export const { getWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
