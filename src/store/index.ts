import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import sessionReducer from "./features/user/userSlice"
import driversReducer from "./features/drivers/driversSlice"
import { UserState } from "./features/user/typings"
import { Drivers } from "./features/drivers/typings"

export type State = {
  session: UserState
  drivers: Drivers
}

export type AsyncThunkApiConfig<RejectError = unknown> = {
  dispatch: AppDispatch
  state: State
  rejectValue: RejectError
}

const store = configureStore({
  reducer: {
    session: sessionReducer,
    drivers: driversReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
