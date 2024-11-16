import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat, dateFormat } from "../../../src/utils/number"


const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  Images: []
}

const FormProduct = () => {

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const getProduct = useEcomStore((state)=> state.getProduct);

  const categorys = useEcomStore((state)=> state.categorys);
  const products = useEcomStore((state)=> state.products);

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
    getProduct();
  }, [])

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form)
      setForm(initialState);
      getProduct();
      toast.success(res.data.message);
    } catch(err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

  }

  const handleDelete = async (id) => {
    if (window.confirm("ต้องการลบ ใช่หรือไม่")) {
      try {
        const res = await deleteProduct(token, id)
        getProduct()
        
        toast.success(res.data.message);
      } catch(err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
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
        

        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full">เพิ่มสินค้า</button>

          <hr />
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-200 border">
                <th>No.</th>
                <th>รูปภาพ</th>
                <th>สินค้า</th>
                <th>รายการ</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>ขายได้</th>
                <th>วันที่นำเข้า</th>
                <th>วันที่แก้ไข</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        item.Images.length > 0
                        ? <img src={item.Images[0].url}  
                            className="w-24 h-24 rounded-lg shadow-md"
                          />
                        : <div className="w-24 h-24 bg-gray-500 flex items-center justify-center">No Image</div>
                      }
                    </td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{numberFormat(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.soid}</td>
                    <td>{dateFormat(item.createdAt)}</td>
                    <td>{dateFormat(item.updatedAt)}</td>
                    <td className="flex gap-2">
                      <p 
                        className="bg-yellow-500 rounded-md p-1 shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200"> 
                        <Link to={"/admin/product/" + item.id } ><Pencil /></Link>
                      </p>
                      
                      <p
                        className="bg-red-500 rounded-md p-1 shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200"
                        onClick={() => handleDelete(item.id)}
                      ><Trash /></p>
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

      </form>
    </div>
  )
}

export default FormProduct