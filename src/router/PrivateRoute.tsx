import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { useSelector } from "react-redux"

import { State } from "store"
import { RouterState } from "./constants"

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isLogged = useSelector((state: State) => state.session.token.length > 0)

  if (!Component) {
    return null
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
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
