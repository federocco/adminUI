import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import isLoggedIn from "../utils/isLoggedIn"
import { RouterState } from "./constants"

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null
  }

  const loggedIn = isLoggedIn()

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: RouterState.login,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
