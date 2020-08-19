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
  logged: false,
}

export const getInitialStateFromLocalStorage = (): UserState => {
  const jwtString = localStorage.getItem(userToken)

  if (jwtString) {
    const { id, username, companyId, email, type } = jwtDecode(
      jwtString
    ) as UserState

    return {
      id,
      username,
      companyId,
      email,
      type,
      logged: true,
    }
  }

  return initialState
}
