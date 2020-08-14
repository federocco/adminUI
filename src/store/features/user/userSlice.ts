import {
  createSlice,
  PayloadAction,
  // createAsyncThunk,
  // ThunkDispatch,
} from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

import { loggedIn } from "store/constants"
import api from "utils/api"
// import { State } from "store"

import { User, LoginRequest, UserJwtToken } from "./typings"

const initialState: User = {
  id: -1,
  username: "",
  companyId: -1,
  email: "",
  type: "",
}

// interface MyKnownError {
//   errorMessage: string
// }

// export type LoginActionResponse = {
//   status: "ok" | "error"
//   data?: JwtTokenSession
// }

// Actions
// export const requestSessionLogin = createAsyncThunk<
//   // Return type of the payload creator
//   LoginActionResponse,
//   // First argument to the payload creator
//   LoginRequest,
//   {
//     dispatch: AppDispatch
//     state: State
//     rejectValue: MyKnownError
//   }
// >("users/login", async ({ username, password }, thunkApi) => {
//   const response = await api.post("/users/login", {
//     nome: username,
//     pass: password,
//   })

//   const {
//     data: { result, error },
//   } = response

//   if (response.status === 400) {
//     return thunkApi.rejectWithValue(response.data as MyKnownError)
//   }

//   if (result && !error) {
//     const userData = jwtDecode<JwtTokenSession>(result)

//     return { status: "ok", data: userData } as LoginActionResponse
//   }

//   return { status: "error" }
// })

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }: PayloadAction<UserJwtToken>) => {
      state.id = payload.id
      state.username = payload.username
      state.email = payload.email
      state.companyId = payload.idazien
      state.type = payload.type
    },
    logoutUser: (state) => initialState,
  },
  // extraReducers: {
  //   [requestSessionLogin.fulfilled]: (state, action) => {
  //     state.id = action.payload.idutente
  //     state.companyId = action.payload.idazien
  //     state.username = action.payload.name
  //     state.email = action.payload.email
  //   },
  // },
})

export const loginUserAction = ({ username, password }: LoginRequest) => async (
  dispatch: (arg0: { payload: UserJwtToken; type: string }) => void
) => {
  try {
    const {
      data: { result: jwtToken, error },
    } = await api.post("/users/login", {
      username,
      password,
    })

    if (jwtToken && !error) {
      const userData = jwtDecode<UserJwtToken>(jwtToken)

      localStorage.setItem(loggedIn, jwtToken)
      dispatch(updateUser(userData))
    }
  } catch (e) {
    return console.error(e.message)
  }
}

export const { updateUser, logoutUser } = sessionSlice.actions
export default sessionSlice.reducer
