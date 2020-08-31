import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

import { AsyncThunkApiConfig } from "store"
import { userToken } from "store/constants"
import { RejectError } from "store/typings"
import { apiCall } from "utils/api"

import { getInitialStateFromLocalStorage, initialState } from "./initialState"
import { LoginRequest, UserToken, LoginResponse } from "./typings"
import { AxiosResponse } from "axios"

export interface LoginActionResponse {
  token?: string
  tokenData?: UserToken
}

const slicePrefixUserLogin = "[User login]"

// Actions
export const loginUser = createAsyncThunk<
  LoginActionResponse, // Return type of the payload creator
  LoginRequest, // First argument to the payload creator
  AsyncThunkApiConfig<RejectError>
>("users/login", async ({ username, password, token: reqToken }, thunkApi) => {
  try {
    const response = await apiCall.post<any, AxiosResponse<LoginResponse>>(
      "/users/login",
      {
        username,
        password,
        token: reqToken,
      }
    )

    const {
      data: { result: token, error: errorMessage },
    } = response

    if (!token || token.length === 0 || errorMessage) {
      throw new Error(errorMessage)
    }

    const tokenData = jwtDecode<UserToken>(token)

    return {
      token,
      tokenData,
    }
  } catch (err) {
    return thunkApi.rejectWithValue({
      status: err.reponse.status,
      statusText: err.reponse.statusText,
      message: err,
    })
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    logoutUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      console.log(`${slicePrefixUserLogin} pending`)
    })
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        { payload: { token, tokenData } }: PayloadAction<LoginActionResponse>
      ) => {
        console.log(`${slicePrefixUserLogin} fulfilled`)

        if (token && token.length > 0 && tokenData) {
          state.id = tokenData.id
          state.username = tokenData.username
          state.email = tokenData.email
          state.companyId = tokenData.companyId
          state.type = tokenData.type

          state.token = token
          localStorage.setItem(userToken, token)
        }
      }
    )
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(`${slicePrefixUserLogin} rejected`)
    })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
