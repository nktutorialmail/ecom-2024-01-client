import axios from "axios";

export const removeFiles = async (token, public_id) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/removeImages",{public_id}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}