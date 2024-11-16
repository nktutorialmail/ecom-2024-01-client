import axios from "axios";

const currentUser =async (token) => {
  return (
    await axios.post("https://ecom-2024-01-server.vercel.app/api/current-user", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  )
}

const currentAdmin = async (token) => {
  return (
    await axios.post("https://ecom-2024-01-server.vercel.app/api/current-admin", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  )
}

export { currentUser, currentAdmin }