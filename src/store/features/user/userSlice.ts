import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { userToken } from "store/constants"
import { loginUserAction, LoginActionResponse } from "./actions"
import { getInitialStateFromLocalStorage, initialState } from "./initialState"

const slicePrefixUserLogin = "[User login]"

const userSlice = createSlice({
  name: "user",
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    logoutUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAction.pending, (state) => {
      console.log(`${slicePrefixUserLogin} pending`)
    })
    builder.addCase(
      loginUserAction.fulfilled,
      (
        state,
        { payload: { jwtString, jwtData } }: PayloadAction<LoginActionResponse>
      ) => {
        console.log(`${slicePrefixUserLogin} fulfilled`)

        if (jwtData) {
          state.id = jwtData.id
          state.username = jwtData.username
          state.email = jwtData.email
          state.companyId = jwtData.companyId
          state.type = jwtData.type
          state.logged = true
        }

        if (jwtString) {
          localStorage.setItem(userToken, jwtString)
        }
      }
    )
    builder.addCase(loginUserAction.rejected, (state, action) => {
      console.log(`${slicePrefixUserLogin} rejected`)
    })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
