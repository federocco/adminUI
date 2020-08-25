import jwtDecode from "jwt-decode"
import { userToken } from "store/constants"

import { UserState } from "./typings"

export const defaultCompanyId = -1

export const initialState: UserState = {
  id: -1,
  username: "",
  companyId: defaultCompanyId,
  email: "",
  type: "",
  token: "",
}

export const getInitialStateFromLocalStorage = (): UserState => {
  const token = localStorage.getItem(userToken)

  if (token) {
    const { id, username, companyId, email, type } = jwtDecode(
      token
    ) as UserState

    return {
      id,
      username,
      companyId,
      email,
      type,
      token,
    }
  }

  return initialState
}
