import axios from "axios";

export const uploadFiles = async (token, form) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/createImages", {form},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}