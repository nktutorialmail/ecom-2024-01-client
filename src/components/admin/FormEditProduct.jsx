import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

import { useNavigate, useParams } from "react-router-dom";

// const initialState = {
//   title: "",
//   description: "",
//   price: 0,
//   quantity: 0,
//   categoryId: "",
//   Images: []
// }

const FormEditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categorys = useEcomStore((state)=> state.categorys);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    Images: []
  });

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, [])

  const fetchProduct = async (token, id, form ) => {
    try {
      const res = await readProduct(token, id, form)
      console.log("res.data=> ",res.data)
      setForm(res.data.products)
    } catch(err) {
      console.log(err);
      toast.error(err.data.response.message)
    }
  }

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form)
      console.log(res)
      // getProduct(token);
      toast.success(res.data.message);
      navigate("/admin/product");
    } catch(err) {
      console.log(err)
      toast.error(err.data.response.message);
    }

  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>

        <input 
          type="text" 
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleOnChange}
          className="border"
        />

        <input 
          type="text" 
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleOnChange}
          className="border"
        />

        <input 
          type="number" 
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleOnChange}
          className="border"
        />

        <input 
          type="number" 
          name="quantity"
          value={form.quantity}
          placeholder="Quantity"
          onChange={handleOnChange}
          className="border"
        />

        <select
          type="number"
          name="categoryId"
          onChange={handleOnChange}
          className="border"
          required
        >
          <option className="bg-yellow-500">Please select</option>
          {

            categorys.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))
          }
        </select>

        <hr />

        {/* upload file */}
        <Uploadfile form={form} setForm={setForm} />
        

        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full">ยืนยัน การแก้ไขสินค้า</button>

          <hr />

      </form>
    </div>
  )
}

export default FormEditProduct