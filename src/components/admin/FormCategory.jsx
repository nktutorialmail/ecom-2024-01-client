import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createCategory, removeCategory } from "../../api/category";
import  useEcomStore from "../../store/ecom-store.jsx";

const FormCategory = () => {

  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  
  // const [categories, setCategories] = useState([]);
  const categorys = useEcomStore((state) => state.categorys);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.warning("Please fill data !!");
    }

    try {
      const res = await createCategory(token, { name } );
      getCategory();
      toast.success(res.data.message);
    } catch(err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

  }

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id)
      toast.success(res.data.message);
      getCategory();
    } catch(err) {
      console.log(err);
      toast.error(err.data.response.message);
    }
  }
  
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input 
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
          <button className="bg-blue-500">Add category</button>
      </form>

      <hr />
      <ul className="list-none">
        {
          categorys.map((item, index) => ( 
            <li key={index} className="flex justify-between my-2">
              <span>
                {item.name}
              </span>
              <button 
                className="bg-red-500 px-4 py-2 rounded-full text-white"
                onClick={() => handleRemove(item.id)}
              >
                Delete
              </button>
            
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default FormCategory