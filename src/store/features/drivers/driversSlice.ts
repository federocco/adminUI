import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Driver, Drivers } from "./typings"

const initialState: Drivers = {
  drivers: [],
}

const sessionSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setDrivers: (state, { payload }: PayloadAction<Driver[]>) => {
      state.drivers = payload
    },
  },
})
const { actions, reducer } = sessionSlice
export const { setDrivers } = actions
export default reducer
