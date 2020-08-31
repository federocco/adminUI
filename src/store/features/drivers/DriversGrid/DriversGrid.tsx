import * as React from "react"
import { useEffect, useRef, useMemo } from "react"
import { useSelector } from "react-redux"
import { RouteProps } from "react-router-dom"
import MaterialTable from "material-table"

import { useAppDispatch, State } from "store"
import { getDrivers } from "../driversSlice"

export default function DriversGrid(props: RouteProps) {
  const dispatch = useAppDispatch()
  const api = useRef({ dispatch })

  const drivers = useSelector((state: State) => state.drivers.drivers)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.current.dispatch(getDrivers())
      console.log("driver grid response", response)
    }

    fetchData()
  }, [])

  const data = useMemo(
    () =>
      drivers.map(({ id, name, surname, nickname, codeAuth }) => ({
        id,
        name,
        surname,
        nickname,
        codeAuth,
      })),
    [drivers]
  )

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "Id", field: "id", type: "numeric" },
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Nickname", field: "nickname" },
          { title: "Authorization code", field: "codeAuth" },
        ]}
        data={data}
        title='Drivers'
      />
    </div>
  )
}
