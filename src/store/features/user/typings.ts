export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    result: string | null
    error: string | null
  }
}

export interface UserJwtToken {
  id: number
  username: string
  email: string
  idazien: number
  type: string
}

export interface User extends Omit<UserJwtToken, "idazien"> {
  companyId: number
}
