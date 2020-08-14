import React, { useState } from "react"
import { Redirect, RouteProps } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { FormGroup } from "@material-ui/core"

import { RouterState } from "router/constants"
import { State } from "store"
import { loginUserAction } from "store/features/user/userSlice"
import isLoggedIn from "utils/isLoggedIn"

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://github.com/federocco'>
        Federico Zoroaster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login(props: RouteProps) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const companyId = useSelector((state: State) => state.session.companyId)

  if (companyId !== -1 || isLoggedIn()) {
    return <Redirect to={RouterState.home} />
  }

  const handleSubmit = () => {
    dispatch(loginUserAction({ username, password }))
  }

  const onChangeUsername = (username: string) => setUsername(username)

  const onChangePassword = (password: string) => setPassword(password)

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <FormGroup>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(event) => {
              onChangeUsername(event.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(event) => onChangePassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </FormGroup>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}