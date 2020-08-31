export interface Driver {
  id: number
  companyId: number
  auxId: number
  extId: number
  nickname: string
  name: string
  surname: string
  email: string
  codeAuth: string
  regId: string
  regId2: string
  imei: string
  imei2: string
  enable: boolean
  enable2: boolean
  appVersion: string
  appVersion2: string
}

export type Drivers = Driver[]

export interface DriversResponse {
  result: Drivers
  error: string | undefined
}

export type DriversState = {
  drivers: Drivers
}
