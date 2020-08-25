export interface Driver {
  email: string
  name: string
  password: string
}

export type Drivers = Driver[]

export interface DriversResponse {
  data: {
    result: Drivers | null
    error: string | null
  }
}

export type DriversState = {
  drivers: Drivers
}
