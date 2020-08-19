import { userToken } from "../store/constants"

export const getUserToken = (): string | null => localStorage.getItem(userToken)
