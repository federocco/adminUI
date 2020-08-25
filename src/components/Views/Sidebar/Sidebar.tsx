import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import PeopleIcon from "@material-ui/icons/People"
import AssessmentIcon from "@material-ui/icons/Assessment"
import ExitToApp from "@material-ui/icons/ExitToApp"

import { logoutUser } from "store/features/user/userSlice"
import { Props } from "./typings"
import { userToken } from "../../../store/constants"
import { RouterState } from "../../../router/constants"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

function Sidebar(props: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { onClose, open } = props

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.removeItem(userToken)
  }

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to={RouterState.drivers}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Drivers' />
          </ListItem>
        </Link>

        <Link to={RouterState.reports}>
          <ListItem button>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <Link to={RouterState.login} onClick={handleLogout}>
        <ListItem button key={"Exit"}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Exit"} />
        </ListItem>
      </Link>
    </Drawer>
  )
}

export default Sidebar
