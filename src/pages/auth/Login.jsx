import { useState } from "react";
import { toast } from 'react-toastify';

import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      toast.success(res.data.message);
      roleRedirect(res.data.payload.role);
    } catch(err) {
      console.log(err)
      toast.error("Server error")
    }
  }

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">
          Login 
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            <input className={`
                  boder w-full px-3 py-2 rounded 
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  focus:border-transparent 

                `}
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleOnChange}
            />

            <input className=" boder w-full px-3 py-2 rounded 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    focus:border-transparent "
                         placeholder="Password"
              type="password"
              name="password"
              onChange={handleOnChange}
            />

            <button className="bg-blue-500 rounded-md w-full py-2 font-bold text-white text-2xl">
              Login
            </button>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Login