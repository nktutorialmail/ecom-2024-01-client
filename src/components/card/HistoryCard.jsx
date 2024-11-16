import { useState, useEffect } from "react";
import { getOrder } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat, dateFormat } from "../../utils/number";

const HistoryCard = () => {

  const token = useEcomStore((state) => state.token);
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(token)
  }, []);

  const getOrders = (token) => {
    // try catch or then casht
    getOrder(token)
    .then((res) => {
     setOrders(res.data.orders)
    })
    .catch((err) => {
      console.log(err);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งชื้อ</h1>

      <div className="space-y-4">
        {
          orders?.map((item, index) => {
            return (
              <div key={index} className=" bg-gray-200 p-4 rounded-md shadow-md">
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">Order date</p>
                    <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                  </div>
                  <div>
                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-2 rounded-full`}>
                      {item.orderStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <table className="bordr w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>รวม (บาท)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        item.ProductOnOrders?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.Product.title}</td>
                              <td>{numberFormat(item.Product.price)}</td>
                              <td>{item.count}</td>
                              <td>{numberFormat(item.count * item.Product.price)}</td>
                            </tr>
                          )
                        })
                      }
                      
                    </tbody>
                  </table>
                </div>
             
                <div>
                  <div className="text-right">
                    <p>ราคาสุทธิ</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>


    </div>
  )
}

export default HistoryCard