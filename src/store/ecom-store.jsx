import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categorys: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categorys: [],
      products: [],
      carts: [],
    })
  },
  
  actionLogin: async (form) => {
    const res = await axios.post("https://ecom-2024-01-server.vercel.app/api/login", form)
    set({
      user: res.data.payload,
      token: res.data.token
    })
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({
        categorys: res.data.categorys
      });
    } catch(err) {
      console.log(err)
    }
  },

  getProduct: async (count = 20) => {
    try {
      const res = await listProduct(count);
      set({
        products: res.data.products
      });
    } catch(err) {
      console.log(err)
    }
  },

  actionSearchFilters: async (arg) => {
     try {
      const res = await searchFilters(arg);
      set({
        products: res.data.products
      });
    } catch(err) {
      console.log(err)
    }
  },

  actionAddtoCart: (item) => {
    const carts = get().carts
    const updateCarts = [...carts, {...item, count: 1} ];
    const unionEqu = _.unionWith(updateCarts, _.isEqual);

    set({
      carts: unionEqu
    })
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) => 
        item.id === productId ? {...item, count: Math.max(1, newQuantity)} : item
      )
    }))
  },

  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => (
        item.id !== productId
      ))
    }))
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + (item.price * item.count)
    }, 0)
  },

  clearCart: () => {
    set({ carts: [] });
  },

});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore;