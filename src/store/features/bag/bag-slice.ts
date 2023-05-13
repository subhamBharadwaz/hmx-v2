import { IBag } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

interface IBagState {
  bag: IBag | null
  loading: boolean
}

const initialState: IBagState = {
  bag: null,
  loading: false,
}

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    getBag: (state, { payload }) => {
      state.loading = false ;
      state.bag = payload
    }
  },
})

export const { getBag } = bagSlice.actions

export default bagSlice.reducer
