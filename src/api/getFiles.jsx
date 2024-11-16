import axios from "axios";

export const getFiles = async (token, public_id) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/getImages",{public_id}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}