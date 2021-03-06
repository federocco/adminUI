import React, { FC } from "react"
import {
  CssBaseline,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { Link } from "react-router-dom"

import { RouterState } from "router/constants"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
})

const PageNotFound: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container fixed className={classes.container}>
        <Typography variant='h1' gutterBottom color='error'>
          Code: 404
        </Typography>
        <Typography variant='h5' gutterBottom>
          <Link to={RouterState.home}>Go back</Link>
        </Typography>
        <Typography variant='h2' gutterBottom>
          Page not found
        </Typography>
        <Typography variant='h2' gutterBottom>
          Pagina non trovata
        </Typography>
        <Typography variant='h2' gutterBottom>
          Page non trouvée
        </Typography>
        <Typography variant='h2' gutterBottom>
          Seite nicht gefunden
        </Typography>
      </Container>
    </div>
  )
}

export default PageNotFound
