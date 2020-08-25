import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Switch, Route } from "react-router-dom"

import Login from "./store/features/user/Login"
import Views from "./components/Views"
import PrivateRoute from "./router/PrivateRoute"
import { RouterState } from "./router/constants"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import { SessionChecker } from "SessionChecker"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}))

export default function App() {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Switch>
          <Route path={[RouterState.login, "/"]} exact component={Login} />
          <PrivateRoute path={RouterState.home} component={Views} />
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
      <SessionChecker />
    </>
  )
}
