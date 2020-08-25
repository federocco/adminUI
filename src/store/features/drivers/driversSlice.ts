import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Drivers, DriversResponse } from "./typings"
import { AsyncThunkApiConfig } from "store"
import { RejectError } from "store/typings"
import { getApiCallAuth } from "utils/api"

const initialState: Drivers = []

const slicePrefix = "[Get Drivers]"

// Actions
export const getDrivers = createAsyncThunk<
  Drivers, // Return type of the payload creator
  void, // First argument to the payload creator
  AsyncThunkApiConfig<RejectError>
>("drivers/all", async (_, thunkApi) => {
  const apiAuth = getApiCallAuth(thunkApi.getState())

  const response = await apiAuth.get<any, DriversResponse>("drivers/all")

  const {
    data: { result: drivers, error: errorMessage },
  } = response

  if (!drivers || drivers.length === 0 || errorMessage) {
    return thunkApi.rejectWithValue({
      errorMessage,
    } as RejectError)
  }

  return drivers
})

const sessionSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setDrivers: (state, { payload }: PayloadAction<Drivers>) => {
      // state.drivers = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDrivers.pending, (state) => {
      console.log(`${slicePrefix} pending`)
    })
    builder.addCase(
      getDrivers.fulfilled,
      (state, { payload: drivers }: PayloadAction<Drivers>) => {
        console.log(`${slicePrefix} fulfilled`)

        if (drivers && drivers.length > 0) {
          console.log("ok drivers", drivers)
        }
      }
    )
    builder.addCase(getDrivers.rejected, (state, action) => {
      console.log(`${slicePrefix} rejected`)
    })
  },
})

const { actions, reducer } = sessionSlice
export const { setDrivers } = actions
export default reducer
