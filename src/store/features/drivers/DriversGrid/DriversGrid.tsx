import * as React from "react"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RouteProps } from "react-router-dom"

import { useAppDispatch, State } from "store"
import { getDrivers } from "../driversSlice"

export default function DriversGrid(props: RouteProps) {
  const dispatch = useAppDispatch()
  const api = useRef({ dispatch })

  const drivers = useSelector((state: State) => state.drivers)

  console.log(drivers)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.current.dispatch(getDrivers())
      console.log(response)
    }

    fetchData()
  }, [])

  return <div> ciao</div>
}
