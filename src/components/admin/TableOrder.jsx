import { useState, useEffect } from "react";
import { getAdminOrder, changeOrderStatus } from "../../api/admin"
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat, dateFormat } from "../../utils/number";

const TableOrder = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAdinOrders(token);
  }, []);

  const getAdinOrders = (token) => {
    getAdminOrder(token)
    .then((res) => {
     setOrders(res.data.orders)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
    .then((res) => {
    toast.success(res.data.message)
    getAdinOrders(token);
    })
    .catch((err) => {
      console.log(err)
      toast.warning(err.response.data.message)
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
     case "รอดำเนินการ":
      return "bg-gray-300"
     case "กำลังดำเนินการ":
      return "bg-blue-300"
     case "ดำเนินการเสร็จสิ้น":
      return "bg-green-300"
     case "ยกเลิก":
      return "bg-red-300"
    }
  }
  
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((item,index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <p>{item.User.email}</p>
                      <p>{item.User.address}</p>
                    </td>

                    <td>
                      {dateFormat(item.createdAt)}
                    </td>
                    <td className="px-2 py-4">
                      {
                        item.ProductOnOrders.map((item, i) => (
                          <>
                            <li key={i}>
                              {item.Product.title}
                            <span className="pl-3">
                              {numberFormat(item.count)} x {numberFormat(item.Product.price)}
                            </span>
                            </li>

                          </>
                        ))
                      }
                    </td>
                    
                      <td>{numberFormat(item.cartTotal)}</td>


                    <td>
                      <span 
                        className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                        {item.orderStatus}
                      </span>
                    </td>


                    <td>
                      <select
                        value={item.orderStatus}
                        onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                      >
                        <option>รอดำเนินการ</option>
                        <option>กำลังดำเนินการ</option>
                        <option>ดำเนินการเสร็จสิ้น</option>
                        <option>ยกเลิก</option>
                      </select>
                    </td>


                  </tr>
                  
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOrder