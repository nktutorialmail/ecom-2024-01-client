import { ListCheck } from 'lucide-react';
import useEcomStore from "../../store/ecom-store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from "../../api/user";
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';

const ListCart = () => {
  const token = useEcomStore((state) => state.token);
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const user = useEcomStore((state) => state.user);
  const navigate = useNavigate();

  const getTotalPriceUnit = (price, count) => {
    return price * count
  }

  const handleSaveCart = async () => {
    await createUserCart(token, { carts })
    .then((res) => {
      toast.success(res.data.message)
      navigate("/checkout");
    })
    .catch((err) => {
      console.log(err)
      toast.warning(err.response.data.message);
    })
  }
  
  return (
    <div>

      <div className='flex gap-2'>
        <ListCheck size={36}  />
        <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">เลือกสินค้า จำนวน {carts.length} รายการ</p>
      </div>

      <div className="grid sm:grid-cols-4">
        
        <div className="bg-gray-200 sm:col-span-3">
          {
            carts.map((item,index) => (
              <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
                <div className="flex justify-between">      
                  <div className="flex gap-2 items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                      {
                        item.Images && item.Images.length > 0 
                        ? <img 
                            src={item.Images[0].url} 
                            alt="" 
                            className="w-16 h-16 rounded-md"
                          /> 
                        : <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                          No Images
                        </div> 
                      }
                    </div>
                    <div>
                      <p>{index + 1}{". "}
                      <span className="font-bold">{item.title}</span></p>
                      <p className="text-sm">{item.description}</p>
                      <p className="text-sm">฿ {numberFormat(item.price)} x {item.count}</p>
                    </div>
                  </div>
                  <div 
                    className="text-red-500 p-2"
                    onClick={() => actionRemoveProduct(item.id)}
                  >
                    <Trash2 />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="boder rounded-sm px-2 py-2 flex items-center">
                    <button 
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                    ><Minus size={16}/></button>
                    <span className="px-4">{item.count}</span>
                    <button 
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                    ><Plus size={16}/></button>
                  </div>
                  <div className="font-bold text-blue-500">
                    {/* {item.price} * {item.count} */}
                    {
                      "฿ " + numberFormat(getTotalPriceUnit(item.price, item.count))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>


        <div className="bg-gray-300 sm:col-span-1">
          
          <div>
            <p className="text-2xl font-bold">สรุป คำสั่งซื้อ</p>
            <div className="flex justify-between items-center ">
              <span>ยอดรวม (บาท)</span>
              <span className="text-2xl font-bold pr-2" >{numberFormat(getTotalPrice())}</span>
              {/* จำนวน รายการ รวม  ขิ้น */}
              {/* ค่าจัดส่ง */}
              {/* ยอดรวมสุทฺธิ (บาท) */}
            </div>
          </div>

          {
            user 
            ?
            // <Link to="/cart">
            <Link>
              <button 
                disabled={carts.length < 1}
                className="mt-4 bg-orange-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-600"
                onClick={handleSaveCart}
              >
                สั่งซื้อ
              </button>
            </Link>
            :
            <Link to="/login">
              <button 
                className="mt-4 bg-blue-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-600"
              >
                Login
              </button>
            </Link>
          }


        </div>

      </div>

    </div>
  )
}

export default ListCart