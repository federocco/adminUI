import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import sessionReducer from "./features/user/userSlice"
import driversReducer from "./features/drivers/driversSlice"
import { User } from "./features/user/typings"
import { Drivers } from "./features/drivers/typings"

const store = configureStore({
  reducer: {
    session: sessionReducer,
    drivers: driversReducer,
  },
})

export type State = {
  session: User
  drivers: Drivers
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
