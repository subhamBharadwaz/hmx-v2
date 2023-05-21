import { create } from "zustand"
import { persist } from 'zustand/middleware'

import { IAddress } from "@/types"

interface State {
  isAlreadyAddedToWishlist: boolean
  setIsAlreadyAddedToWishlist: (value: boolean) => void
  address: IAddress | null
  setAddress: (data: IAddress | null) => void
  removeAddress: ()=> void
}

export const useStore = create<State>()(persist ((set) => ({
  isAlreadyAddedToWishlist: false,
  address: null,
  setIsAlreadyAddedToWishlist: (value) =>
    set(() => ({ isAlreadyAddedToWishlist: value })),
  setAddress: (data) => set(() => ({ address: data })),
removeAddress: ()=> localStorage.removeItem('hmx:address'),
}), {name: 'hmx:address', partialize: (state)=> ({address: state.address}) }))
