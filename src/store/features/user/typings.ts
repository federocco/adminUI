export interface LoginRequest {
  username?: string
  password?: string
  token?: string
}

export interface LoginResponse {
  result: string | undefined
  error: string | undefined
}

export interface UserToken {
  id: number
  username: string
  email: string
  companyId: number
  type: string
}

export interface UserState extends UserToken {
  token: string
}
