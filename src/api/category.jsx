import axios from "axios";

export const createCategory = async (token, name) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/category", name, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const listCategory = async () => {
  return axios.get("https://ecom-2024-01-server.vercel.app/api/category");
}

export const removeCategory = async (token, id) => {
  return axios.delete("https://ecom-2024-01-server.vercel.app/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}