import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const listProduct = async (count) => {
  return axios.get("https://ecom-2024-01-server.vercel.app/api/products/" + count);
}

export const readProduct = async (token, id) => {
  return axios.get("https://ecom-2024-01-server.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const updateProduct = async (token, id, form) => {
  return axios.put("https://ecom-2024-01-server.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const deleteProduct = async (token, id) => {
  return axios.delete("https://ecom-2024-01-server.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const searchFilters = async (arg) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/search/filters", arg);
}

export const listProductBy = async (sort, order, limit) => {
  return axios.post("https://ecom-2024-01-server.vercel.app/api/productBy", { sort, order, limit});
}