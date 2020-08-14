import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import Toolbar from "./Toolbar/Toolbar"
import Sidebar from "./Sidebar/Sidebar"
import BodyContainer from "./BodyContainer/BodyContainer"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}))

export default function Views() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Toolbar open={open} onOpen={handleDrawerOpen} />
      <Sidebar open={open} onClose={handleDrawerClose} />
      <BodyContainer />
    </div>
  )
}
