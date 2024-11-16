import axios from "axios";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import zxcvbn from "zxcvbn";

const registerSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(8, {message: "Password ต้องมากกว่า 8 ตัวอักษร"}),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {message: "Password is not match", path: ["confirmPassword"]});


import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const Register = () => {

  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema)});

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : "").score
  }

  useEffect(() => {
    setPasswordScore(validatePassword);
  }, [watch().password]);

  console.log(passwordScore)

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 3) {
    //   toast.warning("Password is not Strong");
    //   return
    // }
    try {
      const res = await axios.post("https://ecom-2024-01-server.vercel.app/api/register", data)
      toast.success(res.data.message);
    } catch(err) {
      toast.error(err.response?.data?.message)
    }
  }

  // const test = Array.from(Array());
  // console.log(test)


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">
        Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">

            <div>
              <input {...register("email")} 
                placeholder="Email"
                className={`
                  boder w-full px-3 py-2 rounded 
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  focus:border-transparent 
                  ${errors.email && 'border-red-500'}
                `}
              />
              {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
            </div>
            
            <div>
              <input {...register("password")} 
                  placeholder="Password"
                  type="password"
                  className={`
                    boder w-full px-3 py-2 rounded 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    focus:border-transparent 
                    ${errors.password && 'border-red-500'}
                  `}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <input {...register("confirmPassword")} 
                  placeholder="confirmPassword"
                  type="password"
                  className={`
                    boder w-full px-3 py-2 rounded 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    focus:border-transparent 
                    ${errors.confirmPassword && 'border-red-500'}
                  `}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {
              watch().password?.length > 0 && (
                <div className="flex">
                  {
                    Array.from(Array(5).keys()).map((item, index) => (
                      <span key={index} className="w-1/5 px-1">
                        <div className={`h-2 rounded-md ${passwordScore <= 2 ? "bg-red-500" : passwordScore < 4 ? "bg-yellow-500" : "bg-green-500"}`}></div>
                      </span>
                    ))
                  }
                </div>
              )
            }


            <button className="bg-blue-500 rounded-md w-full py-2 font-bold text-white text-2xl">
              Register
            </button>

          </div>
          

        </form>
      </div>
    </div>
  )
}

export default Register