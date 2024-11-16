import { Minus, Plus, Trash2 } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number"; 

const CartCard = () => {

  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  return (
    <div>

      <h1 className="text-2xl font-bold">สินค้าที่เลือกซื้อ</h1>
      
      <div className="boder p-2">

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
                  <div >
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">{item.description}</p>
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
                  {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))
        }


        <div className="flex justify-between px-2">
          <span>รวม</span>
          <span>{numberFormat(getTotalPrice())}</span>
        </div>
        <Link to="/cart">
          <button 
            className="mt-4 bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-600"
          >
            ตะกร้าสินค้าของฉัน
          </button>
        </Link>

      </div>


    </div>
  )
}

export default CartCard