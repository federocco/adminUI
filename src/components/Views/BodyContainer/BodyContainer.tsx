import React from "react"
import { Route } from "react-router-dom"

import { Container, makeStyles } from "@material-ui/core"
import { RouterState } from "../../../router/constants"
import DriversGrid from "store/features/drivers/DriversGrid"

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}))

function BodyContainer() {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        {/* <Route
          path={`${RouterState.section}/:itemName`}
          render={({ match }) => {
            return <h1>{match.params.itemName}</h1>
          }}
        /> */}
        <Route path={RouterState.drivers} component={DriversGrid} />

        <Route
          path={RouterState.reports}
          render={({ match }) => {
            return <h1>Reports grid</h1>
          }}
        />
      </Container>
    </main>
  )
}

export default BodyContainer
