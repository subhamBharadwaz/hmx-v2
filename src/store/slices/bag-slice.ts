import { IProduct, IWishlist } from "@/types"
import { StateCreator } from "zustand"

import { WishList } from "../types/Wishlist"

const createWishlistSlice: StateCreator<WishList> = (set, get) => ({
  wishlist: [],
  addWishlistItem: (product: IProduct) =>
    set((state) => {
      const newWishlist = [...state.wishlist, product]
      return {
        ...state,
        wishlist: newWishlist,
      }
    }),
})
