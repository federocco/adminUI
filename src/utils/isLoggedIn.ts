import { loggedIn } from "../store/constants"

const isLoggedIn = (): boolean => {
  const logged = localStorage.getItem(loggedIn)
  return !!logged
}

export default isLoggedIn
