/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { listProductBy } from "../../api/product"
import ProductCart from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("soid", "desc", 12)
    .then((res) => {
      setData(res.data.products)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    // <SwiperShowProduct className="flex gap-2 flex-wrap justify-center">
    <SwiperShowProduct>
      {
        data?.map((item, index) => (
          <SwiperSlide>
            <ProductCart item={item} key={index} />
          </SwiperSlide>
        ))
      }
    </SwiperShowProduct>
  )
}

export default BestSeller