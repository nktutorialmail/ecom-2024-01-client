/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { listProductBy } from "../../api/product"
import ProductCart from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("updatedAt", "desc", 12)
    .then((res) => {
      setData(res.data.products)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    // <div className="flex gap-2 flex-wrap justify-center">
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

export default NewProduct