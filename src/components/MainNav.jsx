import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MainNav = () => {

  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false)
  }

  return (
    <nav className="bg-white-300 shadow-md">
      <div className="mx-auto px-4">
      
        <div className="flex justify-between h-16">

          <div className="flex items-center gap-6">

            <NavLink to={"/"} 
              className={"text-2xl font-bold"}>Logo</NavLink>

            <NavLink to={"/"} 
              className={({isActive}) => isActive ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium" 
                : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"}
            >
              Home
            </NavLink>
            
            <NavLink to={"/shop"}
                className={({isActive}) => isActive ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium" 
                : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"}
            >
              Shop
            </NavLink>

            <NavLink to={"/cart"} 
                className={({isActive}) => isActive ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative" 
                : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"}
            >
              Cart
              { 
                carts.length > 0 && <span className="absolute top-0 bg-red-400 px-2 rounded-full">{carts.length}</span>
              }
            </NavLink>

          </div>





          {
            user ? (
              <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2" onClick={toggleDropdown} >
                    <img 
                      className="w-10 h-10 rounded-full"
                      src="data:image/jpeg;base64,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" 
                    />
                    <ChevronDown />
                  </button>
              
                  {
                    isOpen && (
                      <div className="absolute top-16 bg-white shadow-md z-50">

                        <Link to={"/user/history"} 
                          className="block px-4 py-2 hover:bg-gray-200">
                          History
                        </Link>

                        <button onClick={handleLogout} 
                          className="block px-4 py-2 hover:bg-gray-200">
                          Logout
                        </button>

                      </div>
                    )
                  }
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink to={"/register"}
                  className={({isActive}) => isActive ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative" 
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"}
                >
                  Register
                </NavLink>
                <NavLink to={"/login"}
                  className={({isActive}) => isActive ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative" 
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"}
                >
                  Login
                </NavLink>
              </div>
            )
          }


        </div>

      </div>
    </nav>
  )
}

export default MainNav