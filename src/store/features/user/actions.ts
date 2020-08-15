import jwtDecode from "jwt-decode"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { AsyncThunkApiConfig } from "store"
import { RejectError } from "store/typings"
import api from "utils/api"

import { LoginRequest, UserJwtToken, LoginResponse } from "./typings"

export interface LoginActionResponse {
  jwtString?: string
  jwtData?: UserJwtToken
}

export const loginUserAction = createAsyncThunk<
  LoginActionResponse, // Return type of the payload creator
  LoginRequest, // First argument to the payload creator
  AsyncThunkApiConfig<RejectError>
>("users/login", async ({ username, password }, thunkApi) => {
  const response = await api.post<any, LoginResponse>("/users/login", {
    username,
    password,
  })

  const {
    data: { result: jwtString, error: errorMessage },
  } = response

  if (!jwtString || jwtString.length === 0 || errorMessage) {
    return thunkApi.rejectWithValue({
      errorMessage,
    } as RejectError)
  }

  const jwtData = jwtDecode<UserJwtToken>(jwtString)

  return {
    jwtString,
    jwtData,
  } as LoginActionResponse
})
