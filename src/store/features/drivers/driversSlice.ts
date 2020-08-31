import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Drivers, DriversResponse, DriversState } from "./typings"
import { AsyncThunkApiConfig } from "store"
import { RejectError } from "store/typings"
import { getApiCallAuth } from "utils/api"
import { AxiosResponse, AxiosError } from "axios"

const initialState: DriversState = {
  drivers: [],
}

const slicePrefix = "[Get Drivers]"

// Actions
export const getDrivers = createAsyncThunk<
  Drivers, // Return type of the payload creator
  void, // First argument to the payload creator
  AsyncThunkApiConfig<RejectError>
>("drivers/all", async (_, thunkApi) => {
  try {
    const apiAuth = getApiCallAuth(thunkApi.getState())

    try {
      const response = await apiAuth.get<any, AxiosResponse<DriversResponse>>(
        "drivers/all"
      )

      const {
        data: { result },
      } = response!

      return result
    } catch (err) {
      let error: AxiosError<RejectError> = err
      if (!error.response) {
        throw err
      }

      return thunkApi.rejectWithValue({
        status: error.response.status,
        statusText: error.response.statusText,
        message: undefined,
      })
    }

    // if (response) {
    //   return
    // }
  } catch (err) {
    return thunkApi.rejectWithValue({
      status: -1,
      statusText: "blows",
      message: "",
    })
  }
})

const sessionSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setDrivers: (state, { payload: drivers }: PayloadAction<Drivers>) => {
      state.drivers = drivers
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
          state.drivers = drivers
        }
      }
    )
    builder.addCase(getDrivers.rejected, (state, action) => {
      console.log(`${slicePrefix} rejected`, action.payload)
    })
  },
})

const { actions, reducer } = sessionSlice
export const { setDrivers } = actions
export default reducer
