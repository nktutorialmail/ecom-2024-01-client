import axios from "axios";

export const getAdminOrder = async (token) => {
  return axios.get("https://ecom-2024-01-server.vercel.app/api/admin/order", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put("https://ecom-2024-01-server.vercel.app/api/admin/order-status", { orderId, orderStatus }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getListAllUsers = async (token) => {
  return axios.get("https://ecom-2024-01-server.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeUserStatus = async (token, value) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/change-status", value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeUserRole = async (token, value) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/change-role", value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
