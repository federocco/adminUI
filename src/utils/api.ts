import axios from "axios"

import { State } from "store"

export const apiCall = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
})

export const getApiCallAuth = (state: State) => {
  const token = state.session.token

  return axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers["Authorization"] = `Token ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )
