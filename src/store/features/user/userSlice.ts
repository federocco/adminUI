import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { loggedIn } from "store/constants"

import { User } from "./typings"
import { loginUserAction, LoginActionResponse } from "./actions"

const initialState: User = {
  id: -1,
  username: "",
  companyId: -1,
  email: "",
  type: "",
}

const slicePrefixUserLogin = "[User login]"

const userSlice = createSlice({
  name: "user",
  initialState,
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
          state.companyId = jwtData.idazien
          state.type = jwtData.type
        }

        if (jwtString) {
          localStorage.setItem(loggedIn, jwtString)
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
