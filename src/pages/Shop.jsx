import { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="flex flex-wrap ">

      {/* SearchBar */}
      <div className="w-1/4 bg-gray-200 h-screen p-4">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {
            products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          }
        </div>
      </div>

      {/* cart */}
      <div className="w-1/4 bg-gray-200 h-screen overflow-auto p-4">
        <CartCard />
      </div>

    </div>
  )
}

export default Shop