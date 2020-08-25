import { FC, useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { State, useAppDispatch } from "store"

import { loginUser, logoutUser } from "store/features/user/userSlice"
import { userToken } from "store/constants"

const checkIntervalInMinutes = 10

export const SessionChecker: FC<{}> = () => {
  const dispatch = useAppDispatch()
  const token = useSelector((state: State) => state.session.token)
  const username = useSelector((state: State) => state.session.username)

  const timerId = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    timerId.current = setInterval(
      keepAliveSession,
      checkIntervalInMinutes * 60 * 1000
    )

    return () => {
      clearInterval(timerId.current as ReturnType<typeof setTimeout>)
    }
  })

  const keepAliveSession = useCallback(async () => {
    if (token.length <= 0) {
      clearInterval(timerId.current as ReturnType<typeof setTimeout>)
      return
    }

    const loginUserResultAction = await dispatch(loginUser({ token }))

    if (loginUser.rejected.match(loginUserResultAction)) {
      await dispatch(logoutUser())

      clearInterval(timerId.current as ReturnType<typeof setTimeout>)
      localStorage.removeItem(userToken)

      console.log(`Login has been rejected: force Logout user [${username}]`)
    }

    // if the loginUserResultAction is fulfilled, the reducer updates the user token within the session data (also save it to the localStorage)
    //CONS of this solutions: if the client lose the Network connectivity it will be logoff at the first time that the login action will be rejected because of client Network issue
  }, [username, token, dispatch])

  return null
}
