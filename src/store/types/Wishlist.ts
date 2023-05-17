import { IProduct, IWishlist } from "@/types"

export interface WishList {
  wishlist: IWishlist[]
  setWishlist: (wishlist: IWishlist) => void
  //   removeWishListItem: (productId: string) => void
}
