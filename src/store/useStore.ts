import { create } from "zustand"

import { WishList } from "./types/Wishlist"

export const useStore = create<WishList>((set, get) => ({
  wishlist: [],
  setWishlist: (data) => {},
}))
