import { useEffect, useState } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([])

  useEffect(() => {
    handleGetUsers(token)
  }, []);
  
  const handleGetUsers = (token) => {
    getListAllUsers(token)
    .then((res) => {
      setUsers(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus)
    const value = {
      id: userId,
      enabled: !userStatus
    }

    changeUserStatus(token, value)
    .then((res) => {
      handleGetUsers(token)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response.data.message)
    })
  }

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole
    }

    changeUserRole(token, value)
    .then((res) => {
      handleGetUsers(token)
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response.data.message)
    })
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            <th>วันที่แก้ไขล่าสุด</th>
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
            {
              users?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index +1 }</td>
                    <td>{item.email}</td>
                    <td>{item.updatedAt}</td>

                    <td>
                      {
                        <select 
                          value={item.role}
                          onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                        >
                          <option>user</option>
                          <option>admin</option>
                        </select>
                      }                      

                    </td>
                    
                    
                    <td>{item.enabled ? "Active" : "Inactive"}</td>
                    
                    <td>
                      <button 
                        className="bg-yellow-500 px-2 py-1 rounded-md text-white"
                        onClick={() => handleChangeUserStatus(item.id, item.enabled)} 
                      >
                        {item.enabled ? "Disable" : "Enable"}
                      </button>

                    </td>
                  </tr>
                )
              })
            }
            
        </tbody>
      </table>
    </div>
  )
}

export default TableUser