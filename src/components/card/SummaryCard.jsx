import { useState, useEffect } from "react"
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {

  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  
  useEffect(() => {
    handleGetUserCart(token)
  }, []);

  const handleGetUserCart = (token) => {
    listUserCart(token)
    .then((res) => {
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address");
    }
    saveAddress(token, address)
    .then((res) => {
      console.log(res);
      toast.success(res.data.success);
      setAddressSaved(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    })
  }

  const handlePaymenCheck = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่")
    }
    navigate("/user/payment");
  }

  return (
    <div className="mx-auto">

      <div className="grid sm:grid-cols-3 gap-4">

        <div className="sm:col-span-2 bg-gray-200 rounded-md p-4 border shadow-md space-y-4">
          <div>
            <h1 className="text-lg font-bold">ที่อยู่ในการจัดส่ง</h1>
            <textarea 
              className="w-full px-2 rounded-md"
              placeholder="กรุณากรอกที่อยู่"
              required
              onChange={(e) => setAddress(e.target.value)}
            />        
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 hover:duration-200 "
              onClick={handleSaveAddress}
            >
              Save address
            </button>
          </div>
        </div>

        <div className="bg-gray-300 rounded-md border shadow-md">
          <div className="flex flex-col gap-2">

            <h1 className="text-lg font-bold p-4">สรุปข้อมูล คำสั่งซื้อ</h1>

            {
              products?.map((item, index) => (
                <div key={index} className="flex justify-between items-end px-2">
                  <div>
                    <p className="font-bold">{item.Product.title}</p>
                    <p className="text-sm">จำนวน: {numberFormat(item.count)} x {numberFormat(item.Product.price)} </p>
                  </div>
                  <div>
                    <p className="text-red-500">{numberFormat(item.count * item.Product.price)}</p>
                  </div>
                </div>

              ))
            }
            

            <div>
              <div className="flex justify-between px-2">
                <p>ค่าจัดส่ง:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between px-2">
                <p>ส่วนลด:</p>
                <p>0.00</p>
              </div>
            </div>

            <div className="bg-gray-400 py-2">
              <div className="flex justify-between px-2">
                <p className="font-bold">ยอดรวมสุุทธิ:</p>
                <p className="text-red-500 font-bold">{numberFormat(cartTotal)}</p>
              </div>
            </div>

            <hr />
            <div>
              <button 
                className="bg-green-400 w-full p-2 rounded-md hover:bg-green-600 shadow-md text-white"
                // disabled = {!addressSaved}
                onClick={handlePaymenCheck}
              >
                ชำระเงิน
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default SummaryCard